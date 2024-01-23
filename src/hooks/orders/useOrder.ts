import {useDispatch, useSelector} from 'react-redux';
import {
	updateDescription,
	updateName,
	updateOrder
} from "../../store/orders/orderSlice";
import {useToken} from "../users/useToken";
import {api} from "../../utils/api";

export function useOrder() {

	const {access_token} = useToken()

	const order = useSelector(state => state.order.order)

	const is_draft = order?.status == 1

	const dispatch = useDispatch()

	const setOrder = (value) => {
		dispatch(updateOrder(value))
	}

	const setName = (value) => {
		dispatch(updateName(value))
	}

	const setDescription = (value) => {
		dispatch(updateDescription(value))
	}

	const sendOrder = async () => {

		const response = await api.put(`orders/${order.id}/update_status_user/`, {}, {
			headers: {
				'authorization': access_token
			}
		})

		if (response.status == 200)
		{
			setOrder(undefined)
		}
	}

	const deleteOrder = async () => {

		const response = await api.delete(`orders/${order.id}/delete/`, {
			headers: {
				'authorization': access_token
			}
		})

		if (response.status == 200)
		{
			setOrder(undefined)
		}

	}

	const saveOrder = async () => {

		const form_data = new FormData()

		form_data.append('name', order.name)
		form_data.append('description', order.description)

		await api.put(`orders/${order.id}/update/`, form_data, {
			headers: {
				'authorization': access_token
			}
		})

	}

	const fetchOrder = async (order_id) => {

		const {data} = await api.get(`orders/${order_id}/`, {
			headers: {
				'authorization': access_token
			},
		})

		setOrder(data)
	}

	const addTariffToOrder = async (tariff) => {
		await api.post(`tariffs/${tariff.id}/add_to_order/`, {}, {
			headers: {
				'authorization': access_token
			}
		})
	}

	const deleteTariffFromOrder = async (tariff) => {
		await api.delete(`orders/${order.id}/delete_tariff/${tariff.id}/`, {
			headers: {
				'authorization': access_token
			}
		})
	}

	return {
		order,
		is_draft,
		setOrder,
		setName,
		setDescription,
		saveOrder,
		sendOrder,
		deleteOrder,
		fetchOrder,
		addTariffToOrder,
		deleteTariffFromOrder
	};
}