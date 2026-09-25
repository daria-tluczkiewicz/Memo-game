import { isMatch } from "@/features/game-management/gameLogic";
import { TileType } from "@/features/game-management/memoSlice";
import { expect, test } from "vitest";

test("isMatch returns true for matching cards", () => {
    const tile1: TileType = { id: '1', iconId: 'A', imageSource: 'image1.png' };
    const tile2: TileType = { id: '2', iconId: 'A', imageSource: 'image1.png' };
    expect(isMatch(tile1, tile2)).toBe(true);
});

test("isMatch returns false for non-matching cards", () => {
    const tile1: TileType = { id: '1', iconId: 'A', imageSource: 'image1.png' };
    const tile2: TileType = { id: '2', iconId: 'B', imageSource: 'image2.png' };
    expect(isMatch(tile1, tile2)).toBe(false);
});