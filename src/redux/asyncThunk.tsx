import { createAsyncThunk } from "@reduxjs/toolkit"
import { COLORS, iconsArray } from "../ENUMS"
import axios from "axios"


export const fetchNewIcons = createAsyncThunk(
  'memo/fetchNewIcons',
  async (size: number, thunkAPI) => {
    try {
      const icons: {image: string, id: number}[] = []
      const usedIcons: number[] = []

      for (let i = 0; i < size * size / 2; i++) {

        const findNewIndex: () => number = () => {
         const index = Math.floor(Math.random() * iconsArray.length)

         if (usedIcons.includes(index)) {
           return findNewIndex()
         }
        usedIcons.push(index)
        return index
        
        }

        const iconIndex = findNewIndex()
        const iconColor: string = COLORS[Math.floor(Math.random() * COLORS.length)]

        const response = await axios.get(`https://api.dicebear.com/7.x/icons/svg?backgroundColor=${iconColor}&icon=${iconsArray[iconIndex]}`)
        
        const imgPath = response.data
        icons.push({ image: imgPath, id: iconIndex})
      }
      return [...icons, ...icons]
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)