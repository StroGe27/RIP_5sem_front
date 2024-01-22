import "./NavMenu.sass"
import {Link} from "react-router-dom";

const NavMenu = () => {
    return (
        <div className="menu-wrapper">

            <Link to="/about" className="menu-item">
                <span>О нас</span>
            </Link>

            <Link to="/tariff" className="menu-item">
                <span>Тарифы</span>
            </Link>

            <Link to="/contacts" className="menu-item">
                <span>Контакты</span>
            </Link>

            <Link to="/profile" className="menu-item">
                <span>Личный кабинет</span>
            </Link>

        </div>
    )
}

export default NavMenu;