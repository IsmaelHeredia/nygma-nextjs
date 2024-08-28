import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export const authClient = (getState: any) => {
    const token = getState().auth.token ? getState().auth.token : "";
    return axios.create({
        baseURL: String(process.env.NEXT_PUBLIC_API_URL),
        responseType: "json",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    })
};

export const loginUserAction = createAsyncThunk(
    "loginUser",
    async (data: any, thunkApi) => {
        const response = await authClient(
            thunkApi.getState
        ).post("/auth/login", { "username": data.username, "password": data.password });
        return response.data;
    }
);

interface initialState {
    token: string;
    username: string;
    isLoading: boolean;
    contents: any;
    error: any;
}

const initialState: initialState = {
    token: "",
    username: "",
    isLoading: false,
    contents: null,
    error: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        clearDataAuth: (state) => {
            state.token = "";
            state.username = "";
            state.isLoading = false;
            state.contents = null;
            state.error = null;
        },
        setAuth: (state, action: PayloadAction<any>) => {
            state.token = action.payload.token;
            state.username = action.payload.username;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(loginUserAction.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(loginUserAction.fulfilled, (state, action) => {
            state.isLoading = false;
            state.contents = action.payload;
        })
        builder.addCase(loginUserAction.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        })
    },
});

export const { clearDataAuth, setAuth } = authSlice.actions;

export default authSlice.reducer;