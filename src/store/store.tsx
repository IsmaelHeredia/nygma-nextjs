import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import themesSliceReducer from "@/store/reducers/themesSlice";
import authSliceReducer from "@/store/reducers/authSlice";
import accountSliceReducer from "@/store/reducers/accountSlice";
import documentSliceReducer from "@/store/reducers/documentsSlice";
import filtersSliceReducer from "@/store/reducers/filtersSlice";

import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist";

import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: "root",
    version: 1,
    storage,
}

const rootReducer = combineReducers({
    themes: themesSliceReducer,
    auth: authSliceReducer,
    account: accountSliceReducer,
    documents: documentSliceReducer,
    filters: filtersSliceReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            }
        })
});

setupListeners(store.dispatch);

const persistor = persistStore(store)

export { store, persistor };