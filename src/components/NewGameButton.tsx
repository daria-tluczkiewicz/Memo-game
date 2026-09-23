import { useMemoGame } from '@/hooks/useGame';
import { GRID_SIZES } from '../ENUMS';

export default function NewGameButton() {
  const { startGame } = useMemoGame()

  return (
    <>
      <h1> Choose size: </h1>
      <div className="select-grid-size">
        {GRID_SIZES.map(({ id, value }) => (
          <button key={id} onClick={() => startGame(value)}>{value} X {value}</button>
        ))}
      </div>
    </>
  )
}
