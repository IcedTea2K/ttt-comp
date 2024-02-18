'use client'
import Image from "next/image"
import { useState } from "react"

import grid from "@/app/assets/grid.png"

export default function PlayArea() {
    const [cells, setCells] = useState(
        [ 
            [ 0, 0, 0 ],
            [ 0, 0, 0 ],
            [ 0, 0, 0 ]
        ]
    )
    const [player, setPlayer] = useState(1)
    const handleMove = (event: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
        event.preventDefault()
        let localX = event.pageX - event.currentTarget.offsetLeft
        let localY = event.pageY - event.currentTarget.offsetTop
        let cellSize = event.currentTarget.width / 3
        let clickedX = Math.floor(localX / cellSize)
        let clickedY = Math.floor(localY / cellSize)
        
        console.log(event.clientX)
        console.log("Index X: " + clickedX  + " " + "Index Y: " + clickedY)
        setCells(cells.map(
            (vY, y) => {
                return vY.map((Vx, x) => {
                    return x == clickedX && y == clickedY && !Vx? player : Vx;
                })
            }
        )) 
        setPlayer(player == 1 ? 2 : 1)
    }
    return (
        <div className="p-6">
            <Image className="z-20 relative" src={grid} alt="Tic-tac-toe grid" onClick={handleMove}/>
            <div className="flex flex-col gap-y-8 absolute bottom-[3.8rem] z-10">
                {cells.map(
                    (vy, y) => (
                        <div className="flex flex-rol gap-x-8 z-10" key={"row" + y}>
                            {vy.map(
                                (vx, x) => {
                                    let color = "" 
                                    if (vx == 1)
                                        color = "bg-slate-950"
                                    else if (vx == 2)
                                        color = "bg-blue-500"
                                    return (
                                        <div 
                                            className={"w-[10rem] h-[10rem] z-10 " + color} key={"cell: " + x + " " + y}>
                                            
                                        </div>
                                    )
                                }
                            )}
                        </div>
                    )
                )} 
            </div>
        </div>
    )
}