"use client";

import { useBoardStore } from "@/store/BoardStore";
import { useEffect, useState } from "react";
import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
import Column from "./Column";
import Image from "next/image";
import loader from "@/images/grid.svg";

const Board = () => {
    const [board, getBoard, setBoardState, updateTodoInDB] = useBoardStore(
        (state) => [
            state.board,
            state.getBoard,
            state.setBoardState,
            state.updateTodoInDB,
        ]
    );

    const [screenSize, setScreenSize] = useState<number | null>(null);

    useEffect(() => {
        // getBoard
        getBoard();
    }, [getBoard]);

    useEffect(() => {
        setScreenSize(window.innerWidth);
    }, []);

    const handleOnDragEnd = (result: DropResult) => {
        const { destination, source, type } = result;

        // Check if user dragged card outside of board
        if (!destination) return;

        // Handle column drag
        if (type === "column") {
            const entries = Array.from(board.columns.entries());
            const [removed] = entries.splice(source.index, 1);
            entries.splice(destination.index, 0, removed);
            const rearrangedColumn = new Map(entries);
            setBoardState({ ...board, columns: rearrangedColumn });
        }

        // This step is needed as the indexes are stored as numbers 0,1,2 etc. instead of id's with DND library

        const columns = Array.from(board.columns);
        const startColIndex = columns[Number(source.droppableId)];
        const finishColIndex = columns[Number(destination.droppableId)];

        const startCol: Column = {
            id: startColIndex[0],
            todos: startColIndex[1].todos,
        };

        const finishCol: Column = {
            id: finishColIndex[0],
            todos: finishColIndex[1].todos,
        };

        if (!startCol || !finishCol) return;

        if (source.index === destination.index && startCol === finishCol)
            return;

        const newTodos = startCol.todos;
        const [todoMoved] = newTodos.splice(source.index, 1);

        if (startCol.id === finishCol.id) {
            // Same column task drag
            newTodos.splice(destination.index, 0, todoMoved);
            const newCol = {
                id: startCol.id,
                todos: newTodos,
            };
            const newColumns = new Map(board.columns);
            newColumns.set(startCol.id, newCol);

            setBoardState({ ...board, columns: newColumns });
        } else {
            // Dragging to another column
            const finishTodos = Array.from(finishCol.todos);
            finishTodos.splice(destination.index, 0, todoMoved);

            const newColumns = new Map(board.columns);
            const newCol = {
                id: startCol.id,
                todos: newTodos,
            };

            newColumns.set(startCol.id, newCol);
            newColumns.set(finishCol.id, {
                id: finishCol.id,
                todos: finishTodos,
            });

            // Update in DB
            updateTodoInDB(todoMoved, finishCol.id);

            setBoardState({ ...board, columns: newColumns });
        }
    };

    return (
        <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable
                droppableId="board"
                direction={`${screenSize! < 768 ? "vertical" : "horizontal"}`}
                type="column"
            >
                {(provided) => (
                    <div
                        className={`${
                            !Array.from(board.columns.entries()).length
                                ? "flex items-center justify-center"
                                : "grid grid-cols-1 md:grid-cols-3"
                        }  gap-5 max-w-7xl mx-auto px-2 py-4`}
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                    >
                        {!Array.from(board.columns.entries()).length ? (
                            <Image
                                src={loader}
                                alt="loader"
                                height={50}
                                width={50}
                                className="mx-auto self-center mt-20"
                            />
                        ) : (
                            /* Rendring all the columns */
                            Array.from(board.columns.entries()).map(
                                ([id, column], index) => (
                                    <Column
                                        key={id}
                                        id={id}
                                        todos={column.todos}
                                        index={index}
                                    />
                                )
                            )
                        )}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );
};

export default Board;
