import "./styles/Main.sass"
import "./styles/Reset.sass"
import Header from "./components/Header/Header";
import Breadcrumbs from "./components/Breadcrumbs/Breadcrumbs";
import {BrowserRouter, Route, Routes, Navigate, useLocation} from 'react-router-dom';
import TariffPage from "./pages/TariffPage/TariffPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import {QueryClient, QueryClientProvider } from "react-query";
import {Provider} from "react-redux"
import store from "./store/store"
// import TariffsPage from "./pages/TariffsPage/TariffsPage";

import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import {useAuth} from "./hooks/users/useAuth";
import OrderConstructor from "./components/OrderConstructor/OrderConstructor";
import OrderPage from "./pages/OrderPage/OrderPage";
import OrdersPage from "./pages/OrdersPage/OrdersPage";

// Надо изменить роуты
import TariffsEditPage from "./pages/TariffEditPage/TariffEditPage";
import TariffsAddPage from "./pages/TariffAddPage/TariffAddPage";
import TariffsTableWrapper from "./pages/TariffsPage/TariffTableWrapper/TariffsTableWrapper";
import TariffsList from "./pages/TariffsPage/TariffsList/TariffsList";
// import TariffsList from "./pages/TariffsPage/TariffsList/ServicesList";


const TopPanelWrapper = () => {

    const {is_authenticated, is_moderator} = useAuth()

    const location = useLocation()

    return (
        <div className="top-panel-wrapper">
            <Breadcrumbs />
            {is_authenticated && !is_moderator && location.pathname.endsWith("tariffs") && <OrderConstructor /> }
        </div>
    )
}


function App() {

    const queryClient = new QueryClient()

    return (
        <QueryClientProvider client={queryClient}>

            <Provider store={store}>

                <BrowserRouter basename="/rent">

                    <div className="App">

                        <div className="wrapper">

                            <Header />

                            <div className={"content-wrapper"}>

                                <TopPanelWrapper />

                                <Routes>

                                    <Route path="/" element={<Navigate to="/tariffs" replace />} />

                                    <Route path="/profile" element={<ProfilePage />} />

                                    <Route path="/tariffs" element={<TariffsList />} />

                                    {/* Сделал (проверяю) */}
                                    <Route path="/tariffs-table" element={<TariffsTableWrapper />} />

                                    {/* Сделал (как открыть) */}
                                    <Route path="/tariffs/add" element={<TariffsAddPage />} />

                                    <Route path="/tariffs/:id" element={<TariffPage />} />

                                    {/* Сделал (как открыть) */}
                                    <Route path="/tariffs/:id/edit" element={<TariffsEditPage />} /> 

                                    <Route path="/profile" element={<ProfilePage />} />

                                    <Route path="/orders/:id" element={<OrderPage />} />

                                    <Route path="/orders" element={<OrdersPage />} />

                                    <Route path="/login" element={<LoginPage />} />

                                    <Route path="/register" element={<RegisterPage />} />

                                </Routes>

                            </div>

                        </div>

                    </div>

                </BrowserRouter>

            </Provider>

        </QueryClientProvider>
    )
}

export default App
