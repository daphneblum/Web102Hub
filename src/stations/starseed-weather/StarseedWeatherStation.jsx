import { HashRouter, Routes, Route } from "react-router-dom";
import StationLayout from './components/StationLayout.jsx';
import DashboardView from './components/DashboardView.jsx';
import PlanetDetail from './components/PlanetDetail.jsx';
import ForecastPage from './components/ForecastPage.jsx';

function StarseedWeatherStation() {
    return (
        <HashRouter>
            <StationLayout>
                <Routes>
                    <Route path="/" element={<DashboardView/>}/>
                    <Route path="/planet/:id" element={<PlanetDetail/>}/>
                    <Route path="/forecast" element={<ForecastPage/>}/>
                </Routes>
            </StationLayout>
        </HashRouter>
    )
}

export default StarseedWeatherStation;