
import { createSlice } from '@reduxjs/toolkit';

const memoSlice = createSlice({
  name: 'memo',
  initialState: {
    movesCount: 0  
  },
  reducers: {
    incrementMovesCount: state => {
      state.movesCount += 1;
    }
  },
});

export const { incrementMovesCount } = memoSlice.actions
export default memoSlice.reducer;
