// import { useState } from 'react'
import { useState } from 'react';
import './App.scss'
import axios from 'axios';
import { iconsArray } from './ENUMS';
import { hexColor } from './ENUMS';
import Grid from './Grid';
import GameOver from './GameOver';
import NewGameButton from './NewGameButton';
import Loading from './Loading';

function App() {
  const [icons, setIcons] = useState<{image: string, id: number}[]>([])
  const [isGameOver, setIsGameOver] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  

  const newGame = async () => {
    try {
      const icons: {image: string, id: number}[] = []

      // TODO: gridSize state
      for (let i = 0; i < 8; i++) {
        const iconIndex: number = Math.floor(Math.random() * iconsArray.length)
        const color = hexColor()
        const response = await axios.get(`https://api.dicebear.com/7.x/icons/svg?backgroundColor=${color}&icon=${iconsArray[iconIndex]}`)
        const imgPath = response.data
        icons.push({ image: imgPath, id: i})
      }
      setIcons(icons)
      setIsLoading(false)
      setIsGameOver(false)
    } catch (error) {
      console.error(error)
    }
  }

  const keys = () => {
    const keys: string[] = []
    for(let i: number = 0; i < 5; i++){
      keys.push(crypto.randomUUID())
    }
    return keys
  }

  return (
    <>
      {isLoading
      ? <NewGameButton newGame={newGame}/>

      : isGameOver
        ? <GameOver newGame={newGame} /> 
        : icons.length > 1 
          ? <Grid 
              keys={keys()} 
              icons={icons} 
              setIsGameOver={setIsGameOver}
            />
          : <Loading/>
      }
    </>
  )
}

export default App

