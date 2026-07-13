import { NavLink } from "react-router-dom";
import BroadcastTicker from "./BroadcastTicker.jsx";
import '../starseed.css'

function StationLayout({ children }) {
    return (
        <div className="starseed-station">
            <nav className="starseed-nav">
                <h1 className="starseed-nav__title">
                    Starseed<br />Weather
                </h1>
                <NavLink
                    to="/"
                    end
                    className={({ isActive }) => 
                        `starseed-nav__link${isActive ? ' starseed-nav__link--active' : ''}`
                    }
                >
                    Dashboard
                </NavLink>

                <NavLink
                    to="/forecast"
                    className={({ isActive }) =>
                        `starseed-nav__link${isActive ? ' starseed-nav__link--active' : ''}`
                    }    
                >
                    Forecast
                </NavLink>
            </nav>

            <div className="starseed-main">
                <div className="starseed-content">
                    {children}
                </div>
                <BroadcastTicker />
            </div>
        </div>
    )
}

export default StationLayout;