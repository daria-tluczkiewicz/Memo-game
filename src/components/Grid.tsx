import { generateGrid } from '@/utils/generateGrid';
import { useAppDispatch, useAppSelector } from '@app/store';
import { useEffect } from "react";
import { endGame } from "../redux/memoSlice";
import Tile from "./Tile";



export default function Grid() {

  const flippedTiles = useAppSelector(state => state.memo.flippedTiles)
  const correctTiles = useAppSelector(state => state.memo.correctTiles)
  const gridSize = useAppSelector(state => state.memo.gridSize)
  const icons = useAppSelector(state => state.memo.icons)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (correctTiles.length - 1 === icons.length / 2 - 1) {
      setTimeout(() => dispatch(endGame()), 800)
    }
  }, [correctTiles.length, icons.length, dispatch])

  const grid = generateGrid({ icons })

  const isAlreadyFlipped = (tileKey: string): boolean => {
    return flippedTiles.some(tileId => tileId === tileKey)
  };
  console.log({ grid })

  return (
    <div className='icon-grid' style={{ '--grid-size': gridSize } as React.CSSProperties}>
      {grid?.map(tile => (
        <Tile
          key={tile.id}
          tile={tile}
          isFlipped={
            correctTiles.includes(tile.iconId) || isAlreadyFlipped(tile.id)
              ? true
              : false
          }
        />
      ))}
    </div>
  )
}
