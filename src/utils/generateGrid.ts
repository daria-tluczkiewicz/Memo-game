import { GridType, iconType } from "@/features/game-management/memoSlice";
import { v4 } from "uuid";
import { shuffleArray } from "./shuffleArray";

export const generateGrid = ({
    icons,
}: {
    icons: iconType[];
}): GridType => {
    const shuffledFullIconsList = shuffleArray([...icons, ...icons])
    return shuffledFullIconsList.map((icon) => ({
        id: v4(),
        iconId: icon.id,
        imageSource: icon.imageSource,
    }))
};