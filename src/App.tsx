import './App.scss'
import Grid from './components/Grid';
import GameOver from './components/GameOver';
import NewGameButton from './components/NewGameButton';
import Loading from './components/Loading';
import { v4 as uuidv4 } from 'uuid';
import { useAppSelector } from './redux/hooks';
import Progress from './components/Progress';

function App() {
  const gridSize = useAppSelector(state => state.memo.gridSize)
  const isGameLoading = useAppSelector(state => state.memo.isGameLoading)
  const isGameOver = useAppSelector(state => state.memo.isGameOver)
  const numberOfIcons = useAppSelector(state => state.memo.icons.length)
  

  
  const keys = () => {
    const keys: string[] = []
    for(let i: number = 0; i <= gridSize; i++){
      keys.push(uuidv4())
    }
    return keys
  }
  
  return (
    <>
      {isGameLoading
      ? <Loading/> 
      : isGameOver
        ? <GameOver/> 
        : numberOfIcons > 1 
          ? <div className="grid-container">
              <Progress/>
              <Grid keys={keys()} 
              />
            </div>
          :  <NewGameButton/>
      }
    </>
  )
}

export default App

