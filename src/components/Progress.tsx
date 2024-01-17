import { useSelector } from "react-redux"

export default function Progress() {

  const movesCount = useSelector(state => state.memo.movesCount)

  return (
    <div className="progress">Moves: {movesCount}</div>
  )
}
