import { Link } from "react-router-dom";
import { useForecast } from "../hooks/useForecast.js";

export default function BroadcastTicker() {
    const { data, loading, error } = useForecast();

    if (loading || error || !data) return null;

    return (
        <Link
            to="/forecast"
            className="starseed-ticker"
            aria-label={`Open today's Starseed Weather Service forecast: ${data.ticker_line}`}    
        >
            <span className="starseed-ticker__label">DWB 9</span>
            <span className="starseed-ticker__track">
                <span className="starseed-ticker__text">{data.ticker_line}</span>
            </span>
        </Link>
    );
}