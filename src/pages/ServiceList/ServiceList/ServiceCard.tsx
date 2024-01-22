import "./ServiceCard.sass"
import {Tariff} from "../../../Types";
import {Link} from "react-router-dom";
import mockImage from "/src/assets/mock.png"

const ServiceCard = ({ tariff, isMock }: {tariff:Tariff, isMock:boolean }) => {

    const img = `http://127.0.0.1:8000/api/tariffs/${tariff.id}/image/`

    return (
        <div className="card-wrapper">

            <div className="preview">
                <img src={isMock ? mockImage : img} />
            </div>

            <div className="card-content">

                <div className="content-top">

                    <h3 className="title"> {tariff.name} </h3>

                </div>

                <div className="content-bottom">

                    <Link to={`/tariffs/${tariff.id}`}>
                        Подробнее
                    </Link>

                </div>

            </div>

        </div>
    )
}

export default ServiceCard;