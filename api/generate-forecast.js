import { Redis } from '@upstash/redis';
import { getDailySnapshot, formatDateLabel } from '../src/stations/starseed-weather/lib/astronomy.js';
import { describePhenomena } from '../src/stations/starseed-weather/lib/phenomenaMap.js';
import { pickLocation, pickAuthority, pickSegmentType } from '../src/stations/starseed-weather/lib/broadcastWorld.js';

const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

const GEMINI_MODEL = 'gemini-2.5-flash';
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

const STYLE_EXEMPLARS = [
  'Long distance signal delays continue across multiple districts. Residents may discover that certain feelings are mutual though not necessarily simultaneous. Authorities believe recent timing disturbances may be linked to unauthorized activity near the central clock tower. Repairs are currently underway. This is your Starseed Weather Service, signing off!',
  'As for commuters, residents traveling through Static Valley are advised to avoid Route 11 following multiple reports of phantom hitchhikers. Please drive carefully and remember not every soul you encounter is your responsibility. This is your Starseed Weather Service, signing off!',
  'Elevated static interference has been detected throughout the Liminal District. Under these conditions, genuine affection may be mistaken for politeness while silence may be interpreted as rejection. Experts advise against drawing permanent conclusions until signal quality improves. This is your Starseed Weather Service, signing off!',
];

function getRecentDateLabels(today, count = 3) {
    const labels = [];
    for (let i = 1; i <= count; i++) {
        const d = new Date(today.getTime() - i * 24 * 60 * 60 * 1000);
        labels.push(formatDateLabel(d));
    }
    return labels;
}

async function getRecentHistory(today) {
    const dateLabels = getRecentDateLabels(today);
    const results = await Promise.all(dateLabels.map((label) => redis.get(`forecast:${label}`).catch(() => null))
    );
    return results.filter(Boolean);
}

function formatIngredientBlock(entries, kind) {
    if (!entries || !entries.length) return `No active ${kind}.`;

    return entries
        .map((entry) => {
            const name = kind === 'moon phase'
                ? entry.phase
                : (entry.body ?? `${entry.bodyA} / ${entry.bodyB} (${entry.aspect})`);

            const lines = [`- ${name}`];
            if (entry.themes) lines.push(` themes: ${entry.themes.join(', ')}`);
            if (entry.motifs) lines.push(` motifs: ${entry.motifs.join(', ')}`);
            if (entry.affectedSystems) lines.push(` affected systems: ${entry.affectedSystems.join(', ')}`);

            lines.push(` possible incidents: ${entry.incidents.join(' / ')}`);
            lines.push(` possible effects: ${entry.publicEffects.join(' / ')}`);
            lines.push(` possible advisories: ${entry.advisories.join(' / ')}`);
            return lines.join('\n');
        })
        .join('\n\n');
}


function extractJsonObject(text) {
    const start = text.indexOf('{');
    if (start === -1) throw new Error('No JSON object found in response.');

    let depth = 0;
    for (let i = start; i < text.length; i++) {
        if (text[i] === '{') depth++;
        if (text[i] === '}') depth--;
        if (depth === 0) {
            return text.slice(start, i + 1);
        }
    }
    throw new Error('Unbalanced JSON object in response.');
}

function buildPrompt({ phenomena, setting, history }) {
    const retrogradeBlock = formatIngredientBlock(phenomena.retrogrades, 'retrograde');
    const aspectBlock = formatIngredientBlock(phenomena.aspects, 'aspect');
    const  moonBlock = phenomena.moon ? formatIngredientBlock([phenomena.moon], 'moon phase') : 'No moon data.';

     const historyBlock = history.length
    ? history.map((h, i) => `Segment from ${i + 1} day(s) ago:\n"${h.full_segment}"`).join('\n\n')
    : 'No prior broadcasts on record.';
 
    return `You are the writer for "Starseed Weather Service," a fictional local news segment on DWB Channel 9. The station reports real astrological conditions as if they were mundane civic weather and traffic events, in a deadpan, matter-of-fact register — never winking at the audience, never explaining that this is astrology. Residents experience these conditions as ordinary infrastructure problems, traffic advisories, and public service announcements.
 
        Here are three examples of the station's actual voice:
        
        1. "${STYLE_EXEMPLARS[0]}"
        2. "${STYLE_EXEMPLARS[1]}"
        3. "${STYLE_EXEMPLARS[2]}"
        
        Match this tone exactly: plain, concrete, slightly eerie, delivered as unremarkable civic news. Do not use astrology terminology (no "retrograde," "aspect," "trine," "moon phase," etc.) — translate everything into the station's in-world vocabulary using the ingredients below.
        
        TODAY'S REAL CONDITIONS (translated into broadcast ingredients):
        
        RETROGRADES:
        ${retrogradeBlock}
        
        ASPECTS:
        ${aspectBlock}
        
        MOON:
        ${moonBlock}
        
        TODAY'S SEGMENT SETTING:
        - Segment type: ${setting.segmentType}
        - Location: ${setting.location}
        - Authority: ${setting.authority}
        
        RECENT BROADCASTS (avoid repeating these phrases, sentence structures, or scenario framings, even if today's underlying conditions are similar):
        ${historyBlock}
        
        INSTRUCTIONS:
        - Select and combine 2-4 of the ingredients above into a short, coherent broadcast segment — you do not need to use every ingredient.
        - Write in the exact voice of the three examples.
        - The segment type ("${setting.segmentType}") should shape the framing: "forecast" = weather-style delivery, "traffic" = commuter/route advisory, "advisory" = civic PSA tone, "signing-off" = more direct, intimate closing remarks.
        - Incorporate the location and authority naturally, the way the examples reference "Static Valley," "Route 11," and unnamed "authorities."
        - End with a sign-off only if the segment type calls for it (not every segment needs "This is your Starseed Weather Service, signing off!" — vary this the way real broadcasts do).
        
        Respond ONLY with valid JSON in this exact shape, no markdown fences, no commentary:
        {
        "ticker_line": "one sentence, under 20 words, for a scrolling ticker",
        "full_segment": "the complete 3-5 sentence broadcast segment"
        }`;
}

async function callGemini(prompt) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        throw new Error('GEMINI_API_KEY is not set.');
    }

    const response = await fetch(GEMINI_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-goog-api-key': apiKey,
        },
        body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: {
                temperature: 0.95,
                responseMimeType: 'application/json',
            },
        }),
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Gemini API error (${response.status}): ${errorText}`);
    }

    const data = await response.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
        throw new Error('Gemini response missing expected text content.');
    }

    let parsed;
    try {
        parsed = JSON.parse(text);
    } catch (err) {
        try {
            parsed = JSON.parse(extractJsonObject(text));
        } catch (err2) {
            throw new Error(`Failed to parse Gemini response as JSON: ${text}`);
        }
    }

    if (!parsed.ticker_line || !parsed.full_segment) {
        throw new Error(`Gemini response missing required fields: ${JSON.stringify(parsed)}`);
    }

    return parsed;
}

export async function generateAndCacheForecast() {
    const today = new Date();
    const dateLabel = formatDateLabel(today);
    const snapshot = getDailySnapshot(today);
    const phenomena = describePhenomena(snapshot);
    const setting = {
        location: pickLocation(),
        authority: pickAuthority(),
        segmentType: pickSegmentType(),
    };
    const history = await getRecentHistory(today);
    const prompt = buildPrompt({ phenomena, setting, history });
    const forecast = await callGemini(prompt);
    const record = {
        date: dateLabel,
        ...forecast,
        setting,
        generatedAt: new Date().toISOString(),
    };

    await redis.set(`forecast:${dateLabel}`, record);

    return record;
}

export default async function handler(req, res) {
    try {
       const record = await generateAndCacheForecast();
       return res.status(200).json({ success: true, record });
    } catch (error) {
        console.error('Error generating forecast:', error);
        return res.status(500).json({ error: error.message });
    }
}