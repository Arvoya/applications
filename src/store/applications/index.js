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

const applicationReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setApplications, (state, action) => {
      state.applications = action.payload;
    })
    .addCase(addApplication, (state, action) => {
      state.applications.push(action.payload);
    })
    .addCase(updateApplication, (state, action) => {
      state.applications = state.applications.map((application) =>
        application._id === action.payload._id ? action.payload : application,
      );
    })
    .addCase(deleteApplication, (state, action) => {
      state.applications = state.applications.filter(
        (application) => application._id !== action.payload._id,
      );
    })
    .addCase(setLoading, (state, action) => {
      state.isLoading = action.payload;
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    });
});

export const fetchApplications = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await axios.get("http://localhost:3000/applications");
    let applicationValues = response.data;

    dispatch(setApplications(applicationValues));

    const currentDate = new Date();

    for (let application of applicationValues) {
      const dateApplied = new Date(application.dateApplied);
      const daysSinceApplied = Math.floor(
        (currentDate - dateApplied) / (1000 * 60 * 60 * 24),
      );

      if (application.status === "Applied" && daysSinceApplied > 7) {
        await dispatch(
          updateExistingApplication({ ...application, status: "Getting Cold" }),
        );
      } else if (
        application.status === "Getting Cold" &&
        daysSinceApplied > 30
      ) {
        await dispatch(
          updateExistingApplication({ ...application, status: "Frozen" }),
        );
      }
    }

    dispatch(setLoading(false));
  } catch (e) {
    dispatch(setError(e.toString()));
    console.error(e);
  }
};

export const addNewApplication = (application) => async (dispatch) => {
  try {
    let response = await axios.post(
      "http://localhost:3000/applications",
      application,
    );
    // NOTE: Using response.data so the proper _id is set in the application object
    dispatch(addApplication(response.data));
  } catch (e) {
    dispatch(setError(e.toString()));
    console.error(e);
  }
};

export const updateExistingApplication = (application) => async (dispatch) => {
  try {
    await axios.put(
      `http://localhost:3000/applications/${application._id}`,
      application,
    );
    dispatch(updateApplication(application));
  } catch (e) {
    dispatch(setError(e.toString()));
    console.error(e);
  }
};

export const deleteExistingApplication = (application) => async (dispatch) => {
  try {
    await axios.delete(`http://localhost:3000/applications/${application._id}`);
    dispatch(deleteApplication(application));
  } catch (e) {
    dispatch(setError(e.toString()));
    console.error(e);
  }
};

export default applicationReducer;
