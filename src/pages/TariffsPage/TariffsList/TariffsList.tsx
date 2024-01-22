import "./TariffsList.sass"
import TariffCard from "../../../components/TariffCard/TariffCard";
import {useTariffs} from "../../../hooks/tariffs/useTariffs";
// import {useEffect} from "react";
import { useQuery } from "react-query";

import TariffsFilters from "../TariffsFilters/TariffsFilters";


const TariffsList = () => {

    const {searchTariffs} = useTariffs()

    const { isLoading, data, refetch } = useQuery(
        ["tariffs"],
        () => searchTariffs(),
        {
            keepPreviousData: false,
        }
    )
    if (isLoading) {
        return (
            <div>

            </div>
        )
    }
    // useEffect(() => {
    //     fetchTariffs()
    // }, [])

    const cards = data.map(tariff  => (
        <TariffCard tariff={tariff} key={tariff.id} refetch={refetch}/>
    ))

    return (
        <div className="tariffs-list-wrapper">

            <TariffsFilters refetch={refetch}/>

            <div className="tariffs-list">
                { cards }
            </div>

        </div>
    )
}

export default TariffsList;