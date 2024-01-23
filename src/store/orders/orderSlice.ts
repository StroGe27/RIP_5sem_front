import {createSlice} from "@reduxjs/toolkit"

const initialState = {
	order: undefined
};

const orderSlice = createSlice({
	name: 'order',
	initialState: initialState,
	reducers: {
		updateOrder(state, action) {
			state.order = action.payload
		},
		updateName(state, action) {
			state.order.name = action.payload
		},
		updateDescription(state, action) {
			state.order.description = action.payload
		}
	}
})

export const {
	updateOrder,
	updateName,
	updateDescription
} = orderSlice.actions;

export default orderSlice.reducer;