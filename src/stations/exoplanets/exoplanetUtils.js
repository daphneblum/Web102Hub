export function getPlanetVisuals(temperature, radiusEarths) {
    let color = "black"
    let emissive = 0
    let scale = 1


    if (temperature < 200) {
        color = "#dff0ff"; 
    } else if (temperature < 500) {
        color = "#88aacc"; 
    } else if (temperature < 799) {
        color = "#c4a96b"; 
    } else if (temperature < 1001) {
        emissive = .1;
        color = "red";
    } else if (temperature < 5001) {
        emissive = .3;
        color = "orange";
    } else if (temperature < 6501) {
        emissive = .6;
        color = "white"
    } else {
        emissive = 1;
        color = "blue"
    }

    scale = Math.log(radiusEarths + 1) * 2;

    return { color, emissive, scale };
}

export function buildApiUrl(banList = []) {
    const baseUrl = "https://exoplanetarchive.ipac.caltech.edu/TAP/sync";

    const bannedConditions = banList.map(
        method => `discoverymethod!='${method}'`
    ).join("+and+");

    const banFilter = bannedConditions.length > 0 ? `+and+${bannedConditions}` : "";

    const query = `select+pl_name,hostname,discoverymethod,disc_year,pl_orbper,pl_rade,pl_eqt,pl_bmasse,sy_dist+from+pscomppars+where+pl_eqt+is+not+null+and+pl_rade+is+not+null${banFilter}&format=json`;

    return `${baseUrl}?query=${query}`;
}