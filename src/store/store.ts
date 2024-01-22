import {configureStore} from "@reduxjs/toolkit";

import tariffReducer from "./tariffs/tariffSlice"
import draftOrderReducer from "./orders/orderSlice"
import authReducer from "./users/authSlice"
import ordersReducer from "./orders/ordersSlice"
import tariffsReducer  from "./tariffs/tariffsSlice"

export default configureStore({
	reducer: {
		tariff: tariffReducer,
		tariffs: tariffsReducer,
		order: draftOrderReducer,
		orders: ordersReducer,
		user: authReducer
	}
});