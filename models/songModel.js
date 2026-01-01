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
export const createSong = async (songName, songLength, dateReleased, trackNumber, albumId) => {
    const result = await db.query('INSERT INTO songs ( song_name, song_length, date_released, track_number, album_id ) VALUES ( $1, $2, $3, $4, $5 ) RETURNING *', 
        [songName, songLength, dateReleased, trackNumber, albumId]);
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

// Update an existing song in the database
export const updateSong = async (songId, songName, songLength, dateReleased, trackNumber) => {
    const result = await db.query('UPDATE songs SET song_name = $1, song_length = $2, date_released = $3, track_number = $4 WHERE song_id = $5 RETURNING *',
        [songName, songLength, dateReleased, trackNumber, songId]
    );
    return result.rows[0];
}

// Delete an song from the database
export const deleteSong = async (songId) => {
    const result = await db.query('DELETE FROM songs WHERE song_id = $1 RETURNING *', [songId]);
    return result.rows[0];
}
