import { v4 as uuidv4 } from 'uuid';
import { useAppDispatch } from '../redux/hooks';
import { changeGameLoadingstatus, changeGridSize } from '../redux/memoSlice';
import { GRID_SIZES } from '../ENUMS';

export default function NewGameButton({ newGame }) {

  const dispatch = useAppDispatch()
  const gridSizes = GRID_SIZES

  function startGameWithCustomSize(size: number){
    dispatch(changeGameLoadingstatus(true))
    dispatch(changeGridSize(size))
    newGame(size)
  }

  return (
    <>
      <h1> Choose size: </h1>
      <div className="select-grid-size">
        {gridSizes.map(size => (
          <button key={uuidv4()} onClick={()=>startGameWithCustomSize(size)}>{size} X {size}</button>
        ))}
      </div>
    </>
  )
}
