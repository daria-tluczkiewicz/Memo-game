
import { useAppSelector } from "../redux/hooks"

export default function GameOver({ newGame }) {

  const movesCount: number = useAppSelector(state => state.memo.movesCount)
  return (
    <>
      <h2>Congratulations!</h2>
      <p>You finished in {movesCount} moves.</p>
      <button onClick={newGame}>New Game</button>
    </>
  )
}
