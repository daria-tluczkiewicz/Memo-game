import { changeGridSize, gridSizeType, setIcons } from '@/redux/memoSlice';
import { generateIcons } from '@/utils/generateIcons';
import { useAppDispatch } from '@app/store';
import { useCallback } from 'react';
export const useMemoGame = () => {
    const dispatch = useAppDispatch();

    const startGame = useCallback((gridSize: gridSizeType) => {
        const icons = generateIcons(gridSize);

        dispatch(changeGridSize(gridSize))
        dispatch(setIcons(icons))
    }, [dispatch]);

    const endGame = useCallback(() => { }, [dispatch]);

    return { startGame, endGame };
};