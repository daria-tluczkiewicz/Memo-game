import { canBeFlipped } from "@/features/game-management/gameLogic";
import { expect, test } from "vitest";

const flippedTilesIds = ['1', '2'];
const matchedTiles = ['A', 'B'];

test("canBeFlipped returns true for unflipped and unmatched cards", () => {
    const tileToFlip = { id: '3', iconId: 'C', imageSource: 'image3.png' };
    expect(canBeFlipped(flippedTilesIds, matchedTiles, tileToFlip)).toBe(true);
})

test("canBeFlipped returns false for already flipped cards", () => {
    const tileToFlip = { id: '1', iconId: 'C', imageSource: 'image1.png' };
    expect(canBeFlipped(flippedTilesIds, matchedTiles, tileToFlip)).toBe(false);
})

test("canBeFlipped returns false for unflipped and already matched cards", () => {
    const tileToFlip = { id: '3', iconId: 'A', imageSource: 'image3.png' };
    expect(canBeFlipped(flippedTilesIds, matchedTiles, tileToFlip)).toBe(false);
})

test("canBeFlipped returns true for unflipped and unmatched cards", () => {
    const tileToFlip = { id: '3', iconId: 'C', imageSource: 'image3.png' };
    expect(canBeFlipped(flippedTilesIds, matchedTiles, tileToFlip)).toBe(true);
})