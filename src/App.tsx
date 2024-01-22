import "./styles/Main.sass"
import "./styles/Reset.sass"
import { useState } from 'react'
import Header from "./components/Header/Header";
import {Tariff} from "./Types";
import Breadcrumbs from "./components/Breadcrumbs/Breadcrumbs";
import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom';

import TariffPage from "./pages/TariffPage/TariffPage";
import ServiceList from "./pages/ServiceList/ServiceList";
import AboutPage from "./pages/AboutPage/AboutPage";
import ContactsPage from "./pages/ContactsPage/ContactsPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";




function App() {

    const [selectedTariff, setSelectedTariff] = useState<Tariff | undefined>(undefined)

    return (
       <BrowserRouter basename="/rent">

            <div className="App">

                <div className="wrapper">

                    <Header />

                    <div className={"content-wrapper"}>

                        <Breadcrumbs selectedTariff={selectedTariff} setSelectedTariff={setSelectedTariff}/>

                        <Routes>

                            <Route path="/" element={<Navigate to="/tariff" replace />} />

                            <Route path="/about" element={<AboutPage />} />

                            <Route path="/contacts" element={<ContactsPage />} />

                            <Route path="/profile" element={<ProfilePage />} />

                            <Route path="/tariff" element={<ServiceList />} />

                            <Route path="/tariffs/:id" element={<TariffPage selectedTariff={selectedTariff} setSelectedTariff={setSelectedTariff} />} />

                        </Routes>

                    </div>

                </div>

            </div>

        </BrowserRouter>
    )
}

export default App
