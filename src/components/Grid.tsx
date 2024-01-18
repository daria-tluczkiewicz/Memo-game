import { useMemo, useEffect } from "react";
import Tile from "./Tile";
import { v4 as uuidv4 } from 'uuid';
import {  useAppSelector } from "../redux/hooks"

interface GridProps {
  icons: { image: string; id: number }[];
  keys: string[],
  setIsGameOver: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Grid({ icons, keys, setIsGameOver}: GridProps) {


  const flippedTiles = useAppSelector( state => state.memo.flippedTiles)
  const correctTiles = useAppSelector( state => state.memo.correctTiles)
  const gridSize = useAppSelector(state => state.memo.gridSize)

  console.log({gridSize})

  useEffect(()=> {
    if (correctTiles.length - 1 === icons.length - 1) {
     setTimeout(() => setIsGameOver(true), 800) 
  }
  },[correctTiles.length, setIsGameOver, icons.length])

 
  const createGrid: () => [{ 
    image: string,
    id: number,
    individualKey: string
  }[]] = () => {
    const grid: [{ 
      image: string,
      id: number,
      individualKey: string
    }[]] = [[]]
    const fullicons = icons.concat(icons)

    

    for (let x = 0; x < gridSize; x++) {
      const row: {
        image: string,
        id: number,
        individualKey: string,
      }[] = []
      
      for (let y = 0; y < gridSize; y++) {
        const index: number = Math.floor(Math.random() * fullicons.length);
        const tileId = fullicons[index].id;
        const individualKey: string = uuidv4()
        row.push({
          image: fullicons[index].image,
          id: tileId,
          individualKey: individualKey,
        });
        fullicons.splice(index, 1);
      }
      if (x === 0) {
        grid[0] = row
      } else {
        grid.push(row);

      }
    }
    return grid
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
