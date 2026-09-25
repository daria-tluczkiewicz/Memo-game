import { GAME_STATUS } from '@/constants';
import { canBeFlipped, isGameFinished, isMatch } from '@/features/game-management/gameLogic';
import { addFlippedTile, changeGameStatus, changeGridSize, gridSizeType, resetAndAddNewTile, resetFlippedTiles, resetMatchingTiles, resetMoves, setIcons } from '@/features/game-management/memoSlice';
import { generateIcons } from '@/utils/generateIcons';
import { useAppDispatch, useAppSelector } from '@app/store';
import { addMatchingTile, incrementMovesCount, TileType } from "@features/game-management/memoSlice";
import { useCallback } from 'react';

export const useMemoGame = () => {
    const dispatch = useAppDispatch();
    const flippedTiles = useAppSelector(state => state.memo.flippedTiles)
    const flippedTilesIds = flippedTiles.map(tile => tile.id)
    const matchedTiles = useAppSelector(state => state.memo.matchedTiles)
    const gridSize = useAppSelector(state => state.memo.gridSize)
    const maxMatches = gridSize * gridSize / 2

    const startGame = useCallback((gridSize: gridSizeType) => {
        const icons = generateIcons(gridSize);

        dispatch(changeGameStatus(GAME_STATUS.IN_PROGRESS))
        dispatch(changeGridSize(gridSize))
        dispatch(setIcons(icons))
        dispatch(resetMoves())
    }, [dispatch]);

    const endGame = useCallback(() => {
        dispatch(changeGameStatus(GAME_STATUS.COMPLETED))
        dispatch(resetFlippedTiles())
        dispatch(resetMatchingTiles())

    }, [dispatch]);

    const restartGame = useCallback(() => {
        dispatch(changeGameStatus(GAME_STATUS.NOT_STARTED))
        dispatch(resetFlippedTiles())
        dispatch(resetMatchingTiles())
        dispatch(resetMoves())
    }, [dispatch]);

    const handleTileClick = useCallback((tile: TileType) => {
        if (!canBeFlipped(flippedTilesIds, matchedTiles, tile)) {
            return
        }

        if (flippedTiles.length === 1 && isMatch(flippedTiles[0], tile)) {
            const newMatchedTiles = [
                ...matchedTiles,
                tile.iconId,
            ];

            dispatch(addMatchingTile(tile.iconId));
            dispatch(resetFlippedTiles());
            dispatch(incrementMovesCount());


            if (isGameFinished(newMatchedTiles, maxMatches)) {
                setTimeout(() => {
                    endGame();
                }, 1000);
            }
            return
        }

        if (flippedTiles.length === 2) {
            dispatch(resetAndAddNewTile(tile));
            return
        }

        if (flippedTiles.length === 1) {
            dispatch(incrementMovesCount());
        }

        dispatch(addFlippedTile(tile));


    }, [
        flippedTiles,
        flippedTilesIds,
        matchedTiles,
        maxMatches,
        dispatch,
        endGame,
    ]);

    return { startGame, endGame, restartGame, handleTileClick };
};