import { useState, useMemo, useEffect } from "react";
import Tile from "./Tile";
import { v4 as uuidv4 } from 'uuid';
import Progress from "./Progress";

interface GridProps {
  icons: { image: string; id: number }[];
  keys: string[],
  setIsGameOver: React.Dispatch<React.SetStateAction<boolean>>
  gridSize: number
}

export default function Grid({ icons, keys, setIsGameOver, gridSize }: GridProps) {

  const [flippedTiles, setflippedTiles] = useState<{ 
    key: string,
    id: number 
  }[]>([]);

  const [correctTiles, setCorrectTiles] = useState<number[]>([])
  const [movesCount, setMovesCount] = useState<number>(0)

  useEffect(()=> {
    if (correctTiles.length - 1 === icons.length - 1) {
     setIsGameOver(true)
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
    const fullicons = icons.concat(icons);

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
  
  console.log({correctTiles, flippedTiles})

  flippedTiles.length === 2 
  ? compareTiles()
  : null

  function compareTiles() {
    const a: number = flippedTiles[0].id
    const b: number = flippedTiles[1].id
    
    if (a === b) {
      !correctTiles.includes(b)? setCorrectTiles((correctTiles) => [...correctTiles, b]) : null
      return true
    }
    return false
  }

  

  return (
    <>
      <div className="grid-container">
        <Progress
          movesCount={movesCount}
        />
        {grid.map((icons, index) => (
          <div key={keys[index]} className={"vertical-container"}>
            {icons.map((tile) => {
              // console.log({correctTiles})
              return (
                <Tile
                  flippedTiles={flippedTiles}
                  setflippedTiles={setflippedTiles}
                  setMovesCount={setMovesCount}
                  key={tile.individualKey}
                  tile={tile}
                  gridSize={gridSize}
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
      </div>
    </>
  )
}
