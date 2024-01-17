
import { useAppDispatch } from "../redux/hooks"

export default function GameOver({ newGame }) {

  const movesCount: number = useAppDispatch(state => state.memo.movesCount)
  return (
    <>
      <h2>Congratulations, you won!</h2>
      <p>You've used {movesCount} moves.</p>
      <button onClick={newGame}>New Game</button>
    </>
  )
}
