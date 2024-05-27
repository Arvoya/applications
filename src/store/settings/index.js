import { createAction, createReducer } from "@reduxjs/toolkit";

const initialState = {
  jobTitle: true,
  companyName: true,
  dateApplied: true,
  applicationLink: true,
  status: true,
  jobDescription: false,
  location: true,
  notes: false,
  salaryRange: true,
  contactName: false,
  contactEmail: false,
  jobReferenceID: true,
  displayRejected: false,
};

export const updateDisplayData = createAction("UPDATE_DISPLAY_DATA");

const displayDataReducer = createReducer(initialState, (builder) => {
  builder.addCase(updateDisplayData, (state, action) => {
    state[action.payload] = !state[action.payload];
  });
});

export default displayDataReducer;
