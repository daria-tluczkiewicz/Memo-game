import { useMemo, useEffect } from "react";
import Tile from "./Tile";
import { v4 as uuidv4 } from 'uuid';
import {  useAppDispatch, useAppSelector } from "../redux/hooks"
import { endGame } from "../redux/memoSlice";

interface GridProps {
  keys: string[],
}
interface GridType {
    image: string,
    id: number,
    individualKey: string
}

export default function Grid({ keys }: GridProps) {

  const flippedTiles = useAppSelector( state => state.memo.flippedTiles)
  const correctTiles = useAppSelector( state => state.memo.correctTiles)
  const gridSize = useAppSelector(state => state.memo.gridSize)
  const icons = useAppSelector(state => state.memo.icons)
  const dispatch = useAppDispatch()

  useEffect(()=> {
    if (correctTiles.length - 1 === icons.length / 2 - 1) {
     setTimeout(() => dispatch(endGame()), 800) 
  }
  },[correctTiles.length, icons.length, dispatch])


  const createGrid: () => [GridType[]] = () => {

    const grid: [GridType[]] = [[]]

    const iconsCopy = [...icons]

    for (let x = 0; x < gridSize; x++) {
      const row: GridType[] = []
      
      for (let y = 0; y < gridSize; y++) {

        const index: number = randomNumberFromRange(0, iconsCopy.length - 1)
        const tileId = iconsCopy[index].id
        const individualKey: string = uuidv4()

        row.push({
          image: iconsCopy[index].image,
          id: tileId,
          individualKey: individualKey,
        })

        iconsCopy.splice(index, 1)
      }
      if (x === 0) {
        grid[0] = row
      } else {
        grid.push(row)
      }
    }
    return grid
  }

  function randomNumberFromRange(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
  
  const grid = useMemo(createGrid, [icons, gridSize])

  const isAlreadyFlipped = (tileKey: string): boolean => {
    return flippedTiles.some(tile => tile.key === tileKey)
  };
  
  return (
    <>
      {grid.map((icons, index) => (
        <div key={keys[index]} className={"vertical-container"}>
          {icons.map((tile) => {
            return (
              <Tile
                key={tile.individualKey}
                tile={tile}
                isFlipped={
                  correctTiles.includes(tile.id) || isAlreadyFlipped(tile.individualKey)
                    ? true
                    : false
                }
              />
            );
          })}
        </div>
      ))}
    </>
  )
}
