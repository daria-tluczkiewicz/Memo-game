export default function NewGameButton({ newGame, setGridSize, setIsLoading }) {

  function startGameWithCustomSize(size: number){
    setIsLoading(true)
    setGridSize(size)
    newGame(size)
  }
  return (
    <>
      <h1> Choose size: </h1>
      <div className="select-grid-size">
        <button onClick={()=>startGameWithCustomSize(8)}>8 X 8</button>
        <button onClick={()=>startGameWithCustomSize(6)}>6 X 6</button>
        <button onClick={()=>startGameWithCustomSize(4)}>4 X 4</button>
      </div>
    </>
  )
}
