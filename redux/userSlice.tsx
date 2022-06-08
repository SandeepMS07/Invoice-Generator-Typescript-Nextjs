import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "detail",
  initialState: {
    values: {
      name: "",
      email: "",
      phone: "",
      student_id: "",
      learncab_id: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
      country: "",
      gst_number: "",
      payment_id: "",
      date: "",
    },
    itemList: [
      {
        description: "",
        price: "",
        amount_paid: "",
        plan_code: "",
        days: "",
        discount: "",
      },
    ],
  },
  reducers: {
    update: (state, action) => {
      state.values.name = action.payload.values.name;
    },
  },
});
