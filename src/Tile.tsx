import { memo } from "react";
import { animated, useSpring } from "@react-spring/web";

interface TileProps {
  tile: { image: string; id: number; individualKey: string },
  flippedTiles: { key: string; id: number }[],
  isFlipped: boolean,
  setflippedTiles: React.Dispatch<React.SetStateAction<{ key: string; id: number }[]>>
  setCorrectTiles: React.Dispatch<React.SetStateAction<number[]>>
}

const Tile: React.FC<TileProps> = memo(({ tile, flippedTiles, isFlipped, setflippedTiles, setCorrectTiles}) => {
  
  const { transform } = useSpring({
    transform: `perspective(600px) rotateY(${isFlipped ? 180 : 0}deg)`,
    config: { duration: 500 },
  });
  const { backTransform } = useSpring({
    backTransform: `perspective(600px) rotateY(${isFlipped ? 0 : -180}deg)`,
    config: { duration: 500 },
  });

  function updateFlippedTiles() {
    flippedTiles.length === 2 
      ? setflippedTiles([{key: tile.individualKey, id: tile.id}])
      : setflippedTiles([...flippedTiles, {key: tile.individualKey, id: tile.id}])
    
  }

  const flipped = flippedTiles.length === 2 ? compareTiles() : false

  function compareTiles() {
    const a: number = flippedTiles[0].id
    const b: number = flippedTiles[1].id

    if (a === b && a === tile.id) {
      setCorrectTiles((tiles)=>[...tiles, tile.id])
      return true
    }
    return false
  }

  return (
    <>
      <div
        key={tile.individualKey}
        className="tile"
        onClick={() => flipped? null : updateFlippedTiles()}
        id={tile.id.toString()}
      >
        <animated.div
          className="tile-front"
          style={{
            transform: transform,
          }}
        />
        <animated.div
          className="tile-back"
          dangerouslySetInnerHTML={{ __html: tile.image }}
          style={{
            transform: backTransform,
          }}
        />
      </div>
    </>
  );
})

export default Tile