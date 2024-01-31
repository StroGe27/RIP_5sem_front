import {useDispatch, useSelector} from 'react-redux';
import {
	updateVirtual,
	updateVirtualId
} from "../../store/virtuals/virtualSlice";
import {useToken} from "../users/useToken";
import {api} from "../../utils/api";
import {useNavigate} from "react-router-dom"

export function useVirtual() {

	const {access_token} = useToken()

	const virtual = useSelector(state => state.virtual.virtual)
	const virtual_id = useSelector(state => state.virtual.virtual_id)

	const navigate = useNavigate()

	const is_draft = virtual?.status == 1

	const dispatch = useDispatch()

	const setVirtual = (value) => {
		dispatch(updateVirtual(value))
	}

	const setVirtualId = (value) => {
		dispatch(updateVirtualId(value))
	}

	const sendVirtual = async () => {

		const response = await api.put(`virtuals/${virtual.id}/update_status_user/`, {}, {
			headers: {
				'authorization': access_token
			}
		})

		if (response.status == 200)
		{
			setVirtual(undefined)
		}
	}

	const deleteVirtual = async () => {

		const response = await api.delete(`virtuals/${virtual.id}/delete/`, {
			headers: {
				'authorization': access_token
			}
		})

		if (response.status == 200)
		{
			setVirtual(undefined)
		}

	}

	const saveVirtual = async () => {

		await api.put(`virtuals/${virtual.id}/update/`, {}, {
			headers: {
				'authorization': access_token
			}
		})

	}

	const fetchVirtual = async (virtual_id) => {

		const {data} = await api.get(`virtuals/${virtual_id}/`, {
			headers: {
				'authorization': access_token
			},
		})

		setVirtual(data)
	}

	const addTariffToVirtual = async (tariff) => {
		await api.post(`tariffs/${tariff.id}/add_to_virtual/`, {}, {
			headers: {
				'authorization': access_token
			}
		})
	}

	const deleteTariffFromVirtual = async (tariff) => {
		const response = await api.delete(`virtuals/${virtual.id}/delete_tariff/${tariff.id}/`, {
			headers: {
				'authorization': access_token
			}
		})

		if (response.status == 200) {
			await fetchVirtual(virtual_id)
		} else if (response.status == 201) {
			navigate("/")
		}
	}

	return {
		virtual,
		virtual_id,
		is_draft,
		setVirtual,
		saveVirtual,
		sendVirtual,
		deleteVirtual,
		fetchVirtual,
		addTariffToVirtual,
		deleteTariffFromVirtual,
		setVirtualId
	};
}