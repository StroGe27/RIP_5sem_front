import {createSlice} from "@reduxjs/toolkit"

const initialState = {
	virtual: undefined,
	virtual_id: undefined,
	passege_date: undefined,
	passege_time: undefined,
	person_count: undefined
};

const virtualSlice = createSlice({
	name: 'virtual',
	initialState: initialState,
	reducers: {
		updateVirtual(state, action) {
			state.virtual = action.payload
		},
		updatePassegeDate(state, action) {
			state.passege_date = action.payload
		},
		updatePassegeTime(state, action) {
			state.passege_time = action.payload
		},
		updatePersonCount(state, action) {
			state.person_count = action.payload
		},
		updateVirtualId(state, action) {
			state.virtual_id = action.payload
		}
	}
})

export const {
	updateVirtual,
	updatePassegeDate,
	updatePassegeTime,
	updatePersonCount,
	updateVirtualId
} = virtualSlice.actions;

export default virtualSlice.reducer;