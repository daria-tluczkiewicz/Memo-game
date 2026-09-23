
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type iconType = {
  id: string
  imageSource: ImageSource,
}
export type ImageSource = string

export type gridSizeType = 2 | 4 | 6 | 8


interface MemoState {
  icons: iconType[],
  movesCount: number,
  flippedTiles: string[],
  correctTiles: string[],
  gridSize: gridSizeType,
  isGameLoading: boolean,
  isGameOver: boolean
}

const initialState: MemoState = {
  icons: [],
  movesCount: 0,
  flippedTiles: [],
  correctTiles: [],
  gridSize: 4,
  isGameLoading: false,
  isGameOver: false
};


const memoSlice = createSlice({
  name: 'memo',
  initialState,
  reducers: {
    incrementMovesCount: state => {
      state.movesCount += 1
    },
    resetMoves: state => {
      state.movesCount = 0
    },
    addFlippedTile: (state, action: PayloadAction<string>) => {

      state.flippedTiles.push(action.payload)
    },
    clearAndAddNewTile: (state, action: PayloadAction<string>) => {
      state.flippedTiles = [action.payload]
    },
    resetFlippedTiles: state => {
      state.flippedTiles = []
    },
    removeFromFlippedTiles: (state, action: PayloadAction<string>) => {
      const updatedTiles = state.flippedTiles.filter(tileId => tileId != action.payload)
      state.flippedTiles = updatedTiles
    },
    addCorrectTile: (state, action: PayloadAction<string>) => {
      state.correctTiles.push(action.payload)
    },
    resetCorrectTiles: state => {
      state.correctTiles = []
    },
    changeGridSize: (state, action: PayloadAction<gridSizeType>) => {
      state.gridSize = action.payload
    },
    changeGameLoadingstatus: (state, action: PayloadAction<boolean>) => {
      state.isGameLoading = action.payload
    },
    endGame: state => {
      state.isGameOver = true
    },
    startGame: state => {
      state.isGameOver = false
    },
    setIcons: (state, action: PayloadAction<iconType[]>) => {
      state.icons = action.payload
    },
    resetIcons: state => {
      state.icons = []
    }
  }
},
);



export const {
  incrementMovesCount,
  resetMoves,
  addFlippedTile,
  clearAndAddNewTile,
  resetFlippedTiles,
  removeFromFlippedTiles,
  addCorrectTile,
  resetCorrectTiles,
  changeGridSize,
  changeGameLoadingstatus,
  endGame,
  startGame,
  setIcons,
  resetIcons
} = memoSlice.actions
export default memoSlice.reducer;
