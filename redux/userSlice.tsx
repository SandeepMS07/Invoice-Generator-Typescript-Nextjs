import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "detail",
  initialState: {
    // name: null,
    // email: null,
    // phone: null,
    // student_id: null,
    // learncab_id: null,
    // address: null,
    // city: null,
    // state: null,
    // pincode: null,
    // country: null,
    // gst_number: null,
    // payment_id: null,
    // date: null,
    // description: null,
    // price: null,
    // amount_paid: null,
    // plan_code: null,
    // days: null,
    // discount: null,
    values: null,
    itemList: null,
  },
  reducers: {
    update: (state, action) => {
      // state.name = action.payload.name;
      // state.email = action.payload.email;
      // state.phone = action.payload.phone;
      // state.student_id = action.payload.student_id;
      // state.learncab_id = action.payload.learncab_id;
      // state.address = action.payload.address;
      // state.city = action.payload.city;
      // state.state = action.payload.state;
      // state.pincode = action.payload.pincode;
      // state.country = action.payload.country;
      // state.gst_number = action.payload.gst_number;
      // state.payment_id = action.payload.payment_id;
      // state.date = action.payload.date;
      // state.description= action.payload.description;
      // state.price= action.payload.price;
      // state.amount_paid= action.payload.amount_paid;
      // state.plan_code= action.payload.plan_code;
      // state.days= action.payload.days;
      // state.discount= action.payload.discount;
      state.values = action.payload.values;
      state.itemList = action.payload.itemList;
      
    },
  },
});

export const { update } = userSlice.actions;
export default userSlice.reducer;
