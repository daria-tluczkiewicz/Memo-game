
export default function GameOver({newGame}) {
  return (
    <>
      <div>Congratulations, you won!</div>
      <button onClick={newGame}>New Game</button>
    </>
  )
}
