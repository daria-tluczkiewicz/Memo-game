// import { useState } from 'react'
import { BaseSyntheticEvent, useEffect, useRef, useState} from 'react';
import './App.scss'
import axios from 'axios';
import { iconsArray } from './icons';
import { hexArray } from './icons';

function App() {
  const [tiles, setTiles] = useState<string[]>([])
  const pair = useRef<string[]>([])
  const revealedTiles = useRef<HTMLDivElement[]>([]);
  const progress = useRef<number>(0);
  const [isGameActive, setIsGameActive] = useState<boolean>(false)

  useEffect(()=>{},[tiles])
  
  function createGrid(gridSize: number) {
    const grid: Array<Array<string>> = [];
    const dbsymbols = tiles.concat(tiles)
  
    for (let x = 0; x < gridSize; x++){
      grid[x] = []

      for (let y = 0; y < gridSize; y++){
        const index: number = Math.floor(Math.random() * dbsymbols.length) 
        grid[x].push(dbsymbols[index])
        dbsymbols.splice(index, 1)
      }
    }
    return grid
  }



  function revealSymbol(event: BaseSyntheticEvent) {
    const pairLength = pair.current?.length || 0;

    if (pairLength === 0) {
      revealedTiles.current = [event.target]
    }
    if (pairLength === 1) {
      revealedTiles.current = revealedTiles.current?.concat(event.target)
      compareSymbols(revealedTiles.current)
    }
    
    if (pairLength  === 2) {
    
      revealedTiles.current?.forEach(tile => {
          tile.classList.remove('reveal')
        }
      )
      pair.current = []
      revealedTiles.current = [event.target]
    }


    event.target.classList.add('reveal')

    const revealedSymbol: string = event.target.childNodes[0]
    pair.current = pair.current?.concat(`${revealedSymbol}`) || [`${revealedSymbol}`];
  }


  function compareSymbols(revealedTiles: HTMLDivElement[]) {
    const a = revealedTiles[0].childNodes[0]
    const b = revealedTiles[1].childNodes[0]

    console.log(a,b)

    if(revealedTiles[0] === revealedTiles[1]) {
      revealedTiles.forEach((tile) => tile.classList.remove('reveal'))
      console.log('to samo')
      return
    }
    if (a == b) {
      revealedTiles.forEach((tile) => tile.classList.add('correct'))
      console.log('green')
      progress.current++
      console.log('wyslany progress',progress)
      progress.current <= tiles.length? progressCount(progress.current): null
    } else {
      revealedTiles.forEach((tile) => tile.classList.add('reveal'))
    }
  }

  function progressCount(gameProgress: number) {
    const maxProgress: number = tiles.length

    if (gameProgress === maxProgress) {
      setIsGameActive(false)
    }
  }


  
  const newGame = async () => {
    try {
      const imgTiles: string[] = []
      for (let i = 0; i < 8; i++) {
        const iconIndex: number = Math.floor(Math.random() * iconsArray.length)
        const hexIndex: number = Math.floor(Math.random() * hexArray.length)
        console.log(hexArray[hexIndex])
        const response = await axios.get(`https://api.dicebear.com/7.x/icons/svg?backgroundColor=${hexArray[hexIndex]}&icon=${iconsArray[iconIndex]}`)
        const imgPath = response.data
        imgTiles.push(imgPath)
      }
      setTiles(imgTiles)
      setIsGameActive(true)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      {isGameActive? (
        <div className='grid-container'>{createGrid(4).map(tiles => {
          return(
            <div className={'vertical-container'}>{
              tiles.map(tile => {
                console.log(tile)
                return (
                
                <div 
                  className='symbol-holder'
                  onClick={revealSymbol}
                  key={crypto.randomUUID()}
                  dangerouslySetInnerHTML={{ __html: tile }}
                >
                </div>
              )})
            }</div>
          )
        })}
        </div>
      )
      : <button onClick={newGame}>New Game</button>
      }
    </>
  )
}

export default App

