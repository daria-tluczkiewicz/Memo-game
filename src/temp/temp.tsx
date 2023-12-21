import { useEffect, useState } from "react";
import Tile from "./Tile";

export default function Grid({ icons }) {
  const [grid, setGrid] =
    useState<Array<Array<{ image: string; id: number }>>>();

//   const [flippedPair, setFlippedPair] = useState<{isFlipped: boolean, id: number}[]>([]);
//   const [isFlipped, setFlipped] = useState(false);

  const [flippedTiles, setFlippedTiles] = useState<string[]>([]);

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

//   function handleFlippedChange(newState: boolean, id: number) {
    //   }
    
//     const handleFlipTile = (id) => {
//         setFlippedTiles((prevFlippedTiles) => [...prevFlippedTiles, id]);
//         // setFlippedPair(flippedPair => [...flippedPair, {isFlipped: newState, id: id }]);
//     let newState: boolean = true

//     if (flippedPair.length === 2) {
//         newState = false
//     }
//     setFlipped(newState)

//   }
const handleFlipTile = (key: string) => {
  if (flippedTiles.includes(key)) {
    // Tile is already flipped, do nothing or implement additional logic
    return;
  }

  // Flip the current tile
  setFlippedTiles((prevFlippedTiles) => [...prevFlippedTiles, key]);

  // Check if more than two tiles are flipped

  if (flippedTiles.length === 2) {

      setFlippedTiles([]);
  }
};


  return (
    <div className="grid-container">
      {grid?.map((icons) => (
        <div className={"vertical-container"}>
          {icons.map((tile) => {
            const individualKey: string = crypto.randomUUID()
            return <Tile individualKey={individualKey} tile={tile} flipTile={handleFlipTile} isFlipped={flippedTiles.includes(individualKey)} />;
          })}
        </div>
      ))}
    </div>
  );
}














import { animated, useSpring } from "@react-spring/web";

export default function Tile({ individualKey, isFlipped, tile, flipTile }) {
  
  
  const { transform } = useSpring({
    transform: `perspective(600px) rotateY(${isFlipped ? 180 : 0}deg)`,
    config: { duration: 500 },
  });
  const { backTransform } = useSpring({
    backTransform: `perspective(600px) rotateY(${isFlipped ? 0 : -180}deg)`,
    config: { duration: 500 },
  });


//   const flipTile = () => {
//     let newState: boolean = true

//     if (flippedPair.length === 2) {
//         newState = false
//     }
//     setFlipped(newState)

//     newState? onFlippedChange(newState, tile.id) : null
//   }


  console.log(isFlipped)

  return (
    <>
      <div
        className="tile"
        onClick={() => flipTile(individualKey)}
        key={crypto.randomUUID()}
        id={tile.id.toString()}
      >
        <animated.div
            key={crypto.randomUUID()}
          className="tile-front"
          style={{
            transform: transform,
          }}
        />
        <animated.div
            key={crypto.randomUUID()}
          className="tile-back"
          dangerouslySetInnerHTML={{ __html: tile.image }}
          style={{
            transform: backTransform,
          }}
        />
      </div>
    </>
  );
}



const [correctTiles, setCorrectTiles] = useState<string[]>([]);
function compereTileID(a, b) {
  if(a===b) {
    setCorrectTiles(correctTiles => [...correctTiles, b])
  }
}