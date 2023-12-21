import { useEffect, useState} from "react";
import Tile from "./Tile";
import ProgressBar from "./ProgressBar";

export default function Grid({ icons }) {
  const [grid, setGrid] =
    useState<
      Array<Array<{ image: string; id: number; individualKey: string }>>
      >();
      
  const [flippedTiles, setflippedTiles] = useState<string[]>([]);
  const [correctTiles, setCorrectTiles] = useState<number[]>([]);
  const [tilesToCompare, setTilesToCompare] = useState<number[]>([]);
  // const progress = useRef<number>(0);
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    createGrid(4, icons);
  }, [icons]);
  useEffect(() => {
  }, [correctTiles]);

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
    if (flippedTiles.length === 2) {
      compereTiles()
      setflippedTiles([]);
      setTilesToCompare([])
    }
    setTilesToCompare((tilesToCompare) => [...tilesToCompare, id])
    setflippedTiles((flippedTiles) => [...flippedTiles, key]);
  }

  
function compereTiles() {
  const a: number = tilesToCompare[0]
  const b: number = tilesToCompare[1]

  if(a === b) {
    setCorrectTiles(correctTiles => [...correctTiles, b])
    // progress.current++ 
    setProgress(correctTiles.length + 2  / 2)
  } 
}

const keys = (icons: string[]) => {
  const keys: string[] = []
  for(let i: number = 0; i < icons.length; i++){
    keys.push(crypto.randomUUID())
  }
  return keys
}
console.log(progress)

  return (
    <div className="grid-container">
      <ProgressBar currentProgress={progress} maxProgress={icons.length}/>

      {grid?.map((icons, index) => (
        <div key={keys[index]} className={"vertical-container"}>
          {icons.map((tile) => {
            return (
                <Tile
                  tile={tile}
                  onFlippedChange={handleFlippedChange}
                  isFlipped={flippedTiles.includes(tile.individualKey) || correctTiles.includes(tile.id)}
                />
            )
          })}
        </div>
      ))}
    </div>
  );
}
