import React, { useCallback, useEffect, useState} from "react";
import Tile from "./Tile";
import GameEnded from "./GameEnded";

interface Grid {
  icons:  {image: string; id: number; }[],
  keys: string[],
  endGame: React.FC
}

export default function Grid({ icons, keys, endGame }: Grid) {
  const [grid, setGrid] =
    useState<
      Array<Array<{ image: string; id: number; individualKey: string }>>
      >();
      
  const [flippedTiles, setflippedTiles] = useState<{key: string, id: number}[]>([]);
  const [correctTiles, setCorrectTiles] = useState<number[]>([]);

  useEffect(() => {
    createGrid(4, icons);
  }, [icons]);

  useEffect(() => {
    console.log(flippedTiles,correctTiles);
  }, [flippedTiles, correctTiles]);

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
    console.log('liczba odwróconych kafli: ',flippedTiles.length)
    if (flippedTiles.length >= 1) {
      console.log('sooo dwaa');
      compareTiles()
      setflippedTiles([]);
    }
    
    setflippedTiles((flippedTiles) => [...flippedTiles, {key, id}]);
  }

function compareTiles() {
  const a: number = flippedTiles[0].id
  const b: number = flippedTiles[1].id

  if(a === b) {
    const newCorrectTiles = [...correctTiles, b]
    console.log('newCorrectTile', newCorrectTiles)
    setCorrectTiles(newCorrectTiles)
    // updateCorrectTiles(newCorrectTiles)
    // setCorrectTiles([...correctTiles, b])
    console.log('setting correct tiles');
  } 
}

const isAlreadyFlipped = (tileToCompare: {
  individualKey: string;
})=> {
  for (const tile of flippedTiles) {
    if (tile.key === tileToCompare.individualKey) {
      return true
    }
  }
  return false
}


// const updateCorrectTiles = useCallback(
//   (newCorrectTiles: number[]) => {
//     setCorrectTiles(newCorrectTiles);
//     console.log('Correct Tiles Updated:', newCorrectTiles);
//   },
//   []
// )

// if(correctTiles.length === icons.length){
//   endGame(correctTiles)
//   console.log('win')
// }

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
                    isFlipped={correctTiles.includes(tile.id) || isAlreadyFlipped(tile)? true : false}
                  />
              )
            })}
          </div>
        ))}
      </div>
      <button onClick={()=>setCorrectTiles([0,1,2,3,4,5,6,7])}/>
      {correctTiles.length === icons.length? <GameEnded/> : null}
    </>
  );
}
