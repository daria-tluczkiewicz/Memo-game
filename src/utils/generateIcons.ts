import { COLORS } from "@/constants";
import { iconType } from "@/features/game-management/memoSlice";
import { Avatar } from '@dicebear/core';
import icons from '@dicebear/styles/icons.json';
import { v4 as uuidv4 } from 'uuid';

export const generateIcons = (gridSize: number): iconType[] => {
    const requiredIcons = gridSize * gridSize / 2
    return COLORS.slice(0, requiredIcons).map((color) => {
        const avatar = new Avatar(icons, {
            seed: color,
            backgroundColor: color,
            size: 128,
        });

        return {
            id: uuidv4(),
            imageSource: avatar.toDataUri(),
        };
    });
};