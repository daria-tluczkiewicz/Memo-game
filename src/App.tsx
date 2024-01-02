// import { useState } from 'react'
import { useEffect, useState } from 'react';
import './App.scss'
import axios from 'axios';
import { iconsArray } from './ENUMS';
import { hexColor } from './ENUMS';
import Grid from './Grid';
import GameOver from './GameOver';

function App() {
  const [icons, setIcons] = useState<{image: string, id: number}[]>([])
  const [isGameActive, setIsGameActive] = useState<boolean>(false)

  useEffect(()=> {

  }, [isGameActive])
  

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
      setIsGameActive(true)
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
      {isGameActive && icons.length > 1
      ? <Grid keys={keys()} icons={icons} setIsGameActive={setIsGameActive}/>
      : <GameOver newGame={newGame} />
      }
    </>
  )
}

export default App

