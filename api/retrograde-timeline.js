import { getRetrogradeTimeline } from "../lib/astronomy";

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        res.setHeader('Allow', ['GET']);
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const daysBefore = req.query.daysBefore ? parseInt(req.query.daysBefore, 10) : 30;
        const daysAfter = req.query.daysAfter ? parseInt(req.query.daysAfter, 10) : 60;

        if (Number.isNaN(daysBefore) || Number.isNaN(daysAfter) || daysBefore < 0 || daysAfter < 0) {
            return res.status(400).json({ error: 'daysBefore/daysAfter must be non-negative integers.' });
        }

        const timeline = getRetrogradeTimeline(new Date(), daysBefore, daysAfter);

        res.setHeader('Cache-Control', 's-maxage-21600, stale-while-revalidate=86400');

        return res.status(200).json(timeline);
    } catch (error) {
        console.error('Error computing retrograde timeline', error);
        return res.status(500).json({ error: 'Failed to compute retrograde timeline' });
    }
}