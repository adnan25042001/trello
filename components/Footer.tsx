import React from "react";
import img1 from "@/images/image-1.png";
import img2 from "@/images/image-2.png";
import atlassian from "@/images/atlassian-logo.svg";
import Image from "next/image";

const footerList = [
    "Templates",
    "Pricing",
    "Apps",
    "Jobs",
    "Blog",
    "Developers",
    "About",
    "Help",
];

const Footer = () => {
    return (
        <div className="w-full">
            <Image
                src={img1}
                alt="left image"
                height={300}
                width={300}
                className="fixed bottom-0 left-0 transition-all hidden sm:block sm:w-56 md:w-72 lg:w-[440px] -z-10"
            />
            <Image
                src={img2}
                alt="right image"
                height={300}
                width={300}
                className="fixed bottom-0 right-0 transition-all hidden sm:block sm:w-56 md:w-80 lg:w-[440px] -z-10"
            />
            <div className="max-w-[400px] m-auto py-7 border-t-[1px] border-gray-300">
                <Image
                    src={atlassian}
                    alt="Atlassian logo"
                    width={100}
                    height={40}
                    className="m-auto w-36"
                />
                <div className="m-auto mt-7 flex flex-wrap items-center justify-center space-x-3 text-sm font-light text-gray-400 sm:px-14 md:px-8 lg:px-0">
                    {footerList.map((item) => (
                        <span key={item}>{item}</span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Footer;
