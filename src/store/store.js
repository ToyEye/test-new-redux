import { configureStore } from "@reduxjs/toolkit";

import contactSlice from "./contacts/contactSlice";

export const store = configureStore({
  reducer: { contacts: contactSlice.reducer },
});
