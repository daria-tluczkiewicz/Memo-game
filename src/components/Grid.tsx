import { useAppSelector } from '@app/store';
import { useMemoGame } from '@hooks/useGame';
import { generateGrid } from '@utils/generateGrid';
import { useMemo } from "react";
import Tile from "./Tile";

export default function Grid() {

  const matchedTiles = useAppSelector(state => state.memo.matchedTiles)
  const flippedTiles = useAppSelector(state => state.memo.flippedTiles)
  const flippedTilesIds = flippedTiles.map(tile => tile.id)
  const gridSize = useAppSelector(state => state.memo.gridSize)
  const icons = useAppSelector(state => state.memo.icons)
  const grid = useMemo(() => generateGrid({ icons }), [icons])
  const { handleTileClick } = useMemoGame()

  return (
    <div className='icon-grid' style={{ '--grid-size': gridSize } as React.CSSProperties}>
      {grid?.map(tile => (
        <Tile
          key={tile.id}
          tile={tile}
          isFlipped={matchedTiles.includes(tile.iconId) || flippedTilesIds.includes(tile.id)}
          onClick={() => handleTileClick(tile)}
        />
      ))}
    </div>
  )
}