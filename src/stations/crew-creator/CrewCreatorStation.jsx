import { HashRouter, Routes, Route } from "react-router-dom";
import { CrewmateProvider } from "./CrewmateContext.jsx";
import DashboardView from "./DashboardView.jsx";
import CreateForm from "./CreateForm.jsx";
import CrewDetail from "./CrewDetail.jsx";
import EditForm from "./EditForm.jsx";
import SetUpPage from "./SetupPage.js"
import "./CrewCreatorStation.css";
import "../../Hologram.css";

function CrewCreatorStation() {
    return (
        <HashRouter>
            <CrewmateProvider>
                <Routes>
                    <Route path="/" element={<DashboardView />} />
                    <Route path="/create" element={<CreateForm />} />
                    <Route path="/crew/:id" element={<CrewDetail />} />
                    <Route path="/crew/:id/edit" element={<EditForm />} />
                    <Route path="/setup/" element={<SetUpPage />} />
                </Routes>
            </CrewmateProvider>
        </HashRouter>
    );
}

export default CrewCreatorStation;