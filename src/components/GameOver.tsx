
import { useAppDispatch, useAppSelector } from "../redux/hooks"
import { resetIcons, startGame } from "../redux/memoSlice"

export default function GameOver() {

  const dispatch = useAppDispatch()

  const newGame = () => {
    dispatch(resetIcons())
    dispatch(startGame())
  }
  const movesCount: number = useAppSelector(state => state.memo.movesCount)
  return (
    <>
      <h2>Congratulations!</h2>
      <p>You finished in {movesCount} moves.</p>
      <button onClick={newGame}>New Game</button>
    </>
  )
}
