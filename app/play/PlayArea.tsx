'use client'
import Image from "next/image"
import { MutableRefObject, useRef, useState } from "react"

import grid from "@/app/assets/grid.png"
import xPlayer from "@/app/assets/x-player.png"
import oPlayer from "@/app/assets/o-player.png"

export default function PlayArea() {
    const [cells, setCells] = useState(
        [ 
            [ 0, 0, 0 ],
            [ 0, 0, 0 ],
            [ 0, 0, 0 ]
        ]
    )
    const [player, setPlayer] = useState(1)
    const gridRef = useRef<HTMLImageElement | null>(null)
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
            <Image className="z-20 relative" src={grid} alt="Tic-tac-toe grid" onClick={handleMove}
                ref={gridRef}/>
            {markOnGrid(cells, gridRef)}
        </div>
    )
}

function markOnGrid(cells: number[][], gridRef: MutableRefObject<HTMLImageElement | null>) {
    if (gridRef.current == null)
        return []
    let marks: JSX.Element[] = []
    const offsetGridX = [
        [7, 18, 27],
        [7, 18, 27],
        [7, 18, 27],
    ]
    const offsetGridY = [
        [10, 10, 10],
        [18, 18, 18],
        [25, 25, 25],
    ]
    for (let y = 0; y < cells.length; y++) {
        for (let x = 0; x < cells[y].length; x++) {
            if (cells[y][x] == 0)
                continue
            let cellSize = gridRef.current.width / 3
            let posX = gridRef.current.offsetLeft + cellSize * x + offsetGridX[y][x]
            let posY = gridRef.current.offsetTop + cellSize * y + offsetGridY[y][x]
            let style = {
                left: posX,
                top: posY
            }
            let player = cells[y][x] == 1 ? 
                <Image className="absolute" src={xPlayer} alt="X mark" key={"x"+x+""+y} style={style}/> :
                <Image className="absolute" src={oPlayer} alt="X mark" key={"o"+x+""+y} style={style}/>
            marks.push(player)
        } 
    }
    return marks
}