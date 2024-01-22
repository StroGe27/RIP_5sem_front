import CustomTable from "../../../../components/CustomTable/CustomTable";
import {useCustomTable} from "../../../../hooks/other/useCustomTable";
import {useNavigate } from "react-router-dom";
import TariffsFilters from "../../TariffsFilters/TariffsFilters";

const TariffsTable = ({isLoading, data, isSuccess, refetch}) => {

    const columns = [
        {
            Header: "№",
            accessor: "id"
        },
        {
            Header: "Название",
            accessor: "name",
            Cell: ({ value }) => { return value }
        },
        {
            Header: "Цена",
            accessor: "price",
            Cell: ({ value }) => { return value }
        }
    ]

    const navigate = useNavigate()

    const {
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow
    } = useCustomTable(
        columns,
        isSuccess,
        data
    )

    const openEditCityPage = (tariff_id) => {
        navigate(`/tariffs/${tariff_id}/edit`)
    }

    return (
        <div>

            <CustomTable
                getTableBodyProps={getTableBodyProps}
                headerGroups={headerGroups}
                page={page}
                prepareRow={prepareRow}
                isLoading={isLoading}
                onClick={openEditCityPage}
            >
                <TariffsFilters refetch={refetch} />
            </CustomTable>

        </div>

    )
}

export default TariffsTable