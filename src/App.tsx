// import { useState } from 'react'
import { useState } from 'react';
import './App.scss'
import axios from 'axios';
import { iconsArray } from './ENUMS';
import { hexColor } from './ENUMS';
import Grid from './Grid';

function App() {
  const [icons, setIcons] = useState<{image: string, id: number}[]>([])
  const [isGameActive, setIsGameActive] = useState<boolean>(false)
  
  //
  // const revealedicons = useRef<HTMLDivElement[]>([]);
  // const progress = useRef<number>(0);
  // const [isFlipped, setIsFlipped] = useState<boolean>(false)

  // useEffect(()=>{},[icons])
  
  // function createGrid(gridSize: number) {
  //   const grid: Array<Array<string>> = [];
  //   const fullicons = icons.concat(icons)
  
  //   for (let x = 0; x < gridSize; x++){
  //     grid[x] = []

  //     for (let y = 0; y < gridSize; y++){
  //       const index: number = Math.floor(Math.random() * fullicons.length) 
  //       grid[x].push(fullicons[index])
  //       fullicons.splice(index, 1)
  //     }
  //   }
  //   return grid
  // }



  // function revealSymbol(event: BaseSyntheticEvent) {
  //   const pairLength = pair.current?.length || 0;

  //   if (pairLength === 0) {
  //     revealedicons.current = [event.target]
  //   }
  //   if (pairLength === 1) {
  //     revealedicons.current = revealedicons.current?.concat(event.target)
  //     compareSymbols(revealedicons.current)
  //   }
    
  //   if (pairLength  === 2) {
    
  //     revealedicons.current?.forEach(tile => {
  //         tile.classList.remove('reveal')
  //       }
  //     )
  //     pair.current = []
  //     revealedicons.current = [event.target]
  //   }

  //   console.log(event.target)
  //   event.target.classList.add('reveal')

  //   const revealedSymbol: string = event.target.childNodes[0]
  //   pair.current = pair.current?.concat(`${revealedSymbol}`) || [`${revealedSymbol}`];
  // }


  // function compareSymbols(revealedicons: HTMLDivElement[]) {
  //   const a = revealedicons[0].id
  //   const b = revealedicons[1].id

  //   console.log(a,b)

  //   if(revealedicons[0] === revealedicons[1]) {
  //     revealedicons.forEach((tile) => tile.classList.remove('reveal'))
  //     console.log('to samo')
  //     return
  //   }
  //   if (a == b) {
  //     revealedicons.forEach((tile) => tile.classList.add('correct'))
  //     console.log('green')
  //     progress.current++
  //     progress.current <= icons.length? progressCount(progress.current): null
  //   } else {
  //     revealedicons.forEach((tile) => tile.classList.add('reveal'))
  //   }
  // }

  // function progressCount(gameProgress: number) {
  //   const maxProgress: number = icons.length

  //   if (gameProgress === maxProgress) {
  //     setIsGameActive(false)
  //   }
  // }



  const newGame = async () => {
    try {
      const icons: {image: string, id: number}[] = []

      // TODO: gridSize state
      for (let i = 0; i < 8; i++) {
        const iconIndex: number = Math.floor(Math.random() * iconsArray.length)
        const color = hexColor()
        console.log(color)
        const response = await axios.get(`https://api.dicebear.com/7.x/icons/svg?backgroundColor=${color}&icon=${iconsArray[iconIndex]}`)
        const imgPath = response.data
        icons.push({ image: imgPath, id: i})
        console.log(icons[i].id)
      }
      setIcons(icons)
      setIsGameActive(true)
    } catch (error) {
      console.error(error)
    }
  }



  return (
    <>
      {isGameActive? (
        <Grid icons={icons}/>
      )
      : <button onClick={newGame}>New Game</button>
      }
    </>
  )
}

export default App

