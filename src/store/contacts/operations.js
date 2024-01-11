import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

axios.defaults.baseURL = "https://6447f57c50c2533744347a1c.mockapi.io";

const fetchApi = createAsyncThunk(
  "contacts/fetchApi",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/contacts");

      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const addContactThunk = createAsyncThunk(
  "contacts/addContactThunk",
  async (contact, { rejectWithValue }) => {
    try {
      const response = await axios.post("/contacts", { ...contact });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const deleteContactThunk = createAsyncThunk(
  "contacts/deleteContactThunk",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`/contacts/${id}`);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export { fetchApi, addContactThunk, deleteContactThunk };
