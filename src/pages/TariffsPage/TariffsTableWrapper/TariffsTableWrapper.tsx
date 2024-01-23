import {useTariffs} from "../../../hooks/tariffs/useTariffs";
import {useQuery} from "react-query";
import TariffsTable from "./TariffsTable/TariffsTable";

const TariffsTableWrapper = () => {

    const {searchTariffs} = useTariffs()

    const { isLoading, data, isSuccess, refetch } = useQuery(
        ["tariffs"],
        () => searchTariffs(),
        {
            keepPreviousData: true,
        }
    )

    if (isLoading) {
        return (
            <div>

            </div>
        )
    }

    return (
        <div>
            <TariffsTable isLoading={isLoading} data={data} isSuccess={isSuccess} refetch={refetch} />
        </div>
    )
}

export default TariffsTableWrapper