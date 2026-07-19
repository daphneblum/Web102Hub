import { HashRouter, Routes, Route } from "react-router-dom";
import { CrewmateProvider } from "./context/CrewmateContext.jsx";
import DashboardView from "./compoenets.DashboardView.jsx";
import CreateForm from "./components/CreateForm.jsx";
import CrewDetail from "./components/CrewDetail.jsx";
import EditForm from "./components/EditForm.jsx";
import "./CrewCreatorStation.css";
import "../..Hologram.css";

function CrewCreatorStation() {
    return (
        <HashRouter>
            <CrewmateProvider>
                <Routes>
                    <Route path="/" element={<DashboardView />} />
                    <Route path="/create" element={<CreateForm />} />
                    <Route path="/crew/:id" element={<CrewDetail />} />
                    <Route path="/crew/:id/edit" element={<EditForm />} />
                </Routes>
            </CrewmateProvider>
        </HashRouter>
    );
}

export default CrewCreatorStation;