import {useDispatch, useSelector} from 'react-redux';
import {
	updateTariff,
	updateName,
	updateDescription,
	updateHeatOutput,
	updateImage
} from "../../store/tariffs/tariffSlice";
import {api} from "../../utils/api";

export function useTariff() {
	const tariff = useSelector(state => state.tariff.tariff);

	const dispatch = useDispatch()

	const setTariff = (value) => {
		dispatch(updateTariff(value))
	}

	const setName = (value) => {
		dispatch(updateName(value))
	}

	const setDescription = (value) => {
		dispatch(updateDescription(value))
	}

	const setHeatOutput = (value) => {
		dispatch(updateHeatOutput(value))
	}

	const setImage = (value) => {
		dispatch(updateImage(value))
	}

	const fetchTariff = async (id) => {

		const {data} = await api.get(`tariffs/${id}`);

		setTariff(data)

	};

	return {
		tariff,
		setTariff,
		fetchTariff,
		setName,
		setDescription,
		setHeatOutput,
		setImage
	};
}