
export default function GameOver({ newGame, moves='x' }) {
  return (
    <>
      <h2>Congratulations, you won!</h2>
      <p>You've used {moves} moves.</p>
      <button onClick={newGame}>New Game</button>
    </>
  )
}
