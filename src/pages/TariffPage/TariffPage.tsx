import "./TariffPage.sass"
import {useEffect} from "react";
import {Link, useParams} from "react-router-dom";
import {useTariff} from "../../hooks/tariffs/useTariff";

const TariffPage = () => {

    const { id } = useParams<{id: string}>();
    
    const {tariff, fetchTariff} = useTariff()
    
    useEffect(() => {
        id && fetchTariff(id)
    }, [])

    if (tariff == undefined) {
        return (
            <div>

            </div>
        )
    }

    const img = `http://127.0.0.1:8000/api/tariffs/${id}/image/`

    return (
        <div className="page-details-wrapper">

            <Link className="return-link" to="/">
                Назад
            </Link>

            <div className="left">

                <img src={img}  alt=""/>

            </div>

            <div className="right">

                <div className="info-container">

                    <h2>{tariff.name}</h2>

                    <br />

                    <span>Описание: {tariff.description}</span>

                    <br />

                    <span>Оперативная память: {tariff.ram} гб</span>

                    <br />

                    <span>Размер SSD хранилища: {tariff.ssd} гб</span>

                    <br />

                    <span>Цена за месяц аренды: {tariff.price} рублей</span>

                </div>

            </div>

        </div>
    )
}

export default TariffPage;