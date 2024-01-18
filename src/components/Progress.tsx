
import { useAppSelector } from "../redux/hooks"


export default function Progress() {
  
  const movesCount = useAppSelector(state => state.memo.movesCount)

  return (
    <div className="progress">Moves: {movesCount}</div>
  )
}
