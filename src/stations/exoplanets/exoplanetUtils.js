export function getPlanetVisuals(temperature, radiusEarths) {
    let color = "#808080";
    let emissive = 0;
    let scale = 1;
    let planetType = "rocky";
    let atmosphereGlow = "rgba(100, 150, 255, 0.25)";

    if (radiusEarths >= 10) {
        planetType = "gas-giant";
    } else if (radiusEarths >= 4) {
        planetType = "ice-giant";
    } else if (radiusEarths >= 1.5) {
        planetType = "super-earth";
    }

    if (temperature < 200) {
        color = "#c8d8e8";
        atmosphereGlow = "rgba(180, 210, 255, 0.3)";
    } else if (temperature < 500) {
        color = "#8a9aaa";
        atmosphereGlow = "rgba(140, 170, 220, 0.3)";
    } else if (temperature < 799) {
        color = "#a08060";
        atmosphereGlow = "rgba(180, 140, 100, 0.3)";
    } else if (temperature < 1001) {
        color = "#804030";
        emissive = 0.1;
        atmosphereGlow = "rgba(200, 80, 40, 0.35)";
    } else if (temperature < 5001) {
        color = "#703020";
        emissive = 0.3;
        atmosphereGlow = "rgba(220, 60, 20, 0.4)";
    } else if (temperature < 6501) {
        color = "#c0a080";
        emissive = 0.6;
        atmosphereGlow = "rgba(220, 160, 80, 0.45)";
    } else {
        color = "#9090ff";
        emissive = 1;
        atmosphereGlow = "rgba(140, 140, 255, 0.5)";
    }

    if (planetType === "gas-giant") {
        if (temperature < 500) {
            color = "#c8b090";
        } else if (temperature < 1000) {
            color = "#b08060";
        } else if (temperature < 2500) {
            color = "#9a4630";
        } else {
            color = "#703020";
        }
        atmosphereGlow = "rgba(220, 90, 40, 0.35)";
    } else if (planetType === "ice-giant") {
        color = "#5080b0";
        atmosphereGlow = "rgba(80, 130, 200, 0.4)";
    }

    
    scale = Math.min(Math.log(radiusEarths + 1) * 2, 2.0);

    return { color, emissive, scale, atmosphereGlow, planetType };
}

export function buildApiUrl(banList = []) {
    const baseUrl = "https://exoplanetarchive.ipac.caltech.edu/TAP/sync";

    const bannedConditions = [];

    if (banList.discoverymethod?.length > 0) {
        banList.discoverymethod.forEach(v => bannedConditions.push(`discoverymethod!='${v}'`));
    }
    if (banList.hostname?.length > 0) {
        banList.hostname.forEach(v => bannedConditions.push(`hostname!='${v}'`));
    }
    if (banList.disc_year?.length > 0) {
        banList.disc_year.forEach(v => bannedConditions.push(`disc_year!='${v}'`));
    }

    const banFilter = bannedConditions.length > 0 ? `+and+${bannedConditions.join("+and+")}` : "";

    const query = `select+pl_name,hostname,discoverymethod,disc_year,pl_orbper,pl_rade,pl_eqt,pl_bmasse,sy_dist+from+pscomppars+where+pl_eqt+is+not+null+and+pl_rade+is+not+null${banFilter}&format=json&maxrec=300`;
    const nasaUrl = `${baseUrl}?query=${query}`;


    return `https://corsproxy.io/?${encodeURIComponent(nasaUrl)}`;
}