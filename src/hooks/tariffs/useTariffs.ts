import {useDispatch, useSelector} from 'react-redux';
import {
	updateTariffs,
	updateQuery
} from "../../store/tariffs/tariffsSlice";
import {api} from "../../utils/api";
import {useOrder} from "../orders/useOrder";
import {useToken} from "../users/useToken";

export function useTariffs() {
	const tariffs = useSelector(state => state.tariffs.tariffs);
	const query = useSelector(state => state.tariffs.query);

	const {access_token} = useToken()

	const {setOrder, fetchOrder} = useOrder()

	const dispatch = useDispatch()

	const setTariffs = (value) => {
		dispatch(updateTariffs(value))
	}

	const setQuery = (value) => {
		dispatch(updateQuery(value))
	}

	const searchTariffs = async (navigate=null) => {

		const {data} = await api.get(`tariffs/search/`, {
			params: {
				query: query
			},
			headers: {
				'authorization': access_token
			}
		})

		const draft_order_id = data["draft_order_id"]
		if (draft_order_id) {
			await fetchOrder(draft_order_id)
		} else {
			setOrder(undefined)
			navigate && navigate("/")
		}

		return data["tariffs"]
	}

	return {
		tariffs,
		setTariffs,
		query,
		setQuery,
		searchTariffs
	};
}