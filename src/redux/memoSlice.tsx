
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface MemoState {
  movesCount: number,
  flippedTiles: { id: number; key: string }[],
  correctTiles: number[]
}

const initialState: MemoState = {
  movesCount: 0,
  flippedTiles: [],
  correctTiles: []
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
    addCorrectTile: (state, action: PayloadAction<number>) => {
      state.correctTiles.push(action.payload)
    },
    resetCorrectTiles: state => {
      state.correctTiles = []
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
  addCorrectTile,
  resetCorrectTiles,

} = memoSlice.actions
export default memoSlice.reducer;
