import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "detail",
  initialState: {
    name: null,
    email: null,
    phone: null,
    student_id: null,
    learncab_id: null,
    address: null,
    city: null,
    state: null,
    pincode: null,
    country: null,
    gst_number: null,
    payment_id: null,
    date: null,
    itemList: null,
  },
  reducers: {
    update: (state, action) => {
      state.name = action.payload.values.name;
      state.email = action.payload.values.email;
      state.phone = action.payload.values.phone;
      state.student_id = action.payload.values.student_id;
      state.learncab_id = action.payload.values.learncab_id;
      state.address = action.payload.values.address;
      state.city = action.payload.values.city;
      state.state = action.payload.values.state;
      state.pincode = action.payload.values.pincode;
      state.country = action.payload.values.country;
      state.gst_number = action.payload.values.gst_number;
      state.payment_id = action.payload.values.payment_id;
      state.date = action.payload.values.date;
      state.itemList = action.payload.itemList;
    },
    reset: (state) => {
      state.name = null;
      state.email = null;
      state.phone = null;
      state.student_id = null;
      state.learncab_id = null;
      state.address = null;
      state.city = null;
      state.state = null;
      state.pincode = null;
      state.country = null;
      state.gst_number = null;
      state.payment_id = null;
      state.date = null;
      state.itemList = null;
    },
  },
});

export const { update, reset } = userSlice.actions;
export default userSlice.reducer;
