import * as Astronomy from 'astronomy-engine';
import { radToDeg } from 'three/src/math/MathUtils.js';
import { degToRad } from 'three/src/math/MathUtils.js';



const ZODIAC_SIGN = [
    'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 
    'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces',
];

const ENGINE_BODIES = [
    'Sun', 'Moon', 'Mercury', 'Venus', 'Mars', 'Jupiter', 'Saturn', 
    'Uranus', 'Neptune', 'Pluto', 
];

const ASPECTS = [
    {name: 'conjunction', angle: 0, orb: 6},
    {name: 'sextile', angle: 60, orb: 4},
    {name: 'square', angle: 90, orb: 5},
    {name: 'trine', angle: 120, orb: 5},
    {name: 'opposition', angle: 180, orb: 6},
];

const CHIRON_ELEMENTS = {
    epoch: 2451545.0,
    a: 13.7074,
    e: 0.38258,
    i: 6.9308,
    omega: 339.397,
    Omega: 209.284,
    M0: 137.113,
    period: 50.7659,
}

function normalizeDegrees(deg) {
    let d = deg % 360;
    if (d < 0) d += 360;
    return d;
}

function longitudeToSign(longitude) {
    const lon = normalizeDegrees(longitude);
    const signIndex = Math.floor(lon / 30);
    const degreeInSign = lon - signIndex * 30;
    return {
        sign: ZODIAC_SIGN[signIndex],
        degree: Math.round(degreeInSign * 100) / 100,
    };
}

function angularSeparation(lonA, lonB) {
    let diff = Math.abs(normalizeDegrees(lonA) - normalizeDegrees(lonB));
    if (diff > 180) diff = 360 - diff;
    return diff;
}

function solveKepler(M, e, tolerance = 1e-6) {
    let E = M;
    for (let i = 0; i < 50; i++) {
        const dE = (E - e * Math.sin(E) - M) / (1 - e * Math.cos(E));
        E -= dE;
        if (Math.abs(dE) < tolerance) break;
    }
    return E;
}

function chironLongitude(date) {
    const JD = Astronomy.MakeTime(date).tt / 1 + 2451545.0;
    const daysSinceEpoch = JD - CHIRON_ELEMENTS.epoch;
    const periodDays = CHIRON_ELEMENTS.period * 365.25;

    const meanMotion = 360 / periodDays;
    const M = degToRad(normalizeDegrees(CHIRON_ELEMENTS.M0 + meanMotion * daysSinceEpoch));
    const e = CHIRON_ELEMENTS.e;
    const E = solveKepler(M, e);

    const nu = 2 * Math.atan2(
    Math.sqrt(1 + e) * Math.sin(E / 2),
    Math.sqrt(1 - e) * Math.cos(E / 2)
    );

    const omega = degToRad(CHIRON_ELEMENTS.omega);
    const Omega = degToRad(CHIRON_ELEMENTS.Omega)
    const i = degToRad(CHIRON_ELEMENTS.i);

    const u = nu + omega;

    const x = Math.cos(u) + Math.cos(Omega) - Math.sin(u) * Math.sin(Omega) * Math.cos(i);
    const y = Math.cos(u) + Math.sin(Omega) - Math.sin(u) * Math.cos(Omega) * Math.cos(i);

    const longitude = radToDeg(Math.atan2(y, x));
    return normalizeDegrees(longitude);
}

function degToRad(d) {
    return (d * Math.PI) / 180;
}

function radToDeg(r) {
    return (r * 180) / Math.PI;
}

function getLongitude(body, date) {
    if (body == 'Chiron') return chironLongitude(date);

    const time = Astronomy.MakeTime(date);
    const vec = Astronomy.GeoVector(body, time, true);
    const ecliptic = Astronomy.Ecliptic(vec);
    return normalizeDegrees(ecliptic.elon);
}

function isRetrograde(body, date) {
    const oneDayMs = 24 * 60 * 60 * 1000;
    const lonToday = getLongitude(body, date);
    const lonTomorrow = getLongitude(body, new Date(date.getTime() + oneDayMs));

    let delta = lonTomorrow - lonToday;
    if (delta > 180) delta -= 360;
    if (delta < -180) delta += 360;

    return delta < 0;
}

const MOON_PHASE_NAMES = [
    {max: 6, name: 'New Moon'},
    {max: 84, name: 'Waxing Crescent'},
    {max: 96, name: 'First Quarter'},
    {max: 174, name: 'Waxing Gibbous'},
    {max: 186, name: 'Full Moon'},
    {max: 264, name: 'Waning Gibbous'},
    {max: 276, name: 'Last Quarter'},
    {max: 360, name: 'Waning Crescent'},
];

function getMoonPhase(date) {
    const angle = Astronomy.MoonPhase(date);
    const phase = MOON_PHASE_NAMES.find((p) => angle <= p.max) || MOON_PHASE_NAMES[MOON_PHASE_NAMES.lenght - 1];
    return { angle: Math.round(angle * 100) / 100, name: phase.name };
}

export function getPlanetPositions(date = new Date()) {
    const bodies = [...ENGINE_BODIES, 'Chiron'];

    return bodies.map((body) => {
        const longitude = getLongitude(body, date);
        const { sign, degree } = longitudeToSign(longitude);
        const retrograde = body === 'Sun' || body === 'Moon' ? false : isRetrograde(body, date);

        return { body, longitude, sign, degree, retrograde };
    });
}

export function getAspects(positions) {
    const aspects = [];

    for (let i = 0; i < positions.length; i++) {
        for (let j = i + 1; j < positions.length; j++) {
            const a = positions[i];
            const b = positions[j];
            const separation = angularSeparation(a.longitude, b.longitude);

            for (const aspectDef of ASPECTS) {
                const orb = Math.abs(separation - aspectDef.angle);
                if (orb <= aspectDef.orb) {
                    aspects.push({
                        bodyA: a.body,
                        bodyB: b.body,
                        aspect: aspectDef.name,
                        exactAngle: aspectDef.angle,
                        orb: Math.round(orb * 100) / 100,
                        tightness: 1 - orb / aspectDef.orb,
                    });
                    break;
                }
            }
        }
    }

    return aspects.sort((a, b) => b.tightness - a.tightness);
}

export function getNotableFact({ aspects, retrogradeBodies }) {
    const parts = [];

    if (aspects.length > 0) {
        const tightest = aspects[0];
        parts.push(
            `${tightest.bodyA} and ${tightest.bodyB} are in the tightest aspect right now - ` + `an almost exact ${tightest.aspect} (${tightest.orb}° orb).`
        );
    }

    if (retrogradeBodies.length > 0) {
        const list = retrogradeBodies.join(', ');
        parts.push(`${retrogradeBodies.length} ${retrogradeBodies.length === 1 ? 'body is ' : 'bodies are'} currently retrograde: ${list}.`);
    } else {
        parts.push('No bodies are currently retrograde.');
    }
    return parts.join(' ');
}

export function getDailySnapshot(date = new Date()) {
    const positions = getPlanetPositions(date);
    const aspects = getAspects(position);
    const moon = getMoonPhase(date);
    const retrogradeBodies = positions.filter((p) => p.retrograde).map((p) => p.body);
    const notableFact = getNotableFact({ aspects, retrogradeBodies });

    return {
        date: date.toISOString().slice(0, 10),
        positions,
        aspects,
        moon,
        retrogradeBodies,
        notableFact,
    };
}

