import Image from "next/image"

import carrot from "@/app/assets/carrot.png"
import pear from "@/app/assets/pear.png"
import PlayArea from "./PlayArea"

export default async function GamePlay() {
    return (
        <>
            <Header />
            <PlayArea playerOne="Boyfriend" playerTwo="Girlfriend"/>
        </>
    ) 
}

async function Header() {
    return (
        <div className="flex flex-row items-center gap-x-5 md:gap-x-[4rem]">
            <Image src={carrot} alt="Carrot Character"/>
            <h1 className="text-[2rem]"> vs </h1> 
            <Image src={pear} alt="Pear Character"/>
        </div>
    ) 
}
