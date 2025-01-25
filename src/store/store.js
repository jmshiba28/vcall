import { configureStore } from "@reduxjs/toolkit";
import chatReducer from "./chatSlice";
import videoReducer from "./videoSlice";
import userReducer from "./userSlice";
import logger from "redux-logger";
import thunk from "redux-thunk";

const store = configureStore({
  reducer: {
    chat: chatReducer,
    video: videoReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger, thunk),
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
