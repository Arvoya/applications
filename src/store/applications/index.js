import axios from "axios";
import { createAction, createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
  error: null,
  applications: [],
};

export const setApplications = createAction("SET_APPLICATIONS");
export const addApplication = createAction("ADD_APPLICATION");
export const updateApplication = createAction("UPDATE_APPLICATION");
export const deleteApplication = createAction("DELETE_APPLICATION");
export const setLoading = createAction("LOADING");
export const setError = createAction("ERROR");

export const applicationReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setApplications, (state, action) => {
      state.applications = action.payload;
    })
    .addCase(addApplication, (state, action) => {
      state.applications.push(action.payload);
    })
    .addCase(updateApplication, (state, action) => {
      state.applications = state.applications.map((application) =>
        application.id === action.payload.id ? action.payload : application,
      );
    })
    .addCase(setLoading, (state, action) => {
      state.isLoading = action.payload;
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    });
});

// async function
export const fetchApplications = () => async (dispatch) => {
  console.log("fetchApplications");
  dispatch(setLoading(true));
  try {
    const response = await axios.get("http://localhost:3000/applications");
    const applicationValues = response.data;
    console.log("applicationValues", applicationValues);
    dispatch(setApplications(applicationValues));
    dispatch(setLoading(false)); // Moved here
  } catch (e) {
    dispatch(setError(e.toString()));
    console.log(e);
  } finally {
    console.log("Finally");
  }
};

export default applicationReducer;
