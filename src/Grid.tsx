import { useEffect, useState } from "react";
import Tile from "./Tile";

export default function Grid({ icons }) {
  const [grid, setGrid] =
    useState<Array<Array<{ image: string; id: number }>>>();

  const [flippedPair, setFlippedPair] = useState<{isFlipped: boolean, id: number}[]>([]);

  useEffect(() => {
    createGrid(4, icons);
  }, [icons]);

  function createGrid(
    gridSize: number,
    icons: Array<{ image: string; id: number }>
  ) {
    const grid: Array<Array<{ image: string; id: number }>> = [];
    const fullicons = icons.concat(icons);

    for (let x = 0; x < gridSize; x++) {
      grid[x] = [];

      for (let y = 0; y < gridSize; y++) {
        const index: number = Math.floor(Math.random() * fullicons.length);
        const tileId = fullicons[index].id;
        grid[x].push({ image: fullicons[index].image, id: tileId });
        fullicons.splice(index, 1);
      }
    }
    setGrid(grid);
  }

  function handleFlippedChange(newState: boolean, id: number) {
    setFlippedPair(flippedPair => [...flippedPair, {isFlipped: newState, id: id }]);
  }

  return (
    <div className="grid-container">
      {grid?.map((icons) => (
        <div className={"vertical-container"}>
          {icons.map((tile) => {
            return <Tile tile={tile} onFlippedChange={handleFlippedChange} flippedPair={flippedPair} />;
          })}
        </div>
      ))}
    </div>
  );
}
