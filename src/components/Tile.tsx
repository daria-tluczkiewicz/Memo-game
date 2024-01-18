import { animated, useSpring } from "@react-spring/web"
import { addCorrectTile, addFlippedTile, clearAndAddNewTile, incrementMovesCount, removeFromFlippedTiles } from "../redux/memoSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

interface TileProps {
  tile: { image: string; id: number; individualKey: string },
  isFlipped: boolean,
}

const Tile: React.FC<TileProps> =({ tile, isFlipped }) => {

  const flippedTiles = useAppSelector( state => state.memo.flippedTiles)
  const correctTiles = useAppSelector(state => state.memo.correctTiles)
  const gridSize = useAppSelector(state => state.memo.gridSize)
  
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
    console.log({flippedTiles})
    
    const newFlippedTile = {
      id: tile.id,
      key: tile.individualKey
    }

    if (flippedTiles.length === 2 ) {
      dispatch(clearAndAddNewTile(newFlippedTile))
      return
    }
    if (flippedTiles.length === 1) {
      dispatch(incrementMovesCount())
      dispatch(addFlippedTile(newFlippedTile))

      compareTiles(flippedTiles[0].id, newFlippedTile.id) &&
      !correctTiles.includes(newFlippedTile.id)
        ? dispatch(addCorrectTile(newFlippedTile.id))
        : null
      return
    }

    dispatch(addFlippedTile(newFlippedTile))

  }


  function compareTiles(a: number, b:number) {
    return a === b
  }
  
  function handleTileClick () {
    isFlipped
      ? correctTiles.includes(tile.id)
        ? null
        : dispatch(removeFromFlippedTiles(tile.individualKey))
      : updateFlippedTiles()
  }

  return (
    <>
      <div
        key={tile.individualKey}
        className="tile"
        onClick={handleTileClick}
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