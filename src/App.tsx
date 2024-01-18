// import { useState } from 'react'
import { useState } from 'react';
import './App.scss'
import axios from 'axios';
import { iconsArray } from './ENUMS';
import { hexColor } from './ENUMS';
import Grid from './components/Grid';
import GameOver from './components/GameOver';
import NewGameButton from './components/NewGameButton';
import Loading from './components/Loading';
import { v4 as uuidv4 } from 'uuid';
import { changeGameLoadingstatus, resetCorrectTiles, resetFlippedTiles, resetMoves } from './redux/memoSlice';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import Progress from './components/Progress';

function App() {
  const [icons, setIcons] = useState<{image: string, id: number}[]>([])
  const [isGameOver, setIsGameOver] = useState<boolean>(false)
  const gridSize = useAppSelector(state => state.memo.gridSize)
  const isGameLoading = useAppSelector(state => state.memo.isGameLoading)

  const dispatch = useAppDispatch()

  const newGame = async (size: number) => {

    try {
      const icons: {image: string, id: number}[] = []

      for (let i = 0; i < size * size / 2; i++) {
        const iconIndex: number = Math.floor(Math.random() * iconsArray.length)
        const color = hexColor()
        const response = await axios.get(`https://api.dicebear.com/7.x/icons/svg?backgroundColor=${color}&icon=${iconsArray[iconIndex]}`)
        const imgPath = response.data
        icons.push({ image: imgPath, id: i})
      }

      setIcons(icons)
      setIsGameOver(false)
      dispatch(changeGameLoadingstatus(false))
      dispatch(resetMoves())
      dispatch(resetFlippedTiles())
      dispatch(resetCorrectTiles())

    } catch (error) {
      console.error(error)
    }
  }

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
        ? <GameOver newGame={newGame} /> 
        : icons.length > 1 
          ? <div className="grid-container">
              <Progress/>
              <Grid 
                keys={keys()} 
                icons={icons} 
                setIsGameOver={setIsGameOver}
              />
            </div>
          :  <NewGameButton 
              newGame={newGame} 
            />
      }
    </>
  )
}

export default App

