import {createSlice} from "@reduxjs/toolkit"

const initialState = {
	order: undefined,
	name: "",
	description: ""
};

const orderSlice = createSlice({
	name: 'order',
	initialState: initialState,
	reducers: {
		updateOrder(state, action) {
			state.order = action.payload
		},
		updateName(state, action){
			state.name = action.payload
		},
		updateDescription(state, action){
			state.description = action.payload
		}
	}
})

export const {updateOrder, updateName, updateDescription} = orderSlice.actions;

export default orderSlice.reducer;