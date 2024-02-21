'use client'
import Image from "next/image"
import { MutableRefObject, useRef, useState, useEffect } from "react"

import grid from "@/app/assets/grid.png"
import xPlayer from "@/app/assets/x-player.png"
import oPlayer from "@/app/assets/o-player.png"

enum GameStatus {
    PENDING = "PENDING",
    STARTED = "STARTED",
    ENDED = "ENDED"
}

export default function PlayArea() {
    const [cells, setCells] = useState(
        [ 
            [ 0, 0, 0 ],
            [ 0, 0, 0 ],
            [ 0, 0, 0 ]
        ]
    )
    const [player, setPlayer] = useState(1)
    const [winner, setWinner] = useState(0)
    const [gameStatus, setGameStatus] = useState(GameStatus.PENDING)
    const gridRef = useRef<HTMLImageElement | null>(null)
    
    useEffect(() => {
        let potentialWinner = checkForWinner(cells)
        
        if (potentialWinner != 0) {
            console.log("Player " + potentialWinner + " won!!!")
            setWinner(potentialWinner)
            setGameStatus(GameStatus.ENDED)
        }
    }, [cells])

    const handleMove = (event: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
        if (gameStatus == GameStatus.ENDED) {
            console.log("Game has already ended!")
            return
        } else if (gameStatus == GameStatus.PENDING) {
            console.log("Game has been started!")
            setGameStatus(GameStatus.STARTED)
        }

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
        setPlayer(player == 1 ? -1 : 1)
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

function checkForWinner(cells: number[][]) {
    for (let y = 0; y < cells.length; y++) {
        let horSum = 0;
        let verSum = 0;
        for (let x = 0; x < cells[y].length; x++) {
            horSum += cells[y][x]
            verSum += cells[x][y]
        }

        if (horSum == 3 || verSum == 3)
            return 1
        else if (horSum == -3 || verSum == -3)
            return -1
    }
    let negSlopeSum = cells[0][0] + cells[1][1] + cells[2][2];
    let posSlopeSum = cells[0][2] + cells[1][1] + cells[2][0];

    if (negSlopeSum == 3 || posSlopeSum == 3)
        return 1
    else if (negSlopeSum == -3 || posSlopeSum == -3)
        return -1

    return 0
}