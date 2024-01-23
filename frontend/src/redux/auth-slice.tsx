import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type AuthState = {
    token: string | null;
}

const initialState: AuthState = {
    token: null,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        setAuthentication: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
        },
    },
});

export const { setAuthentication } = authSlice.actions

export default authSlice.reducer