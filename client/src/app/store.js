
import { configureStore } from "@reduxjs/toolkit";
import customerReducer from "../features/customer/custormerSlice";
import vendorReducer from "../features/vendor/vendorSlice";

const store = configureStore({
    reducer: {
        customer: customerReducer,
        vendor: vendorReducer
    },
})

export default store