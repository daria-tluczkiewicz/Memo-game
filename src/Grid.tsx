import { useEffect, useState } from "react";
import Tile from "./Tile";

export default function Grid({ icons }) {
  const [grid, setGrid] =
    useState<
      Array<Array<{ image: string; id: number; individualKey: string }>>
    >();

  const [flippedTiles, setflippedTiles] = useState<string[]>([]);

  useEffect(() => {
    createGrid(4, icons);
  }, [icons]);

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

  function handleFlippedChange(key: string) {
    if (flippedTiles.length === 2) {
      setflippedTiles([]);
    }

    setflippedTiles((flippedTiles) => [...flippedTiles, key]);
  }

 

  return (
    <div className="grid-container">
      {grid?.map((icons) => (
        <div className={"vertical-container"}>
          {icons.map((tile) => {
            return (
              <Tile
                tile={tile}
                onFlippedChange={handleFlippedChange}
                isFlipped={flippedTiles.includes(tile.individualKey)}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}
