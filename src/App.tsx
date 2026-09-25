import { useAppSelector } from '@app/store';
import RestartIcon from '@assets/restart-icon.svg?react';
import GameOver from './components/GameOver';
import Grid from './components/Grid';
import Loading from './components/Loading';
import NewGameButton from './components/NewGameButton';
import Progress from './components/Progress';
import { GAME_STATUS } from './constants';
import { useMemoGame } from './hooks/useGame';

function App() {
  const isGameLoading = useAppSelector(state => state.memo.isGameLoading)
  const gameStatus = useAppSelector(state => state.memo.gameStatus)
  const isGameOver = gameStatus === GAME_STATUS.COMPLETED
  const isGameInProgress = gameStatus === GAME_STATUS.IN_PROGRESS
  const { restartGame } = useMemoGame()

  if (isGameLoading) {
    return <Loading />
  }

  if (isGameOver) {
    return <GameOver />
  }

  return (
    <>
      {isGameInProgress
        ? (
          <div className="grid-container">
            <div className="game-header">
              <Progress />
              <button onClick={restartGame} className="restart-button">
                <RestartIcon width={14} height={14} fill="white" /> Restart
              </button>
            </div>
            <Grid />
          </div>
        )
        : <NewGameButton />
      }
    </>
  )
}

export default App

