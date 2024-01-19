import { v4 as uuidv4 } from 'uuid';
import { useAppDispatch } from '../redux/hooks';
import { GRID_SIZES } from '../ENUMS';
import { fetchNewIcons } from '../redux/asyncThunk';
import { changeGridSize } from '../redux/memoSlice';

export default function NewGameButton() {

  const dispatch = useAppDispatch()
  const gridSizes = GRID_SIZES

  
  const newGame = (size: number) => {
    dispatch(changeGridSize(size))
    dispatch(fetchNewIcons(size))
  }

  return (
    <>
      <h1> Choose size: </h1>
      <div className="select-grid-size">
        {gridSizes.map(size => (
          <button key={uuidv4()} onClick={()=>newGame(size)}>{size} X {size}</button>
        ))}
      </div>
    </>
  )
}
