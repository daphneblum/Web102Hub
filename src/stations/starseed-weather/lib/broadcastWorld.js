//  The fictional setting for Starseed Weather Service broadcasts —
//  place names, civic authorities, and segment-type rotation.
//  
//   Deliberately kept SEPARATE from phenomenaMap.js: that file only
//   contains content directly derived from real astrological data
//   (a retrograde, an aspect, a moon phase). This file is pure
//   world-building — it doesn't correspond to anything astronomical,
//   it just gives the generator a consistent fictional place to set
//   each day's broadcast, and a way to vary WHICH KIND of segment is
//   being delivered even when the underlying astrology repeats.


export const LOCATIONS = {
  districts: [
    'the Liminal District',
    'Static Valley',
    'the Afterimage District',
    'North Meridian',
    'the Glass Quarter',
    'the Low-Orbit Borough',
    'Memory Ward',
    'the Pale Electric District',
    'Satellite Row',
    'the Nocturne Sector',
  ],
  transit: [
    'Halo Highway',
    'Route 11',
    'Orbit Line 6',
    'the Meridian Loop',
    'Exit 22B',
    'the lunar underpass',
    'the Blue Comet Express',
    'the westbound dreamway',
    'Terminal Echo',
  ],
  infrastructure: [
    'the central clock tower',
    'the municipal observatory',
    'the nocturnal switchboard',
    'Relay Tower C',
    'the Department of Celestial Timing',
    'the atmospheric records office',
    'the orbital warning grid',
    'the public memory archive',
  ],
  natural: [
    'the phosphorescent marsh',
    'the Mirror Coast',
    'Afterglow Reservoir',
    'the artificial moon gardens',
    'the magnetized dunes',
    'the cloud reservoir',
  ],
};

export const AUTHORITIES = [
  'the Department of Celestial Timing',
  'the Municipal Signal Authority',
  'the Bureau of Emotional Meteorology',
  'the Office of Atmospheric Correspondence',
  'the Interdistrict Transit Commission',
  'the Observatory Public Safety Division',
];

// Real local news covers the same slow-moving weather system for a
// week without sounding repetitive by changing the SEGMENT, not the
// subject. Same principle here — rotate which "beat" the station is
// reporting from, independent of which astrology is actually active.
export const SEGMENT_TYPES = [
  'forecast', // standard weather-style delivery — your original template
  'traffic', // "residents traveling through X are advised..."
  'advisory', // civic PSA tone — "authorities recommend..."
  'signing-off', // direct address, closing remarks, more intimate register
];

function pickRandom(items = []) {
  if (!items.length) return null;
  return items[Math.floor(Math.random() * items.length)];
}


export function pickLocation() {
  const groups = Object.values(LOCATIONS);
  return pickRandom(pickRandom(groups));
}

export function pickAuthority() {
  return pickRandom(AUTHORITIES);
}

export function pickSegmentType() {
  return pickRandom(SEGMENT_TYPES);
}