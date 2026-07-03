const GDELT_BASE_URL = "https://gdeltcloud.com";
const GDELT_EVENTS_PATH = "/api/v2/events";

async function handler(req, res) {
    const apiKey = process.env.GDELT_API_KEY;

    if (!apiKey) {
        return res.status(500).json({ error: "GDELT API key is missing" });
    }

    const allowedParams = ["limit", "date_start", "date_end", "sort", "category", "country"];
    const params = new URLSearchParams();

    for (const key of allowedParams) {
        if (req.query[key] !== undefined) params.set(key, req.query[key]);
    }

    const targetUrl = `${GDELT_BASE_URL}${GDELT_EVENTS_PATH}?${params.toString()}`;
    

    try {
        const gdeltRes = await fetch(targetUrl, {
            headers: { Authorization: `Bearer ${apiKey}` },
        });

        const body = await gdeltRes.text();

        res.status(gdeltRes.status);
        res.setHeader("Content-Type", "application/json");
        return res.send(body);
    } catch (err) {
        return res.status(502).json({ error: "Failed to reach GDELT Cloud", detail: err.message });
    }
    
}

export default handler;