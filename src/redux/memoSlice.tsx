
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface MemoState {
  movesCount: number,
  flippedTiles: { id: number; key: string }[],
  correctTiles: number[],
  gridSize: number,
  isGameLoading: boolean
}

const initialState: MemoState = {
  movesCount: 0,
  flippedTiles: [],
  correctTiles: [],
  gridSize: 4,
  isGameLoading: false
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
    addFlippedTile: (state, action: PayloadAction<{ id: number; key: string }>) => {
      
      state.flippedTiles.push({ 
        id: action.payload.id, 
        key: action.payload.key
      })
    },
    clearAndAddNewTile: (state, action: PayloadAction<{ id: number; key: string }>) => {
      state.flippedTiles = [{
        id: action.payload.id, 
        key: action.payload.key
      }]
    },
    resetFlippedTiles: state => {
      state.flippedTiles = []
    },
    removeFromFlippedTiles: (state, action: PayloadAction<string>) => {
      const updatedTiles = state.flippedTiles.filter(tile => tile.key != action.payload)
      state.flippedTiles = updatedTiles
    },
    addCorrectTile: (state, action: PayloadAction<number>) => {
      state.correctTiles.push(action.payload)
    },
    resetCorrectTiles: state => {
      state.correctTiles = []
    },
    changeGridSize: (state, action: PayloadAction<number>) => {
      state.gridSize = action.payload
    },
    changeGameLoadingstatus: (state, action: PayloadAction<boolean>) => {
      state.isGameLoading = action.payload
    }
    },
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
  changeGameLoadingstatus
} = memoSlice.actions
export default memoSlice.reducer;
