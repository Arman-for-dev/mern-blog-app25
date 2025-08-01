import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReduser from "./slices/userSlice";
import themeReducer from "./theme/themeSlice";
import storage from 'redux-persist/lib/storage' 
import {persistStore, persistReducer} from 'redux-persist';

const rootReducer = combineReducers({
    user: userReduser,
    theme: themeReducer
});
const persistConfig ={
    key: 'root',
    storage,
    version: 1
}

const persistedReducer = persistReducer(
    persistConfig, rootReducer
)

export const store = configureStore({
    reducer:persistedReducer,
    middleware: (getDefaultMiddleware)=> getDefaultMiddleware({
        serializableCheck: false
    })
});

export const persistor = persistStore(store)