import {configureStore} from "@reduxjs/toolkit";
import authReducer from './auth-slice';

export const globalStore = configureStore({
    reducer: {
        auth: authReducer
    },
})

export type RootState = ReturnType<typeof globalStore.getState>
export type AppDispatch = typeof globalStore.dispatch