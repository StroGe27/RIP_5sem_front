import {useDispatch, useSelector} from 'react-redux';
import {
	updateStatus,
	updateDateStart,
	updateDateEnd,
	updateUser
} from "../../store/virtuals/virtualsSlice";
import {api} from "../../utils/api";
import {useToken} from "../users/useToken";

export function useVirtuals() {
	const status = useSelector(state => state.virtuals.status)
	const date_start = useSelector(state => state.virtuals.date_start)
	const date_end = useSelector(state => state.virtuals.date_end)
	const user = useSelector(state => state.virtuals.user)

	const dispatch = useDispatch()

	const {access_token} = useToken()

	const setStatus = (value) => {
		dispatch(updateStatus(value))
	}

	const setDateStart = (value) => {
		dispatch(updateDateStart(value))
	}

	const setDateEnd = (value) => {
		dispatch(updateDateEnd(value))
	}

	const setUser = (value) => {
		dispatch(updateUser(value))
	}

	const searchVirtuals = async () => {

		const {data} = await api.get(`virtuals/search/`, {
			params: {
				status: status,
				date_start: new Date(date_start),
				date_end: new Date(date_end)
			},
			headers: {
				'authorization': access_token
			}
		})

		return data.filter(virtual => virtual.owner.name.includes(user))

	}

	return {
		status,
		date_start,
		date_end,
		setStatus,
		searchVirtuals,
		setDateStart,
		setDateEnd,
		setUser
	};
}