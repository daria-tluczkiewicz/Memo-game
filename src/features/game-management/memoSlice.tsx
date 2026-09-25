
import { GAME_STATUS } from '@/constants';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type iconType = {
  id: iconId
  imageSource: ImageSource,
}
export type ImageSource = string

export type tileId = string
export type iconId = string

export type gridSizeType = 2 | 4 | 6 | 8

export type TileType = {
  id: tileId,
  iconId: iconId
  imageSource: string,
}
export type GridType = TileType[];

export type GameStatus = `${GAME_STATUS}`;


export interface MemoState {
  icons: iconType[],
  movesCount: number,
  flippedTiles: TileType[],
  matchedTiles: iconId[],
  gridSize: gridSizeType,
  isGameLoading: boolean,
  gameStatus: GameStatus,
}

const initialState: MemoState = {
  icons: [],
  movesCount: 0,
  flippedTiles: [],
  matchedTiles: [],
  gridSize: 4,
  isGameLoading: false,
  gameStatus: GAME_STATUS.NOT_STARTED
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
    addFlippedTile: (state, action: PayloadAction<TileType>) => {

      state.flippedTiles.push(action.payload)
    },
    resetAndAddNewTile: (state, action: PayloadAction<TileType>) => {
      state.flippedTiles = [action.payload]
    },
    resetFlippedTiles: state => {
      state.flippedTiles = []
    },
    removeFromFlippedTiles: (state, action: PayloadAction<tileId>) => {
      const updatedTiles = state.flippedTiles.filter(tile => tile.id != action.payload)
      state.flippedTiles = updatedTiles
    },
    addMatchingTile: (state, action: PayloadAction<iconId>) => {
      state.matchedTiles.push(action.payload)
    },
    resetMatchingTiles: state => {
      state.matchedTiles = []
    },
    changeGridSize: (state, action: PayloadAction<gridSizeType>) => {
      state.gridSize = action.payload
    },
    changeGameLoadingstatus: (state, action: PayloadAction<boolean>) => {
      state.isGameLoading = action.payload
    },
    changeGameStatus: (state, action: PayloadAction<GameStatus>) => {
      state.gameStatus = action.payload
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
  resetAndAddNewTile,
  resetFlippedTiles,
  removeFromFlippedTiles,
  addMatchingTile,
  resetMatchingTiles,
  changeGridSize,
  changeGameLoadingstatus,
  changeGameStatus,
  setIcons,
  resetIcons
} = memoSlice.actions
export default memoSlice.reducer;
