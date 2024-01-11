import { asyncThunkCreator, buildCreateSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import axios from "axios";

axios.defaults.baseURL = "https://6447f57c50c2533744347a1c.mockapi.io";

const handlePending = (state) => {
  state.contacts.loading = true;
  state.contacts.error = null;
};

const handleRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

const handleFilter = (state) => state.filter;
const handleGetContact = (state) => state.contacts.item;

export const initialState = {
  contacts: {
    item: [],
    loading: null,
    error: null,
  },

  filter: "",
};

const createSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

const contactSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: (creator) => ({
    filterContact: creator.reducer((state, action) => {
      state.filter = action.payload;
    }),
    fetchApi: creator.asyncThunk(
      async (_, { rejectWithValue }) => {
        try {
          const response = await axios.get("/contacts");

          return response.data;
        } catch (error) {
          return rejectWithValue(error.message);
        }
      },
      {
        pending: handlePending,
        fulfilled: (state, action) => {
          state.contacts.loading = false;
          state.contacts.item = action.payload;
        },
        rejected: handleRejected,
      }
    ),
    addContact: creator.asyncThunk(
      async (contact, { rejectWithValue }) => {
        try {
          const response = await axios.post("/contacts", contact);

          return response.data;
        } catch (error) {
          return rejectWithValue(error.message);
        }
      },
      {
        pending: handlePending,
        fulfilled: (state, action) => {
          state.contacts.loading = false;
          state.contacts.item.push(action.payload);
        },
        rejected: handleRejected,
      }
    ),
    deleteContact: creator.asyncThunk(
      async (id, { rejectWithValue }) => {
        try {
          const response = await axios.delete(`/contacts/${id}`);

          return response.data;
        } catch (error) {
          return rejectWithValue(error.message);
        }
      },
      {
        pending: handlePending,
        fulfilled: (state, action) => {
          state.contacts.loading = false;
          state.contacts.item = state.contacts.item.filter(
            (contact) => contact.id !== action.payload.id
          );
        },
        rejected: handleRejected,
      }
    ),
  }),
  selectors: {
    getFilter: handleFilter,

    getFilteredContacts: createSelector(
      [handleGetContact, handleFilter],
      (item, filter) => {
        return item.filter(({ name }) =>
          name.toLowerCase().includes(filter.toLowerCase())
        );
      }
    ),
  },
});

export const { addContact, deleteContact, fetchApi, filterContact } =
  contactSlice.actions;

export const { getFilter, getFilteredContacts, getMemo } =
  contactSlice.selectors;

export default contactSlice;
