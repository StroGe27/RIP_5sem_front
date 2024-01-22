import {createSlice} from "@reduxjs/toolkit"

const initialState = {
	tariffs: [],
	query: ""
};

const tariffsSlice = createSlice({
	name: 'tariffs',
	initialState: initialState,
	reducers: {
		updateTariffs(state, action) {
			state.tariffs = action.payload
		},
		updateQuery(state, action) {
			state.query = action.payload
		}
	}
})

export const {
	updateTariffs,
	updateQuery
} = tariffsSlice.actions;

export default tariffsSlice.reducer;