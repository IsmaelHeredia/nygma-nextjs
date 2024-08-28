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

export const authClientFormData = (getState: any) => {
    const token = getState().auth.token ? getState().auth.token : "";
    return axios.create({
        baseURL: String(process.env.NEXT_PUBLIC_API_URL),
        responseType: "json",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
        },
    })
};

export const getDocumentsAction = createAsyncThunk(
    "getDocuments",
    async (data: any, thunkApi) => {
        const response = await authClient(
            thunkApi.getState
        ).post("/documents/filter", { "page": data.page, "name": data.name });
        return response.data;
    }
);

export const getDocumentAction = createAsyncThunk(
    "getDocument",
    async (data: any, thunkApi) => {
        const response = await authClient(
            thunkApi.getState
        ).get("/documents/" + data.id);
        return response.data;
    }
);

export const createDocumentAction = createAsyncThunk(
    "createDocument",
    async (data: any, thunkApi) => {
        const response = await authClient(
            thunkApi.getState
        ).post("/documents", { "name": data.name, "content": data.content, "key": data.key });
        return response.data;
    }
);

export const updateDocumentAction = createAsyncThunk(
    "editDocument",
    async (data: any, thunkApi) => {
        const response = await authClient(
            thunkApi.getState
        ).put("/documents/" + data.id, { "name": data.name, "content": data.content, "key": data.key });
        return response.data;
    }
);

export const deleteDocumentAction = createAsyncThunk(
    "deleteDocument",
    async (data: any, thunkApi) => {
        const response = await authClient(
            thunkApi.getState
        ).delete("/documents/" + data.id);
        return response.data;
    }
);

export const importDocumentAction = createAsyncThunk(
    "importDocument",
    async (data: any, thunkApi) => {

        const formData = new FormData();

        formData.append("htmlFile", data.htmlFile);
        formData.append("password", data.password);

        const response = await authClientFormData(
            thunkApi.getState
        ).post("/documents/import", formData);
        return response.data;
    }
);

export const generateDocumentAction = createAsyncThunk(
    "generateDocument",
    async (data: any, thunkApi) => {
        const response = await authClient(
            thunkApi.getState
        ).post("/documents/generate", { "name": data.name, "content": data.content, "key": data.key });
        return response.data;
    }
);


interface initialState {
    documents: any;
    isLoadingDocuments: boolean;
    isLoadingDocument: boolean;
    isLoadingCreateDocument: boolean;
    isLoadingUpdateDocument: boolean;
    isLoadingDeleteDocument: boolean;
    isLoadingImportDocument: boolean;
    isLoadingGenerateDocument: boolean;
    name: string;
    content: string;
    key: string;
    error: any;
}

const initialState: initialState = {
    documents: [],
    isLoadingDocuments: false,
    isLoadingDocument: false,
    isLoadingCreateDocument: false,
    isLoadingUpdateDocument: false,
    isLoadingDeleteDocument: false,
    isLoadingImportDocument: false,
    isLoadingGenerateDocument: false,
    name: "",
    content: "",
    key: "",
    error: null,
};

const documentsSlice = createSlice({
    name: "documents",
    initialState,
    reducers: {
        clearDataDocuments: (state) => {
            state.documents = [],
                state.isLoadingDocuments = false,
                state.isLoadingDocument = false,
                state.isLoadingCreateDocument = false,
                state.isLoadingUpdateDocument = false,
                state.isLoadingDeleteDocument = false,
                state.isLoadingImportDocument = false,
                state.isLoadingGenerateDocument = false,
                state.name = "";
            state.content = "";
            state.key = "";
            state.error = null;
        },
        setDocumentData: (state, action: PayloadAction<any>) => {
            state.name = action.payload.name;
            state.content = action.payload.content;
            state.key = action.payload.key;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getDocumentsAction.pending, (state) => {
            state.isLoadingDocuments = true;
        })
        builder.addCase(getDocumentsAction.fulfilled, (state, action) => {
            state.documents = action.payload.documents;
            state.isLoadingDocuments = false;
        })
        builder.addCase(getDocumentsAction.rejected, (state, action) => {
            state.isLoadingDocuments = false;
            state.error = action.error.message;
        })
        builder.addCase(getDocumentAction.pending, (state) => {
            state.isLoadingDocument = true;
        })
        builder.addCase(getDocumentAction.fulfilled, (state) => {
            state.isLoadingDocument = false;
        })
        builder.addCase(getDocumentAction.rejected, (state, action) => {
            state.isLoadingDocument = false;
            state.error = action.error.message;
        })
        builder.addCase(createDocumentAction.pending, (state) => {
            state.isLoadingCreateDocument = true;
        })
        builder.addCase(createDocumentAction.fulfilled, (state, action) => {
            state.documents.push(action.payload.document);
            state.isLoadingCreateDocument = false;
        })
        builder.addCase(createDocumentAction.rejected, (state, action) => {
            state.isLoadingCreateDocument = false;
            state.error = action.error.message;
        })
        builder.addCase(updateDocumentAction.pending, (state) => {
            state.isLoadingUpdateDocument = true;
        })
        builder.addCase(updateDocumentAction.fulfilled, (state, action) => {
            state.documents = state.documents.map((element: any) =>
                element.id === action.payload.document.id ? action.payload.document : element
            );
            state.isLoadingUpdateDocument = false;
        })
        builder.addCase(updateDocumentAction.rejected, (state, action) => {
            state.isLoadingUpdateDocument = false;
            state.error = action.error.message;
        })
        builder.addCase(deleteDocumentAction.pending, (state) => {
            state.isLoadingDeleteDocument = true;
        })
        builder.addCase(deleteDocumentAction.fulfilled, (state, action) => {
            state.documents = state.documents.filter((element: any) => element.id !== action.payload.id);
            state.isLoadingDeleteDocument = false;
        })
        builder.addCase(deleteDocumentAction.rejected, (state, action) => {
            state.isLoadingDeleteDocument = false;
            state.error = action.error.message;
        })
        builder.addCase(generateDocumentAction.pending, (state) => {
            state.isLoadingGenerateDocument = true;
        })
        builder.addCase(generateDocumentAction.fulfilled, (state, action) => {
            state.isLoadingGenerateDocument = false;
        })
        builder.addCase(generateDocumentAction.rejected, (state, action) => {
            state.isLoadingGenerateDocument = false;
            state.error = action.error.message;
        })
        builder.addCase(importDocumentAction.pending, (state) => {
            state.isLoadingImportDocument = true;
        })
        builder.addCase(importDocumentAction.fulfilled, (state, action) => {
            state.isLoadingImportDocument = false;
        })
        builder.addCase(importDocumentAction.rejected, (state, action) => {
            state.isLoadingImportDocument = false;
            state.error = action.error.message;
        })
    },
});

export const { clearDataDocuments, setDocumentData } = documentsSlice.actions;

export default documentsSlice.reducer;