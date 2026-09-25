import { GAME_STATUS } from "@/constants";
import { useMemoGame } from "@/hooks/useGame";
import { createMockStore, createWrapper } from "@/tests/test-utils";
import { act, renderHook } from "@testing-library/react";
import { describe, expect, it, test, vi } from "vitest";

describe("useMemoGame", () => {
    test("should start the game", () => {
        const store = createMockStore();

        const { result } = renderHook(() => useMemoGame(), {
            wrapper: createWrapper(store),
        });

        act(() => {
            result.current.startGame(4);
        });

        expect(store.getState().memo.gridSize).toBe(4);
    });

    describe('handleTileClick', () => {
        it('flips the clicked tile', () => {
            const store = createMockStore();

            const { result } = renderHook(() => useMemoGame(), {
                wrapper: createWrapper(store),
            });

            const tile = {
                id: '1',
                iconId: 'cat',
                imageSource: 'cat.png',
            };

            act(() => {
                result.current.handleTileClick(tile);
            });

            expect(store.getState().memo.flippedTiles).toEqual([tile]);
        });

        it('does not flip a tile that is already flipped', () => {
            const store = createMockStore({
                flippedTiles: [{ id: '1', iconId: 'cat', imageSource: 'cat.png' }],
            });

            const { result } = renderHook(() => useMemoGame(), {
                wrapper: createWrapper(store),
            });

            act(() => {
                result.current.handleTileClick({ id: '1', iconId: 'cat', imageSource: 'cat.png' });
            });

            expect(store.getState().memo.flippedTiles).toEqual([{ id: '1', iconId: 'cat', imageSource: 'cat.png' }]);
        });

        it('does not flip a tile that is already matched', () => {
            const store = createMockStore({
                matchedTiles: ['cat'],
            });

            const { result } = renderHook(() => useMemoGame(), {
                wrapper: createWrapper(store),
            });

            act(() => {
                result.current.handleTileClick({ id: '2', iconId: 'cat', imageSource: 'cat.png' });
            });

            expect(store.getState().memo.flippedTiles).toEqual([]);
        });

        it('updates matched tiles when two tiles match and clears flipped tiles', () => {
            const store = createMockStore({
                flippedTiles: [
                    { id: '1', iconId: 'cat', imageSource: 'cat.png' },
                ],
            });

            const { result } = renderHook(() => useMemoGame(), {
                wrapper: createWrapper(store),
            });

            act(() => {
                result.current.handleTileClick({ id: '2', iconId: 'cat', imageSource: 'cat.png' });
            });

            expect(store.getState().memo.matchedTiles).toEqual(['cat']);
            expect(store.getState().memo.flippedTiles).toEqual([]);
        })

        it('does not update matched tiles when two tiles do not match', () => {
            const store = createMockStore({
                flippedTiles: [
                    { id: '1', iconId: 'cat', imageSource: 'cat.png' },
                ],
            });

            const { result } = renderHook(() => useMemoGame(), {
                wrapper: createWrapper(store),
            });

            act(() => {
                result.current.handleTileClick({ id: '2', iconId: 'dog', imageSource: 'dog.png' });
            });

            expect(store.getState().memo.matchedTiles).toEqual([]);
        });

        it('flips a tile that is not already flipped or matched', () => {
            const store = createMockStore({
                flippedTiles: [],
                matchedTiles: [],
            });

            const { result } = renderHook(() => useMemoGame(), {
                wrapper: createWrapper(store),
            });

            const tileToFlip = { id: '3', iconId: 'bird', imageSource: 'bird.png' };

            act(() => {
                result.current.handleTileClick(tileToFlip);
            });

            expect(store.getState().memo.flippedTiles).toEqual([tileToFlip]);
        });

        it('should end the game when final tile is matched', () => {
            vi.useFakeTimers();
            const store = createMockStore({
                matchedTiles: ['cat'],
                flippedTiles: [{ id: '3', iconId: 'dog', imageSource: 'dog.png' }],
                gridSize: 2,
                gameStatus: GAME_STATUS.IN_PROGRESS,
            });

            const { result } = renderHook(() => useMemoGame(), {
                wrapper: createWrapper(store),
            });

            act(() => {
                result.current.handleTileClick({ id: '4', iconId: 'dog', imageSource: 'dog.png' });
            });

            expect(store.getState().memo.gameStatus).toBe(GAME_STATUS.IN_PROGRESS);

            act(() => {
                vi.advanceTimersByTime(1000);
            });

            expect(store.getState().memo.gameStatus).toBe(GAME_STATUS.COMPLETED);
        });

        it('increments moves when a pair is matched', () => {
            const firstTile = { id: '1', iconId: 'cat', imageSource: 'cat.png' };
            const secondTile = { id: '2', iconId: 'cat', imageSource: 'cat.png' };

            const store = createMockStore({
                flippedTiles: [firstTile],
                matchedTiles: [],
                movesCount: 0,
            });

            const { result } = renderHook(() => useMemoGame(), {
                wrapper: createWrapper(store),
            });

            act(() => {
                result.current.handleTileClick(secondTile);
            });

            expect(store.getState().memo.movesCount).toBe(1);
        });

        it('replaces two flipped tiles with the newly clicked tile', () => {
            const firstTile = { id: '1', iconId: 'cat', imageSource: 'cat.png' };
            const secondTile = { id: '2', iconId: 'dog', imageSource: 'dog.png' };
            const thirdTile = { id: '3', iconId: 'bird', imageSource: 'bird.png' };

            const store = createMockStore({
                flippedTiles: [firstTile, secondTile],
                matchedTiles: [],
            });

            const { result } = renderHook(() => useMemoGame(), {
                wrapper: createWrapper(store),
            });

            act(() => {
                result.current.handleTileClick(thirdTile);
            });

            expect(store.getState().memo.flippedTiles).toEqual([thirdTile]);
        });

        it('does not increment moves on the first tile click', () => {
            const store = createMockStore({
                movesCount: 0,
            });

            const { result } = renderHook(() => useMemoGame(), {
                wrapper: createWrapper(store),
            });

            act(() => {
                result.current.handleTileClick({
                    id: '1',
                    iconId: 'cat',
                    imageSource: 'cat.png',
                });
            });

            expect(store.getState().memo.movesCount).toBe(0);
        });

        it('should increment moves when the last tile is flipped and matched', () => {
            const store = createMockStore({
                flippedTiles: [{ id: '1', iconId: 'dog', imageSource: 'dog.png' }],
                matchedTiles: ['cat'],
                movesCount: 0,
                gridSize: 2,
            });

            const { result } = renderHook(() => useMemoGame(), {
                wrapper: createWrapper(store),
            });

            act(() => {
                result.current.handleTileClick({ id: '2', iconId: 'dog', imageSource: 'dog.png' });
            });

            expect(store.getState().memo.movesCount).toBe(1);
        });
    });

    test('should end the game', () => {
        const store = createMockStore({
            gameStatus: GAME_STATUS.IN_PROGRESS,
            flippedTiles: [
                { id: '1', iconId: 'cat', imageSource: 'cat.png' },
                { id: '2', iconId: 'dog', imageSource: 'dog.png' }
            ],
            matchedTiles: ['cat', 'dog'],
        });

        const { result } = renderHook(() => useMemoGame(), {
            wrapper: createWrapper(store),
        });

        act(() => {
            result.current.endGame();
        });

        expect(store.getState().memo.gameStatus).toBe(GAME_STATUS.COMPLETED);
        expect(store.getState().memo.flippedTiles).toEqual([]);
        expect(store.getState().memo.matchedTiles).toEqual([]);
    })

    test('should restart the game', () => {
        const store = createMockStore({
            gameStatus: GAME_STATUS.COMPLETED,
            flippedTiles: [
                { id: '1', iconId: 'cat', imageSource: 'cat.png' },
                { id: '2', iconId: 'dog', imageSource: 'dog.png' }
            ],
            matchedTiles: ['cat', 'dog'],
        });

        const { result } = renderHook(() => useMemoGame(), {
            wrapper: createWrapper(store),
        });

        act(() => {
            result.current.restartGame();
        });

        expect(store.getState().memo.gameStatus).toBe(GAME_STATUS.NOT_STARTED);
        expect(store.getState().memo.flippedTiles).toEqual([]);
        expect(store.getState().memo.matchedTiles).toEqual([]);
    });
});