import { v4 as uuidv4 } from 'uuid';
export default function NewGameButton({ newGame, setGridSize, setIsLoading }) {

  function startGameWithCustomSize(size: number){
    setIsLoading(true)
    setGridSize(size)
    newGame(size)
  }

  const gridSizes = [2, 4, 5, 6, 7]
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
