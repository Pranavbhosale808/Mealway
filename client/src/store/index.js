import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import sidebarReducer from "./reducers/sidebarSlice";
import authReducer from "./reducers/authSlice";
import vendorReducer from "./reducers/vendorSlice";
import menuReducer from "./reducers/menuSlice";

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["authSlice", "vendorSlice"], // List of reducers to persist (optional)
    // blacklist: ["sidebarSlice"],
};

const rootReducer = combineReducers({
    sidebarSlice: sidebarReducer,
    authSlice: authReducer,
    vendorSlice: vendorReducer,
    menuSlice: menuReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

const persistor = persistStore(store);
export { store, persistor };
