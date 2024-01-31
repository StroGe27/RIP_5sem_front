import {configureStore} from "@reduxjs/toolkit";

import tariffReducer from "./tariffs/tariffSlice"
import draftVirtualReducer from "./virtuals/virtualSlice"
import authReducer from "./users/authSlice"
import virtualsReducer from "./virtuals/virtualsSlice"
import tariffsReducer  from "./tariffs/tariffsSlice"

export default configureStore({
	reducer: {
		tariff: tariffReducer,
		tariffs: tariffsReducer,
		virtual: draftVirtualReducer,
		virtuals: virtualsReducer,
		user: authReducer
	}
});