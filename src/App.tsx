import { useAppSelector } from '@app/store';
import GameOver from './components/GameOver';
import Grid from './components/Grid';
import Loading from './components/Loading';
import NewGameButton from './components/NewGameButton';
import Progress from './components/Progress';

function App() {
  const isGameLoading = useAppSelector(state => state.memo.isGameLoading)
  const isGameOver = useAppSelector(state => state.memo.isGameOver)
  const numberOfIcons = useAppSelector(state => state.memo.icons.length)


  return (
    <>
      {isGameLoading
        ? <Loading />
        : isGameOver
          ? <GameOver />
          : numberOfIcons > 1
            ? <div className="grid-container">
              <Progress />
              <Grid />
            </div>
            : <NewGameButton />
      }
    </>
  )
}

export default App

