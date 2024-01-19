import { createAsyncThunk } from "@reduxjs/toolkit"
import { hexColor, iconsArray } from "../ENUMS"
import axios from "axios"


export const fetchNewIcons = createAsyncThunk(
  'memo/fetchNewIcons',
  async (size: number, thunkAPI) => {
    try {
      const icons: {image: string, id: number}[] = []

      for (let i = 0; i < size * size / 2; i++) {
        const iconIndex: number = Math.floor(Math.random() * iconsArray.length)
        const color = hexColor()
        const response = await axios.get(`https://api.dicebear.com/7.x/icons/svg?backgroundColor=${color}&icon=${iconsArray[iconIndex]}`)
        const imgPath = response.data
        icons.push({ image: imgPath, id: i})
      }
      return [...icons, ...icons]
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)