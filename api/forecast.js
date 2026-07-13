import { Redis } from "@upstash/redis";
import { formatDateLabel } from "../src/stations/starseed-weather/lib/astronomy.js";
import { generateAndCacheForecast } from "./generate-forecast.js";

const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        res.setHeader('Allow', ['GET']);
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const dateLabel = formatDateLabel(new Date());
        let record = await redis.get(`forecast:${dateLabel}`);

        if (!record) {
            record = await generateAndCacheForecast();
        }

        res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400');

        return res.status(200).json(record);
    } catch (error) {
        console.error('Error fetching forecast:', error);
        return res.status(500).json({ error: 'Failed to fetch forecast.' })
    }
}
