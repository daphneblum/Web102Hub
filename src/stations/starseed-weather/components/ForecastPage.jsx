import { useForecast } from "../hooks/useForecast.js";
import SignalClarityStat from "./SignalClarityStat.jsx";

function ForecastPage() {
    const { data, loading, error } = useForecast();

    if (loading) {
        return <p className="starseed-status-text">Tuning to DWB Channel 9...</p>
    }

    if (error) {
        return (
            <p className="starseed-status-text starseed-status-text--error">Signal lost: {error.message}</p>
        );
    }

    const generatedDate = new Date(data.generatedAt).toLocaleString(undefined, {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: "2-digit",
    });


    return (
        <div>
            <div className="starseed-card" style={{ marginBottom: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <p className="starseed-card__label" style={{ margin: 0, fontSize: 12 }}>
                        DWB Channel 9 - Starseed Weather Service
                    </p>
                    <span className="starseed-card__label" style={{ margin: 0 }}>{generatedDate}</span>
                </div>

                <p className="starseed-card__value" style={{ marginTop: 12, lineHeight: 1.6 }}>
                    {data.full_segment}
                </p>

                <p className="starseed-card__label" style={{ marginTop: 16, marginBottom: 0 }}>
                    Reporting from {data.setting.location} - {data.setting.authority}
                </p>
            </div>

            <SignalClarityStat />
        </div>
    );
}


export default ForecastPage;