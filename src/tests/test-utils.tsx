import { configureStore } from '@reduxjs/toolkit';
import type { ReactNode } from 'react';
import { Provider } from 'react-redux';

import memoReducer, { MemoState } from '@/features/game-management/memoSlice';

export const createMockStore = (preloadedState?: Partial<MemoState>) => {
    return configureStore({
        reducer: {
            memo: memoReducer,
        },
        preloadedState: preloadedState
            ? {
                memo: {
                    ...memoReducer(undefined, { type: 'init' }),
                    ...preloadedState,
                },
            }
            : undefined,
    });
}

export const createWrapper = (
    store: ReturnType<typeof createMockStore>,
) => {
    return function Wrapper({ children }: { children: ReactNode }) {
        return <Provider store={store}>{children}</Provider>;
    };
};