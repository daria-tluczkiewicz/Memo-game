import { animated, useSpring } from "@react-spring/web";
import { incrementMovesCount } from "../redux/memoSlice";
import { useDispatch } from "react-redux";

interface TileProps {
  tile: { image: string; id: number; individualKey: string },
  flippedTiles: { key: string; id: number }[],
  isFlipped: boolean,
  setflippedTiles: React.Dispatch<React.SetStateAction<{ key: string; id: number }[]>>,
  gridSize: number,
  setMovesCount: React.Dispatch<React.SetStateAction<number>>
}

const Tile: React.FC<TileProps> =({ tile, flippedTiles, isFlipped, setflippedTiles, gridSize, setMovesCount }) => {
  
  const { transform } = useSpring({
    transform: `perspective(600px) rotateY(${isFlipped ? 180 : 0}deg)`,
    config: { duration: 500 },
  });
  const { backTransform } = useSpring({
    backTransform: `perspective(600px) rotateY(${isFlipped ? 0 : -180}deg)`,
    config: { duration: 500 },
  });
  const dispatch = useDispatch()

  function updateFlippedTiles() {
    if (flippedTiles.length === 2 ) {
      dispatch(incrementMovesCount())
      // setMovesCount((moves) => moves + 1)
      setflippedTiles([{key: tile.individualKey, id: tile.id}])
      // compareTiles()
    } else {
      setflippedTiles([...flippedTiles, {key: tile.individualKey, id: tile.id}])
    }
  }

  return (
    <>
      <div
        key={tile.individualKey}
        className="tile"
        onClick={() => isFlipped? null : updateFlippedTiles()}
        id={tile.id.toString()}
        style={{ width: `${ 100/gridSize - 5 }vw`}}
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
}

export default Tile