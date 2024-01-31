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
import TariffsPage from "./pages/TariffsPage/TariffsPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import {useAuth} from "./hooks/users/useAuth";
import VirtualConstructor from "./components/VirtualConstructor/VirtualConstructor";
import VirtualPage from "./pages/VirtualPage/VirtualPage";
import VirtualsPage from "./pages/VirtualsPage/VirtualsPage";
import TariffEditPage from "./pages/TariffEditPage/TariffEditPage";
import TariffAddPage from "./pages/TariffAddPage/TariffAddPage";
import TariffsTableWrapper from "./pages/TariffsPage/TariffsTableWrapper/TariffsTableWrapper";
import TariffsList from "./pages/TariffsPage/TariffsList/TariffsList";


const TopPanelWrapper = () => {

    const {is_authenticated, is_moderator} = useAuth()

    const location = useLocation()

    return (
        <div className="top-panel-wrapper">
            <Breadcrumbs />
            {is_authenticated && !is_moderator && location.pathname.endsWith("tariffs") && <VirtualConstructor /> }
        </div>
    )
}


function App() {

    const queryClient = new QueryClient()

    return (
        <QueryClientProvider client={queryClient}>

            <Provider store={store}>

                <BrowserRouter basename="/rentvps">

                    <div className="App">

                        <div className="wrapper">

                            <Header />

                            <div className={"content-wrapper"}>

                                <TopPanelWrapper />

                                <Routes>

                                    <Route path="/" element={<Navigate to="/tariffs" replace />} />

                                    <Route path="/profile" element={<ProfilePage />} />

                                    <Route path="/tariffs" element={<TariffsList />} />

                                    <Route path="/tariffs-table" element={<TariffsTableWrapper />} />

                                    <Route path="/tariffs/add" element={<TariffAddPage />} />

                                    <Route path="/tariffs/:id" element={<TariffPage />} />

                                    <Route path="/tariffs/:id/edit" element={<TariffEditPage />} />

                                    <Route path="/profile" element={<ProfilePage />} />

                                    <Route path="/virtuals/:id" element={<VirtualPage />} />

                                    <Route path="/virtuals" element={<VirtualsPage />} />

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
