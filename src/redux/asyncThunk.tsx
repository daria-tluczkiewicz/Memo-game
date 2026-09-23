import { Avatar } from '@dicebear/core';
import lorelei from '@dicebear/styles/lorelei.json';
import { createAsyncThunk } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from 'uuid';
import { COLORS } from "../ENUMS";

export type iconType = {
  id: string
  imageSource: ImageSource,
}
export type ImageSource = string



export const fetchNewIcons = createAsyncThunk<iconType, { size: number }>(
  'memo/fetchNewIcons',
  async (size: number) => {
    function generateAvatars(colors: string[]) {
      return colors.slice(0, size).map((color, idx) => {
        const avatar = new Avatar(lorelei,
          { seed: color, backgroundColor: [color], size: 128, });
        return {
          id: uuidv4(),
          imageSource: avatar.toDataUri()[idx]
        } as iconType;
      });
    }
    const avatars = generateAvatars(COLORS)
    return avatars
  }
)