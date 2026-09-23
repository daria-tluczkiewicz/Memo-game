import { iconType } from "@/redux/memoSlice";
import { v4 } from "uuid";

export type TileType = {
    id: string,
    iconId: string
    imageSource: string,
}
export type GridType = TileType[];

const shuffle = <T>(array: T[]): T[] => {
    const shuffled = [...array];

    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));

        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    return shuffled;
};

export const generateGrid = ({
    icons,
}: {
    icons: iconType[];
}): GridType | null => {
    if (icons.length < 1) {
        return null
    }

    const shuffledFullIconsList = shuffle([...icons, ...icons])
    return shuffledFullIconsList.map((icon) => ({
        id: v4(),
        iconId: icon.id,
        imageSource: icon.imageSource,
    }))

    // for (let x = 0; x < gridSize; x++) {
    //     const row: TileType[] = []

    //     for (let y = 0; y < gridSize; y++) {

    //         const index: number = randomNumberFromRange(0, fullIconsList.length - 1)
    //         const pickedIcon = fullIconsList[index]

    //         const tile: TileType = {

    //         }
    //         row.push(tile)

    //         fullIconsList.splice(index, 1)
    //     }

    //     grid.push(row)
    // }
    // return grid
}

// function randomNumberFromRange(min: number, max: number) {
//     min = Math.ceil(min);
//     max = Math.floor(max);
//     return Math.floor(Math.random() * (max - min + 1)) + min;
// }