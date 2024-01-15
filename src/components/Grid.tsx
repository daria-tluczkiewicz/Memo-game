import { useState, useMemo } from "react";
import Tile from "./Tile";
import { v4 as uuidv4 } from 'uuid';

interface Grid {
  icons: { image: string; id: number }[];
  keys: string[],
  setIsGameOver: React.Dispatch<React.SetStateAction<boolean>>
  gridSize: number
}

export default function Grid({ icons, keys, setIsGameOver, gridSize }: Grid) {

  const [flippedTiles, setflippedTiles] = useState<{ 
    key: string,
    id: number 
  }[]>([]);

  const [correctTiles, setCorrectTiles] = useState<number[]>([])

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
  console.log(grid)

  const isAlreadyFlipped = (tileToCompare: { individualKey: string }) => {
    for (const tile of flippedTiles) {
      if (tile.key === tileToCompare.individualKey) {
        return true
      }
    }
    return false
  }

  const isGameFinished = correctTiles.length === icons.length * 2
  isGameFinished? setIsGameOver(true) : null

  return (
    <>
      <div className="grid-container">
        {grid.map((icons, index) => (
          <div key={keys[index]} className={"vertical-container"}>
            {icons.map((tile) => {
              return (
                <Tile
                  setCorrectTiles={setCorrectTiles}
                  flippedTiles={flippedTiles}
                  setflippedTiles={setflippedTiles}
                  key={tile.individualKey}
                  tile={tile}
                  isFlipped={
                    correctTiles.includes(tile.id) || isAlreadyFlipped(tile)
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
