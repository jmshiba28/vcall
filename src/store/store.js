import { configureStore } from "@reduxjs/toolkit";
import chatReducer from "./chatSlice";
import videoReducer from "./videoSlice";
import userReducer from "./userSlice";

const store = configureStore({
  reducer: {
    chat: chatReducer,
    video: videoReducer,
    user: userReducer,
  },
});

export default store;
