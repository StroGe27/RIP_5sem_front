import "./TariffCard.sass"
import {Tariff} from "../../utils/types";
import {Link} from "react-router-dom";
import {useAuth} from "../../hooks/users/useAuth";
import {useVirtual} from "../../hooks/virtuals/useVirtual";
import CustomButton from "../CustomButton/CustomButton";
import {variables} from "../../utils/consts";
import {useTariffs} from "../../hooks/tariffs/useTariffs";
import CustomInput from "../CustomInput/CustomInput";
import {useState} from "react";
import {useToken} from "../../hooks/users/useToken";
import {api} from "../../utils/api";

const TariffCard = ({ tariff, refetch }: {tariff:Tariff}) => {

    const {is_authenticated, is_moderator} = useAuth()

    const {virtual, is_draft, addTariffToVirtual, deleteTariffFromVirtual} = useVirtual()

    const {deleteTariff} = useTariffs()

    const [value, setValue] = useState(tariff.months)

    const {access_token} = useToken()

    const handleSaveValue = async () => {
        const form_data = new FormData()

        form_data.append('months', value)

        await api.put(`virtuals/${virtual.id}/update_tariff/${tariff.id}/`, form_data, {
            headers: {
                'authorization': access_token
            }
        })
    }

    const handleAddTariff = async (e) => {
        e.preventDefault()
        await addTariffToVirtual(tariff)
        refetch()
    }

    const handleDeleteTariffFromVirtual = async (e) => {
        e.preventDefault()
        await deleteTariffFromVirtual(tariff)
    }

    const handleDeleteTariff = async (e) => {
        e.preventDefault()
        await deleteTariff(tariff)
        refetch()
    }

    return (
        <div className="card-wrapper">

            <div className="preview">
                <img src={tariff.image}  alt=""/>
            </div>

            <div className="card-content">

                <div className="content-top">

                    <h3 className="title"> {tariff.name} </h3>

                </div>

                {location.pathname.includes("virtuals") &&
                    <div className="card-inputs-container">
                        <CustomInput placeholder="Кол-во месяцев" value={value} setValue={setValue} disabled={!is_draft}/>
                    </div>
                }

                <div className="content-bottom">

                    {!is_moderator &&
                        <Link to={`/tariffs/${tariff.id}`}>
                            <CustomButton bg={variables.primary}>
                                Подробнее
                            </CustomButton>
                        </Link>
                    }
                    
                    {is_authenticated && !is_moderator && location.pathname.includes("tariffs") &&
                        <CustomButton onClick={handleAddTariff} bg={variables.green}>Добавить</CustomButton>
                    }

                    {is_authenticated && !is_moderator && is_draft && location.pathname.includes("virtuals") &&
                        <CustomButton onClick={handleDeleteTariffFromVirtual} bg={variables.red}>Удалить</CustomButton>
                    }

                    {is_authenticated && !is_moderator && is_draft && location.pathname.includes("virtuals") &&
                        <CustomButton onClick={handleSaveValue} bg={variables.green}>Сохранить</CustomButton>
                    }

                    {is_authenticated && is_moderator && location.pathname.includes("tariffs") &&
                        <Link to={`/tariffs/${tariff.id}/edit`}>
                            <CustomButton bg={variables.primary}>Редактировать</CustomButton>
                        </Link>
                    }

                    {is_authenticated && is_moderator && location.pathname.includes("tariffs") &&
                        <CustomButton onClick={handleDeleteTariff} bg={variables.red}>Удалить</CustomButton>
                    }

                </div>

            </div>

        </div>
    )
}

export default TariffCard;