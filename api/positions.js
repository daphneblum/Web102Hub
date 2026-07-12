import { getDailySnapshot } from '../src/stations/starseed-weather/lib/astronomy.js';

async function handler(req, res) {
    if (req.method !== 'GET') {
        res.setHeader('Allow', ['GET']);
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { date } = req.query;
        let targetDate = new Date();

        if (date) {
            const parsed = new Date(date);
            if (Number.isNaN(parsed.getTime())) {
                return res.status(400).json({ error: 'Invalid date format. Use YYYY-MM-DD.' });
            }
            targetDate = parsed;
        }
        const snapshot = getDailySnapshot(targetDate);
        res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400');
        return res.status(200).json(snapshot);
    } catch (error) {
        console.error('Error computing daily snapshot: ', error);
        return res.status(500).json({ error: 'Failed to compute planetary positions.' });
    }
}





export default handler;