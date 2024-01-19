
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { fetchNewIcons } from './asyncThunk';

interface MemoState {
  icons: { image: string, id: number }[],
  movesCount: number,
  flippedTiles: { id: number; key: string }[],
  correctTiles: number[],
  gridSize: number,
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
    },
    endGame: state => {
      state.isGameOver = true
    },
    startGame: state => {
      state.isGameOver = false
    },
    resetIcons: state => {
      state.icons = []
    }
    },
    extraReducers: (builder) => {
      builder.addCase(fetchNewIcons.fulfilled, (state, action) => {
        state.icons = action.payload
        state.isGameLoading = initialState.isGameLoading
        state.movesCount = initialState.movesCount
        state.flippedTiles = initialState.flippedTiles
        state.correctTiles = initialState.correctTiles
      }),
      builder.addCase(fetchNewIcons.rejected, action => {
        console.error(action);
      });
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
  resetIcons
} = memoSlice.actions
export default memoSlice.reducer;
