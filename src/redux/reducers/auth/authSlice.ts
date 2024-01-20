import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { loginUserAPI } from '~/src/pages/api/login';

export interface ProfileState {
    loading: boolean;
    userInfo: Object;
    userToken: string | null;
    error: string | null;
    success: boolean;
}

const initialState: ProfileState = {
    loading: false,
    userInfo: {},
    userToken: null,
    error: null,
    success: false,
};

interface LoginCredentialsInterface {
    token: string;
}

export const loginUser = createAsyncThunk(
    'auth/login',
    async (
        responseData: LoginCredentialsInterface,
        { dispatch, rejectWithValue }
    ) => {
        try {
            dispatch(userLoading());
            dispatch(userLoaded(responseData));
            return responseData;
        } catch (error) {
            if (typeof error === 'string') {
                dispatch(userLoadFailed(error));
                return rejectWithValue(error);
            }
            if (error instanceof Error) {
                dispatch(userLoadFailed(error.message));
                return rejectWithValue(error.message);
            }
        }
    }
);

const authSlice = createSlice({
    name: 'authentication',
    initialState: initialState,
    reducers: {
        userLoading: (state) => {
            state.loading = true;
        },
        userLoaded: (state, action) => {
            state.loading = false;
            state.userInfo = action.payload.user;
            state.userToken = action.payload.token;
        },
        userLoadFailed: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        userLogout: (state) => {
            state.loading = false;
            state.userInfo = {};
            state.userToken = null;
            state.error = null;
            state.success = false;
        },
        setAuthToken: (state, action) => {
            state.userToken = action.payload;
        },
    },
    extraReducers: {},
});

export const { userLoading, userLoaded, userLoadFailed, userLogout, setAuthToken } =
    authSlice.actions;
export default authSlice.reducer;
