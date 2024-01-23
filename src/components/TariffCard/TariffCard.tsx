import "./TariffCard.sass"
import {Tariff} from "../../utils/types";
import {Link} from "react-router-dom";
import {useAuth} from "../../hooks/users/useAuth";
import {useOrder} from "../../hooks/orders/useOrder";
import CustomButton from "../CustomButton/CustomButton";
import {variables} from "../../utils/consts";
import {api} from "../../utils/api";
import {useEffect, useState} from "react";
import {useToken} from "../../hooks/users/useToken";
import CustomInput from "../CustomInput/CustomInput";
import {useTariffs} from "../../hooks/tariffs/useTariffs";
import {useNavigate} from "react-router-dom"

const TariffCard = ({ tariff, flag }: {tariff:Tariff}) => {

    const navigate = useNavigate()

    const {is_authenticated, is_moderator} = useAuth()

    const {searchTariffs} = useTariffs()

    const {order, is_draft, addTariffToOrder, deleteTariffFromOrder} = useOrder()

    const handleAddTariff = async (e) => {
        e.preventDefault()
        await addTariffToOrder(tariff)
        await searchTariffs()
    }

    const handleDeleteTariff = async (e) => {
        e.preventDefault()
        await deleteTariffFromOrder(tariff)
        await searchTariffs(navigate)
    }

    const {access_token} = useToken()

    const updateValue = async () => {
        const form_data = new FormData()

        form_data.append('months', value)

        await api.put(`orders/${order.id}/update_tariff/${tariff.id}/`, form_data, {
            headers: {
                'authorization': access_token
            }
        })
    }

    const fetchValue = async () => {
        const {data} = await api.get(`orders/${order.id}/tariffs/${tariff.id}/`, {
            headers: {
                'authorization': access_token
            }
        })

        setValue(data)
    }

    const [value, setValue] = useState()

    useEffect(() => {
        location.pathname.includes("orders") && fetchValue()
    }, [])

    useEffect(() => {
        value && updateValue()
    }, [flag])

    const is_chosen = order?.tariffs.find(g => g.id == tariff.id)

    return (
        <div className="card-wrapper">

            <div className="preview">
                <img src={tariff.image}  alt=""/>
            </div>

            <div className="card-content">

                <div className="content-top">

                    <h3 className="title"> {tariff.name} </h3>

                </div>

                {location.pathname.includes("orders") &&
                    <div className="card-inputs-container">
                        <CustomInput placeholder="Кол-во месяцев" value={value} setValue={setValue} disabled={!is_draft}/>
                    </div>
                }

                <div className="content-bottom">

                    <Link to={`/tariffs/${tariff.id}`}>
                        <CustomButton bg={variables.primary}>
                            Подробнее
                        </CustomButton>
                    </Link>

                    {is_authenticated && !is_chosen && !is_moderator && location.pathname.includes("tariffs") &&
                        <CustomButton onClick={handleAddTariff} bg={variables.green}>Добавить</CustomButton>
                    }

                    {is_authenticated && is_chosen && location.pathname.includes("tariffs") &&
                        <CustomButton onClick={handleDeleteTariff} bg={variables.red} >Удалить</CustomButton>
                    }

                    {is_authenticated && !is_moderator && is_draft && location.pathname.includes("orders") &&
                        <CustomButton onClick={handleDeleteTariff} bg={variables.red}>Удалить</CustomButton>
                    }

                </div>

            </div>

        </div>
    )
}

export default TariffCard;