import "./TariffsPage.sass"
import {useAuth} from "../../hooks/users/useAuth";
import TariffsList from "./TariffsList/TariffsList";
import TariffsFilters from "./TariffsFilters/TariffsFilters";

const TariffsPage = () => {

    const {is_moderator} = useAuth()

    return (
        <div className="tariffs-wrapper">

            <TariffsFilters />

            {!is_moderator && <TariffsList />}

        </div>
    )
}

export default TariffsPage;