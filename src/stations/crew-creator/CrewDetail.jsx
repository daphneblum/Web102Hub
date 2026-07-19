import { useParams, Link, Navigate } from "react-router-dom";
import { useCrewmates } from "./CrewmateContext.jsx";

export default function CrewDetail() {
    const { id } = useParams();
    const { getCrewmate } = useCrewmates();
    const crewmate = getCrewmate(id);

    if (!crewmate) {
        return <Navigate to="/" replace />;
    }

    return (
        <div className="crew-creator-station hologram">
            <h1 className="station-title hologram-text">
                {crewmate.name}
            </h1>
            <p className="hologram-hint">
                Role: {crewmate.role}
            </p>
            <p className="hologram-hint">
                Joined the crew: {new Date(crewmate.createdAt).toLocaleString()}
            </p>
            <Link
                to={`/crew/${crewmate.id}/edit`}
                className="hologram-label"
            >
                Edit this crew member
            </Link>
            <br />
            <Link
                to="/"
                className="hologram-label"
            >
                Back to roster
            </Link>
        </div>
    );
}