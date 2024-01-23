import {createSlice} from "@reduxjs/toolkit"

const initialState = {
	tariff: undefined,
};

const tariffSlice = createSlice({
	name: 'tariff',
	initialState: initialState,
	reducers: {
		updateTariff(state, action) {
			state.tariff = action.payload
		},
		updateName(state, action) {
			state.tariff.name = action.payload
		},
		updateDescription(state, action) {
			state.tariff.description = action.payload
		},
		updateHeatOutput(state, action) {
			state.tariff.heat_output = action.payload
		},
		updateImage(state, action) {
			state.tariff.image = action.payload
		}
	}
})

export const {
	updateTariff,
	updateName,
	updateDescription,
	updateHeatOutput,
	updateImage
} = tariffSlice.actions;

export default tariffSlice.reducer;