import { configureStore, combineReducers } from "@reduxjs/toolkit";
import chatReducer from "./chatSlice";
import videoReducer from "./videoSlice";
import userReducer from "./userSlice";
import logger from "redux-logger";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

// Custom middleware to handle errors globally
const errorMiddleware = (store) => (next) => (action) => {
  try {
    return next(action);
  } catch (err) {
    console.error("Redux Error:", err);
  }
};

// Define persist config
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user", "chat"], // Persist user & chat state, but not video
};

// Combine reducers
const rootReducer = combineReducers({
  chat: chatReducer,
  video: videoReducer,
  user: userReducer,
});

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Required for redux-persist
    }).concat(thunk, errorMiddleware, ...(process.env.NODE_ENV !== "production" ? [logger] : [])), // Add logger only in development
  devTools: process.env.NODE_ENV !== "production",
});

// Persistor for persisting state
export const persistor = persistStore(store);

export default store;
