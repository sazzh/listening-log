import db from '../db.js';

// Get all songs from the database
export const getAllSongs = async () => {
    const result = await db.query('SELECT * FROM songs');
    return result.rows;
};

// Get a single song by ID from the database
export const getSongById = async (songId) => {
    const result = await db.query('SELECT * FROM songs WHERE song_id = $1', [songId]);
    return result.rows[0];
};

// Create a new song in the database
export const createSong = async (songName, songLength, dateReleased) => {
    const result = await db.query('INSERT INTO songs ( song_name, song_length, date_released ) VALUES ( $1, $2, $3 ) RETURNING *', 
        [songName, songLength, dateReleased]);
    return result.rows[0];
}

// Add association between song and artist in the database
// Can be one or multiple artists associated with a song - for loop as number of artists is usually small number 
export const addSongArtistAssociation = async (songId, artistIds) => {
    const insertedRows = [];
    for (const artistId of artistIds) {
        const result = await db.query('INSERT INTO song_artists (song_id, artist_id) VALUES ($1, $2) RETURNING *',
            [songId, artistId]
        );
        insertedRows.push(result.rows[0]);
    }
    return insertedRows;
}

// Add association between song and album in the database
export const addSongAlbumAssociation = async (songId, albumIds, trackNumbers = []) => {
    // dynamic format of (song_id, album_id, track_number) VALUES ($1, $2, $3), ($1, $4, $5), ...
    const values = albumIds.map((albumId, index) => `($1, $${index * 2 + 2}, $${index * 2 + 3})`).join(', ');
    const params = [songId];
    albumIds.forEach((id, index) => {
        params.push(id);
        params.push(trackNumbers[index] || null);
    });

    const query = `INSERT INTO song_albums (song_id, album_id, track_number) VALUES ${values} RETURNING *`;
    const result = await db.query(query, params);
    return result.rows;
};

// Update an existing song in the database
export const updateSong = async (songId, songName, songLength, dateReleased) => {
    const result = await db.query('UPDATE songs SET song_name = $1, song_length = $2, date_released = $3 WHERE song_id = $4 RETURNING *',
        [songName, songLength, dateReleased, songId]
    );
    return result.rows[0];
}

// Delete an song from the database
export const deleteSong = async (songId) => {
    const result = await db.query('DELETE FROM songs WHERE song_id = $1 RETURNING *', [songId]);
    return result.rows[0];
}

// Set a user's preference for a song in the database
// On conflict of userId and songId, update existing record
export const setUserSongPreference = async (userId, songId, preference, listenedTo) => {
    const result = await db.query('INSERT INTO user_song_preferences (user_id, song_id, preference, listened_to) VALUES ($1, $2, $3, $4) ON CONFLICT (user_id, song_id) DO UPDATE SET preference = EXCLUDED.preference, listened_to = EXCLUDED.listened_to RETURNING *',
        [userId, songId, preference, listenedTo]
    );
    return result.rows[0];
}