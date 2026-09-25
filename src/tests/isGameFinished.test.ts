import { isGameFinished } from "@/features/game-management/gameLogic";
import { expect, test } from "vitest";

test('isGameFinished returns true when all tiles are matched', () => {
    const matchedTiles = ['A', 'B', 'C'];
    const maxMatches = 3;
    const result = isGameFinished(matchedTiles, maxMatches);
    expect(result).toBe(true);
});

test('isGameFinished returns false when not all tiles are matched', () => {
    const matchedTiles = ['A', 'B'];
    const maxMatches = 3;
    const result = isGameFinished(matchedTiles, maxMatches);
    expect(result).toBe(false);
});