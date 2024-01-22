import "./ServiceList.sass"
import SearchBar from "./SearchBar/SearchBar";
import {useEffect, useState} from "react";
import ServiceCard from "./ServiceList/ServiceCard";
import {iTariffMock, requestTime} from "../../Consts";
import {Tariff} from "../../Types";

const TariffList = () => {

    const [tariffs, setTariffs] = useState<Tariff[]>([]);

    const [query, setQuery] = useState<string>("");

    const [isMock, setIsMock] = useState<boolean>(false);

    const searchTariffs = async () => {

        try {

            const response = await fetch(`http://127.0.0.1:8000/api/tariffs/search?&query=${query}`, {
                method: "GET",
                signal: AbortSignal.timeout(requestTime)
            })

            if (!response.ok){
                createMock();
                return;
            }
        
            const data = await response.json();
            const tariffs: Tariff[] = data.tariffs;

            setTariffs(tariffs)
            setIsMock(false)

        } catch (e) {

            createMock()

        }
    }

    const createMock = () => {

        setIsMock(true);
        setTariffs(iTariffMock)

    }

    useEffect(() => {
        searchTariffs()
    }, [query])

    const cards = tariffs.map((tariff)  => (
        <ServiceCard tariff={tariff} key={tariff.id} isMock={isMock}/>
    ))

    return (
        <div className="cards-list-wrapper">

            <div className="top">

                <h2>Поиск сервисов</h2>

                <SearchBar query={query} setQuery={setQuery} />

            </div>

            <div className="bottom">
                { cards }

            </div>

        </div>
    )
}

export default TariffList;