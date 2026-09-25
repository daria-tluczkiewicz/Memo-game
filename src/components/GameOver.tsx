
import { GAME_STATUS } from "@/constants"
import { changeGameStatus } from "@/features/game-management/memoSlice"
import { useAppDispatch, useAppSelector } from "@app/store"

export default function GameOver() {
  const dispatch = useAppDispatch()

  const movesCount: number = useAppSelector(state => state.memo.movesCount)

  return (
    <>
      <h2>Congratulations!</h2>
      <p>You finished in {movesCount} moves.</p>
      <button onClick={() => dispatch(changeGameStatus(GAME_STATUS.NOT_STARTED))}>New Game</button>
    </>
  )
}
