import "./Header.sass"
// import logo from "/src/assets/logo.png"
import NavMenu from "./NavMenu/NavMenu";

const Header = () => {
    return (
        <div className="header-wrapper">

            <div className="left-container">
                {/* <img src={logo} alt=""/> */}
                <h3>Аренда виртуальных машин</h3>
            </div>

            <div className="right-container">
                <NavMenu/>
            </div>

        </div>
    )
}

export default Header;