import { configureStore } from "@reduxjs/toolkit";
import applicationReducer from "./applications";
import displayDataReducer from "./settings";

export default configureStore({
  reducer: {
    application: applicationReducer,
    displayData: displayDataReducer,
  },
});
