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

export const updateAccountAction = createAsyncThunk(
    "updateAccount",
    async (data: any, thunkApi) => {
        const response = await authClient(
            thunkApi.getState
        ).post("/account", {
            "username": data.username,
            "new_username": data.new_username,
            "password": data.password,
            "new_password": data.new_password
        });
        return response.data;
    }
);

export const userProfileAction = createAsyncThunk(
    "userProfile",
    async (data: any, thunkApi) => {
        const response = await authClient(
            thunkApi.getState
        ).get("/auth/profile");
        return response.data;
    }
);

export const logOutAction = createAsyncThunk(
    "logout",
    async (data: any, thunkApi) => {
        const response = await authClient(
            thunkApi.getState
        ).get("/auth/logout");
        return response.data;
    }
);

interface initialState {
    isLoadingProfile: boolean;
    isLoadingUpdateAccount: boolean;
    contents: any;
    error: any;
}

const initialState: initialState = {
    isLoadingProfile: false,
    isLoadingUpdateAccount: false,
    contents: null,
    error: null,
};

const accountSlice = createSlice({
    name: "account",
    initialState,
    reducers: {
        clearDataAccount: (state) => {
            state.isLoadingProfile = false;
            state.isLoadingUpdateAccount = false;
            state.contents = null;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(userProfileAction.pending, (state) => {
            state.isLoadingProfile = true;
        })
        builder.addCase(userProfileAction.fulfilled, (state, action) => {
            state.isLoadingProfile = false;
            state.contents = action.payload;
        })
        builder.addCase(userProfileAction.rejected, (state, action) => {
            state.isLoadingProfile = false;
            state.error = action.error.message;
        })
        builder.addCase(updateAccountAction.pending, (state) => {
            state.isLoadingUpdateAccount = true;
        })
        builder.addCase(updateAccountAction.fulfilled, (state, action) => {
            state.isLoadingUpdateAccount = false;
        })
        builder.addCase(updateAccountAction.rejected, (state, action) => {
            state.isLoadingUpdateAccount = false;
            state.error = action.error.message;
        })
    },
});

export const { clearDataAccount } = accountSlice.actions;

export default accountSlice.reducer;