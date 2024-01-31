import {useEffect} from "react";
import {useVirtual} from "../../hooks/virtuals/useVirtual";
import {useNavigate, useParams} from "react-router-dom"
import TariffCard from "../../components/TariffCard/TariffCard";
import "./VirtualPage.sass"
import {useAuth} from "../../hooks/users/useAuth";
import {STATUSES, variables} from "../../utils/consts";
import {ru} from "../../utils/momentLocalization";
import moment from "moment";
import CustomButton from "../../components/CustomButton/CustomButton";
import CustomInput from "../../components/CustomInput/CustomInput";
import CustomDatePicker from "../../components/CustomDatePicker/CustomDatePicker";
import CustomTimePicker from "../../components/CustomTimePicker/CustomTimePicker";

const VirtualPage = () => {

    const {is_authenticated, is_moderator} = useAuth()

    const navigate = useNavigate()

    const { id } = useParams<{id: string}>();

    const {virtual, setPassegeTime, setPassegeDate, setPersonCount, fetchVirtual, saveVirtual, sendVirtual, deleteVirtual, setVirtual, setVirtualId} = useVirtual()

    useEffect(() => {

        if (!id || !is_authenticated) {
            navigate("/")
        }

        setVirtualId(id)
        fetchVirtual(id)

        return () => {
            setVirtual(undefined)
        };
    }, [])

    if (virtual == undefined)
    {
        return (
            <div className="virtual-page-wrapper">
                <h1>Пусто</h1>
            </div>
        )
    }

    const onSendVirtual = async() => {
        await saveVirtual()
        await sendVirtual()
        navigate("/virtuals")
    }

    const onDeleteVirtual = async () => {
        await deleteVirtual()
        navigate("/tariffs")
    }

    const cards = virtual.tariffs.map(tariff  => (
        <TariffCard tariff={tariff} key={tariff.id} />
    ))

    const ButtonsContainer = () => {
        return (
            <div className="buttons-wrapper">

                <CustomButton onClick={onSendVirtual} bg={variables.primary}>Отправить</CustomButton>

                <CustomButton onClick={onDeleteVirtual} bg={variables.red}>Удалить</CustomButton>

            </div>
        )
    }

    const is_draft = virtual.status == 1

    const completed = [3, 4].includes(virtual.status)

    return (
        <div className="virtual-page-wrapper">

            <div className="virtual-tariffs-wrapper">
                <div className="top">
                    <h3>{is_draft ? "Новая виртуальная машина" :  "Виртуальная машина №" + virtual.id}</h3>
                </div>

                <div className="virtual-info-container">
                    <span>Статус: {STATUSES.find(status => status.id == virtual.status).name}</span>
                    <span>Дата создания: {moment(virtual.date_created).locale(ru()).format("D MMMM HH:mm")}</span>
                    {[2, 3, 4].includes(virtual.status) && <span>Дата формирования: {moment(virtual.date_formation).locale(ru()).format("D MMMM HH:mm")}</span>}
                    {completed && <span>Дата завершения: {moment(virtual.date_complete).locale(ru()).format("D MMMM HH:mm")}</span> }
                </div>

                <div className="title">
                    <h3>Тарифы</h3>
                </div>

                <div className="bottom">

                    {cards}

                </div>
            </div>

            {!is_moderator && is_draft && <ButtonsContainer />}

        </div>
    )
}

export default VirtualPage