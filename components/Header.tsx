"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Avatar from "react-avatar";
import GPTSuggestion from "./GPTSuggestion";
import { useBoardStore } from "@/store/BoardStore";

const Header = () => {
    const [searchString, setSearchString] = useBoardStore((state) => [
        state.searchString,
        state.setSearchString,
    ]);

    return (
        <header>
            <div className="flex flex-col md:flex-row items-center py-5 px-2 md:px-5 bg-gray-500/10 rounded-b-2xl">
                <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-br from-pink-400 to-[#0055d1] rounded-md filter blur-3xl opacity-50 -z-50"></div>

                <Image
                    src="https://links.papareact.com/c2cdd5"
                    alt="trello logo"
                    width={240}
                    height={240}
                    className="w-36 md:w-48 pb-6 md:pb-0 object-contain"
                />

                <div className="flex items-center space-x-3 flex-1 justify-end w-full">
                    {/* Search Bar */}
                    <form className="flex items-center space-x-1 bg-white rounded-md p-1 shadow-md flex-1 md:flex-initial">
                        <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search"
                            className="flex-1 outline-none p-1"
                            value={searchString}
                            onChange={(e) => setSearchString(e.target.value)}
                        />
                        <button type="submit" hidden>
                            Search
                        </button>
                    </form>

                    {/* Avatar */}
                    <Avatar
                        name="Adnan Hussain"
                        size="46"
                        round
                        color="#0055d1"
                    />
                </div>
            </div>

            {/* <GPTSuggestion /> */}
        </header>
    );
};

export default Header;
