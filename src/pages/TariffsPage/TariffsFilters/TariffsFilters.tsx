import "./TariffsFilters.sass"
import SearchBar from "../../../components/SearchBar/SearchBar";
import {useTariffs} from "../../../hooks/tariffs/useTariffs";
import {useAuth} from "../../../hooks/users/useAuth";
import LinkButton from "../../../components/LinkButton/LinkButton";
import {variables} from "../../../utils/consts";
import CustomButton from "../../../components/CustomButton/CustomButton";

const TariffsFilters = ({refetch}) => {

    const {is_moderator} = useAuth()

    const {query, setQuery} = useTariffs()

    const handleSubmit = (e) => {
        e.preventDefault()
        refetch()
    }

    return (
        <div className="tariffs-filters">

            <h2>Поиск тарифов</h2>

            <div className="right-container" >

                {is_moderator &&
                    <LinkButton to="/tariffs/add" bg={variables.primary}>
                        Добавить тариф
                    </LinkButton>
                }

                <form className="search-form" onSubmit={handleSubmit}>

                    <SearchBar query={query} setQuery={setQuery} placeholder={"Поиск..."} />

                    <CustomButton bg={variables.primary} >
                        Применить
                    </CustomButton>

                </form>

            </div>
        </div>
    )
}

export default TariffsFilters