// Connect to MusicBrainz API to fetch artist, album, and song data
// DOCS: https://musicbrainz.org/doc/MusicBrainz_API

// user-agent string required by MusicBrainz API
const userAgent = 'ListeningLog/1.0 (https://github.com/sazzh/listening-log)';

const ROOT_URL = 'https://musicbrainz.org/ws/2';
const HEADERS = {
    'User-Agent': userAgent,
    'Accept': 'application/json' // all responses in JSON format
};

// core entity types: area, artist, event, genre, instrument, label, place, recording, release, release-group, series, work, url
// non-core entity types: rating, tag, collection

// On each entity resource, you can perform three different GET requests:
//  lookup:   /<ENTITY_TYPE>/<MBID>?inc=<INC>
//  browse:   /<RESULT_ENTITY_TYPE>?<BROWSING_ENTITY_TYPE>=<MBID>&limit=<LIMIT>&offset=<OFFSET>&inc=<INC>
//  search:   /<ENTITY_TYPE>?query=<QUERY>&limit=<LIMIT>&offset=<OFFSET> -- only one available without an MBID
// ... except that browse and search are not implemented for genre entities at this time.

// Search for artists in MusicBrainz by name
export const searchArtist = async (artistName) => {
    try {
        const res = await fetch( `${ROOT_URL}artist?query=${encodeURIComponent(artistName)}`, 
            { headers: HEADERS } );

        checkResponse(res);

        const data = await res.json();
        console.log(data.artists); // check fetched data in console, can remove later
        return data;

    } catch (err) {
        console.error(err);
        throw err;
    }
};

// lookup artist in MusicBrainz by MBID
export const fetchArtistByMBID = async (mbid) => {
    try {
        const res = await fetch(`${ROOT_URL}/artist/${mbid}?inc=aliases`, 
            { headers: HEADERS } );

        checkResponse(res);

        const data = await res.json();
        console.log(data);
        return data;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

searchArtist('DPR IAN');
fetchArtistByMBID('7cc968e5-7ff7-4ec8-9334-c3344bafd383');

const checkResponse = (res) => {
    if (!res.ok) {
        throw new Error(`MusicBrainz API request failed: ${res.status} ${res.statusText}`);
    }
};