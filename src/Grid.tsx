import { useEffect, useState } from "react";
import Tile from "./Tile";

interface Grid {
  icons: { image: string; id: number }[];
  keys: string[],
  setIsGameActive: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Grid({ icons, keys, setIsGameActive }: Grid) {
  const [grid, setGrid] =
    useState<
      Array<Array<{ image: string; id: number; individualKey: string }>>
    >();

  const [flippedTiles, setflippedTiles] = useState<
    { key: string; id: number }[]
  >([]);
  const [correctTiles, setCorrectTiles] = useState<number[]>([])

  useEffect(() => {
    createGrid(4, icons)
  }, [icons]);

  useEffect(() => {
  }, [flippedTiles, correctTiles])

  function createGrid(
    gridSize: number,
    icons: Array<{ image: string; id: number }>
  ) {
    const grid: Array<
      Array<{ image: string; id: number; individualKey: string }>
    > = [];
    const fullicons = icons.concat(icons);

    for (let x = 0; x < gridSize; x++) {
      grid[x] = [];

      for (let y = 0; y < gridSize; y++) {
        const index: number = Math.floor(Math.random() * fullicons.length);
        const tileId = fullicons[index].id;
        const individualKey: string = crypto.randomUUID().slice(-5);
        grid[x].push({
          image: fullicons[index].image,
          id: tileId,
          individualKey: individualKey,
        });
        fullicons.splice(index, 1);
      }
    }
    setGrid(grid);
  }

  function handleFlippedChange(key: string, id: number) {
    if (flippedTiles.length >= 2) {
      compareTiles()
      setflippedTiles([])
    }

    setflippedTiles((flippedTiles) => [...flippedTiles, { key, id }]);
  }

  function compareTiles() {
    const a: number = flippedTiles[0].id
    const b: number = flippedTiles[1].id

    if (a === b) {
      const newCorrectTiles = [...correctTiles, b]
      setCorrectTiles(newCorrectTiles)
    }
  }

  const isAlreadyFlipped = (tileToCompare: { individualKey: string }) => {
    for (const tile of flippedTiles) {
      if (tile.key === tileToCompare.individualKey) {
        return true
      }
    }
    return false
  }

  if (correctTiles.length === icons.length) {
    setIsGameActive(false)
  }

  return (
    <>
      <div className="grid-container">
        {grid?.map((icons, index) => (
          <div key={keys[index]} className={"vertical-container"}>
            {icons.map((tile) => {
              return (
                <Tile
                  key={tile.individualKey}
                  tile={tile}
                  onFlippedChange={handleFlippedChange}
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
      <button onClick={() => setIsGameActive(false)}/>
    </>
  )
}
