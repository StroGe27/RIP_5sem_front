import React from "react";
import "./VirtualsTable.sass"
import {STATUSES, variables} from "/src/utils/consts";
import {ru} from "/src/utils/momentLocalization";
import moment from "moment";
import {useQuery} from "react-query";
import {useVirtuals} from "../../../hooks/virtuals/useVirtuals";
import {useCustomTable} from "../../../hooks/other/useCustomTable";
import CustomTable from "../../../components/CustomTable/CustomTable";
import {useNavigate} from "react-router-dom"
import VirtualsFilters from "../VirtualsFilters/VirtualsFilters";
import CustomButton from "../../../components/CustomButton/CustomButton";
import {useAuth} from "../../../hooks/users/useAuth";
import {useToken} from "../../../hooks/users/useToken";
import {api} from "../../../utils/api";

const VirtualsTable = () => {

    const {access_token} = useToken()

    const {is_moderator} = useAuth()

    const navigate = useNavigate()

    const {searchVirtuals} = useVirtuals()

    const columns = [
        {
            Header: "№",
            accessor: "id"
        },
        {
            Header: "Статус",
            accessor: "status",
            Cell: ({ value }) => { return STATUSES.find(status => status.id == value).name }
        },
        {
            Header: "Пользователь",
            accessor: "owner",
            Cell: ({ value }) => { return value.name }
        },
        {
            Header: "Дата формирования",
            accessor: "date_formation",
            Cell: ({ value }) => { return moment(value).locale(ru()).format("D MMMM HH:mm") }
        },
        {
            Header: "Дата завершения",
            accessor: "date_complete",
            Cell: ({ value }) => {
                if (!value) {
                    return "Нет"
                }
                
                return moment(value).locale(ru()).format("D MMMM HH:mm")
            }
        }
    ]

    if (is_moderator) {
        columns.push({
            Header: "Действие",
            accessor: "accept_button",
            Cell: ({ cell }) => (
                is_moderator && cell.row.values.status == 2 && <CustomButton bg={variables.green} onClick={(e) => acceptVirtual(cell.row.values.id)}>Принять</CustomButton>
            )
        })

        columns.push({
            Header: "Действие",
            accessor: "dismiss_button",
            Cell: ({ cell }) => (
                is_moderator && cell.row.values.status == 2 && <CustomButton bg={variables.red} onClick={(e) => dismissVirtual(cell.row.values.id)}>Отклонить</CustomButton>
            )
        })
    }

    const acceptVirtual = async (order_id) => {

        const formData = new FormData()

        formData.append("status", "3")

        const response = await api.put(`virtuals/${order_id}/update_status_admin/`, formData, {
            headers: {
                'authorization': access_token
            }
        });

        if (response.status == 200) {
            refetch()
        }
    }

    const dismissVirtual = async (order_id) => {

        const formData = new FormData()

        formData.append("status", "4")

        const response = await api.put(`virtuals/${order_id}/update_status_admin/`, formData, {
            headers: {
                'authorization': access_token
            }
        });

        if (response.status == 200) {
            refetch()
        }
    }
    
    const { isLoading, data, isSuccess, refetch } = useQuery(
        ["virtuals"],
        () => searchVirtuals(),
        {
            refetchInterval: 2000,
            refetchOnWindowFocus: false,
            cacheTime: 0,
            keepPreviousData: false,
        }
    );

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

    const handleClick = (virtual_id) => {
        navigate(`/virtuals/${virtual_id}`)
    }

    return (
        <div className="virtuals-table-wrapper">

            <CustomTable
                getTableBodyProps={getTableBodyProps}
                headerGroups={headerGroups}
                page={page}
                prepareRow={prepareRow}
                isLoading={isLoading}
                onClick={handleClick}
            >
                <VirtualsFilters refetch={refetch}/>
            </CustomTable>

        </div>
    )
}

export default VirtualsTable