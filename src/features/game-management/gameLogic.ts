import { iconId, tileId, TileType } from "./memoSlice";


const isMatch = (firstTile: TileType, secondTile: TileType): boolean => {
    return firstTile.iconId === secondTile.iconId;
}

const canBeFlipped = (flippedTilesIds: tileId[], matchedTiles: iconId[], tileToFlip: TileType): boolean => {

    if (flippedTilesIds.some(tileId => tileId === tileToFlip.id)) {
        return false;
    }

    if (matchedTiles.some(iconId => iconId === tileToFlip.iconId)) {
        return false;
    }

    return true;
}

const isGameFinished = (
    matchedTiles: string[],
    maxMatches: number
) => matchedTiles.length === maxMatches;

export { canBeFlipped, isGameFinished, isMatch };

