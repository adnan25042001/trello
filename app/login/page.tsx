import Footer from "@/components/Footer";
import Image from "next/image";
import React from "react";
import google from "@/images/google.png";
import microsoft from "@/images/microsoft.png";
import apple from "@/images/apple.png";
import slack from "@/images/slack.png";

const buttonList = [
    { name: "Google", img: google },
    { name: "Microsoft", img: microsoft },
    { name: "Apple", img: apple },
    { name: "Slack", img: slack },
];

const login = () => {
    return (
        <div className="relative h-[100vh] overflow-y-auto">
            <div className="my-10 w-full">
                <div className="max-w-[400px] m-auto">
                    <Image
                        src="https://links.papareact.com/c2cdd5"
                        alt="trello logo"
                        width={240}
                        height={240}
                        className="w-48 pb-6 md:pb-0 object-contain m-auto"
                    />
                    <div className="flex flex-col items-center justify-center rounded-md mt-10 p-10 shadow-md bg-white">
                        <h1 className="font-bold text-gray-500 text-lg">
                            Log in to Trello
                        </h1>
                        <form className="w-full flex flex-col gap-4 mt-6">
                            <input
                                type="text"
                                placeholder="Enter email"
                                className="px-2 py-[6px] border-[2px] border-gray-300 rounded bg-gray-50"
                            />
                            <input
                                type="submit"
                                value="Continue"
                                className="text-white font-bold px-2 py-[6px] bg-[#5AAC44] hover:bg-opacity-[0.85] rounded transition-all"
                            />
                        </form>
                        <p className="text-sm text-gray-500 my-3">OR</p>
                        <div className="w-full flex flex-col gap-3">
                            {buttonList.map((item) => (
                                <button
                                    key={item.name}
                                    className="w-full flex items-center justify-center gap-2 p-2 shadow-btnShadow hover:bg-gray-100 transition-all rounded"
                                >
                                    <Image
                                        src={item.img}
                                        alt={item.name}
                                        height={22}
                                        width={22}
                                    />
                                    Continue with {item.name}
                                </button>
                            ))}
                        </div>
                        <div className="w-full border-t-[1px] border-gray-300 mt-6 mb-4"></div>
                        <a href="#" className="text-sm text-blue-500 hover:underline">Sign up for an account</a>
                    </div>
                    <div className="flex justify-center items-center space-x-[10px] text-xs text-blue-500 mt-5">
                        <a href="#" className="hover:underline">
                            Privacy Policy
                        </a>
                        <div className="h-[3px] w-[3px] rounded-full bg-black"></div>
                        <a href="#" className="hover:underline">
                            Terms of Service
                        </a>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default login;
