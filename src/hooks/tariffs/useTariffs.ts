import {useDispatch, useSelector} from 'react-redux';
import {
	updateTariffs,
	updateQuery
} from "../../store/tariffs/tariffsSlice";
import {api} from "../../utils/api";
import {useVirtual} from "../virtuals/useVirtual";
import {useToken} from "../users/useToken";

export function useTariffs() {
	const tariffs = useSelector(state => state.tariffs.tariffs);
	const query = useSelector(state => state.tariffs.query);

	const {access_token} = useToken()

	const {setVirtual, setVirtualId} = useVirtual()

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

		const draft_virtual_id = data["draft_virtual_id"]
		setVirtualId(draft_virtual_id)

		if (!draft_virtual_id) {
			setVirtual(undefined)
			navigate && navigate("/")
		}

		return data["tariffs"]
	}

	const deleteTariff = async (tariff) => {

		await api.delete(`tariffs/${tariff.id}/delete/`, {
			headers: {
				'authorization': access_token
			}
		})
	}


	return {
		tariffs,
		setTariffs,
		query,
		setQuery,
		searchTariffs,
		deleteTariff
	};
}