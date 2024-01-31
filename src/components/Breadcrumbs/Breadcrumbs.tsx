import "./Breadcrumbs.sass"
import { Link, useLocation } from "react-router-dom";
import {FaChevronRight} from "react-icons/fa6";
import {FaHome} from "react-icons/fa";
import {useTariff} from "../../hooks/tariffs/useTariff";
import {useVirtual} from "../../hooks/virtuals/useVirtual";

const Breadcrumbs = () => {

    const location = useLocation()

    const {tariff, setTariff} = useTariff()

    const { virtual, is_draft } = useVirtual()

    let currentLink = ''

    const resetSelectedTariff = () => setTariff(undefined)

    const topics = {
        "tariffs": "Тарифы",
        "tariffs-table": "Тарифы",
        "virtuals": "Виртуальные машины",
        "home": "Главная",
        "login": "Вход",
        "register": "Регистрация",
        "profile": "Личный кабинет"
    }

    const exclude_topics = ["edit"]

    const crumbs = location.pathname.split('/').filter(crumb => crumb !== '').map(crumb => {

        currentLink += `/${crumb}`

        if (exclude_topics.find(x => x == crumb)) {
            return
        }

        if (Object.keys(topics).find(x => x == crumb)) {
            return (
                <div className={"crumb"} key={crumb}>

                    <Link to={currentLink} onClick={resetSelectedTariff}>
                        { topics[crumb] }
                    </Link>

                    <FaChevronRight className={"chevron-icon"}/>

                </div>
            )
        }

        if (currentLink.match(new RegExp('add')))
        {
            return (
                <div className={"crumb"} key={crumb}>

                    <Link to={currentLink}>
                        Новый тариф
                    </Link>

                    <FaChevronRight className={"chevron-icon"}/>

                </div>
            )
        }


        if (currentLink.match(new RegExp('virtuals/(\d*)')))
        {
            return (
                <div className={"crumb"} key={crumb}>

                    <Link to={currentLink}>
                        {is_draft ? "Новая виртуальная машина" : "Виртуальная машина №" + virtual?.id}
                    </Link>

                    <FaChevronRight className={"chevron-icon"}/>

                </div>
            )
        }

        if (currentLink.match(new RegExp('tariffs/(\d*)')))
        {
            return (
                <div className={"crumb"} key={crumb}>

                    <Link to={currentLink}>
                        {tariff?.name}
                    </Link>

                    <FaChevronRight className={"chevron-icon"}/>

                </div>
            )
        }
    });

    return (
        <div className="breadcrumbs-wrapper">
            <div className="breadcrumbs">

                <div className="crumb">

                    <Link to={"/tariffs"}>
                        <FaHome className="home-icon" />
                    </Link>

                    <FaChevronRight className="chevron-icon" />

                </div>

                {crumbs}

            </div>
        </div>
    )
}

export default Breadcrumbs;