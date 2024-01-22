import "./TariffPage.sass"
import {Dispatch, useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {iTariffMock, requestTime} from "../../Consts";
import {Tariff} from "../../Types";
import mockImage from "/src/assets/mock.png"

const TariffPage = ({ selectedTariff, setSelectedTariff }: { selectedTariff:Tariff | undefined, setSelectedTariff: Dispatch<Tariff | undefined>}) => {

    const { id } = useParams<{id: string}>();
    
    const [isMock, setIsMock] = useState<boolean>(false);

    useEffect(() => {
        fetchData()
    }, [])

    if (id == undefined){
        return;
    }
    
    const fetchData = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/tariffs/${id}`, {
                method: "GET",
                signal: AbortSignal.timeout(requestTime)
            });

            if (!response.ok)
            {
                CreateMock()
                return;
            }

            const tariff: Tariff = await response.json()

            setSelectedTariff(tariff)

            setIsMock(false)
        } catch
        {
            CreateMock()
        }

    };

    const CreateMock = () => {
        setSelectedTariff(iTariffMock.find((tariff:Tariff) => tariff?.id == parseInt(id)))
        setIsMock(true)
    }

    const img = `http://127.0.0.1:8000/api/tariffs/${id}/image/`

    return (
        <div className="page-details-wrapper">

            <Link className="return-link" to="/">
                Назад
            </Link>

            <div className="left">

                <img src={isMock ? mockImage : img} />

            </div>

            <div className="right">

                <div className="info-container">

                    <h2 className="name">{selectedTariff?.name}</h2>

                    <br />

                    <span className="description">{selectedTariff?.description}</span>

                </div>

            </div>

        </div>
    )
}

export default TariffPage;