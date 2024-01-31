import VirtualsTable from "./VirtualsTable/VirtualsTable";
import {useAuth} from "../../hooks/users/useAuth";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom"

const VirtualsPage = () => {    

    const {is_authenticated} = useAuth()

    const navigate = useNavigate()

    useEffect(() => {
        if (!is_authenticated) {
            navigate("/tariffs")
        }
    }, [])

    return (
        <div>
            <VirtualsTable />
        </div>
    )
}

export default VirtualsPage;

