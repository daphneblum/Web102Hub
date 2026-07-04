const GDELT_BASE_URL = "https://gdeltcloud.com";
const GDELT_EVENTS_PATH = "/api/v2/events";

const ALLOWED_CATEGORIES = ["Protests", "Battles", "Explosions/Remote violence", "Health"];

const GDELT_CATEGORY_PARAM = {
    Health: "HEALTH",
};
function toGdeltCategoryParam(category) {
    return GDELT_CATEGORY_PARAM[category] || category;
}

function processItem(item) {
    let currentCategory = item.category || "General";
    if (currentCategory.toLowerCase() === "health") {
        currentCategory = "Health";
    }

    return {
        id: item.id,
        url: item.top_articles?.[0]?.url || item.url || null,
        title: item.title || "Global Conflict Event",
        country: item.geo?.country || item.geo?.location || "Global Sector",
        location: item.geo?.location || null,
        date: item.event_date || new Date().toISOString().slice(0, 10),
        category: currentCategory,
        subcategory: item.subcategory || null,
        lat: parseFloat(item.geo?.latitude ?? 0),
        lng: parseFloat(item.geo?.longitude ?? 0),
        sig: item.metrics?.significance ?? 0.2,
        goldstein: item.metrics?.goldstein_scale ?? null,
        hasFatalities: item.has_fatalities ?? false,
    };
}

async function handler(req, res) {
    const apiKey = process.env.GDELT_API_KEY;
    if (!apiKey) {
        return res.status(500).json({ error: "GDELT API key is missing" });
    }

    // COST: this spends one query unit per category = 4 total per load.
    const allowedParams = ["limit", "date_start", "date_end", "sort", "country"];
    const baseParams = new URLSearchParams();
    for (const key of allowedParams) {
        if (req.query[key] !== undefined) baseParams.set(key, req.query[key]);
    }

    try {
        const requests = ALLOWED_CATEGORIES.map((category) => {
            const params = new URLSearchParams(baseParams);
            params.set("category", toGdeltCategoryParam(category));
            const url = `${GDELT_BASE_URL}${GDELT_EVENTS_PATH}?${params.toString()}`;
            return fetch(url, { headers: { Authorization: `Bearer ${apiKey}` } })
                .then((r) => r.json().then((body) => ({ status: r.status, ok: r.ok, body, category })));
        });

        const results = await Promise.all(requests);

        console.log("=== GDELT DEBUG (per-category) ===");
        results.forEach((r) => {
            console.log(`${r.category}: status ${r.status}, ${(r.body.data || []).length} events`);
            if (!r.ok) console.log(`  -> error detail:`, JSON.stringify(r.body));
        });
        console.log("===================================");

        const merged = results
            .filter((r) => r.ok)
            .flatMap((r) => (r.body.data || []).map(processItem));

        const failedCategories = results.filter((r) => !r.ok).map((r) => r.category);

        res.status(200);
        res.setHeader("Content-Type", "application/json");
        return res.send({ data: merged, failedCategories });
    } catch (err) {
        return res.status(502).json({ error: "Failed to reach GDELT Cloud", detail: err.message });
    }
}

export default handler;