import { configureStore } from "@reduxjs/toolkit";
import applicationReducer from "./settings";

export default configureStore({
  reducer: {
    application: applicationReducer,
  },
});
