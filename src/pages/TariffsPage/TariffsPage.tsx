import "./TariffsPage.sass"
import {useAuth} from "../../hooks/users/useAuth";
import TariffsList from "./TariffsList/TariffsList";
import TariffsTableWrapper from "./TariffsTableWrapper/TariffsTableWrapper";

const TariffsPage = () => {

    const {is_moderator} = useAuth()

    return (
        <div className="tariffs-wrapper">

            {!is_moderator && <TariffsList />}
            {is_moderator && <TariffsTableWrapper />}

        </div>
    )
}

export default TariffsPage;