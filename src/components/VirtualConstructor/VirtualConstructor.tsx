import "./VirtualConstructor.sass"
import {useVirtual} from "../../hooks/virtuals/useVirtual";
import {Link} from "react-router-dom";

const VirtualConstructor = () => {

    const {virtual_id} = useVirtual()

    if (virtual_id == undefined) {
        return (
            <div className="constructor-container disabled">
                <span className="title">Новая виртуальная машина</span>
            </div>
        )
    }

    return (
        <Link to={`/virtuals/${virtual_id}`} className="constructor-container">
            <span className="title">Новая виртуальная машина</span>
        </Link>
    )
}

export default VirtualConstructor