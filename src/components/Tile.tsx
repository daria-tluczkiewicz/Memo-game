import { TileType } from "@/utils/generateGrid";
import { useAppDispatch, useAppSelector } from "@app/store";
import { animated, useSpring } from "@react-spring/web";
import { addCorrectTile, addFlippedTile, clearAndAddNewTile, incrementMovesCount, removeFromFlippedTiles } from "../redux/memoSlice";



const Tile = ({ tile, isFlipped }: {
  tile: TileType,
  isFlipped: boolean,
}) => {

  const flippedTiles = useAppSelector(state => state.memo.flippedTiles)
  const correctTiles = useAppSelector(state => state.memo.correctTiles)
  const gridSize = useAppSelector(state => state.memo.gridSize)
  const { id: tileId } = tile

  const { transform } = useSpring({
    transform: `perspective(600px) rotateY(${isFlipped ? 180 : 0}deg)`,
    config: { duration: 500 },
  });
  const { backTransform } = useSpring({
    backTransform: `perspective(600px) rotateY(${isFlipped ? 0 : -180}deg)`,
    config: { duration: 500 },
  })
  const dispatch = useAppDispatch()



  function updateFlippedTiles() {

    if (flippedTiles.length === 2) {
      dispatch(clearAndAddNewTile(tileId))
      return
    }
    if (flippedTiles.length === 1) {
      dispatch(incrementMovesCount())
      dispatch(addFlippedTile(tileId))

      flippedTiles[0] === tileId && !correctTiles.includes(tileId)
        ? dispatch(addCorrectTile(tileId))
        : null
      return
    }

    dispatch(addFlippedTile(tileId))
  }

  function handleTileClick() {
    isFlipped
      ? correctTiles.includes(tile.id)
        ? null
        : dispatch(removeFromFlippedTiles(tile.id))
      : updateFlippedTiles()
  }

  return (
    <>
      <div
        key={tile.id}
        className="tile"
        onClick={handleTileClick}
        id={tile.id.toString()}
        style={{ width: `${100 / gridSize - 5}vw` }}
      >
        <animated.div
          className="tile-front"
          style={{
            transform: transform,
          }}
        />
        <animated.img
          className="tile-back"
          src={tile.imageSource}
          style={{
            transform: backTransform,
          }}
        />
      </div>
    </>
  );
}

export default Tile