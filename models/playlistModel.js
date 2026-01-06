import db from '../db.js';

// Get all of a user's playlists from the database
export const getUserPlaylists = async (userId) => {
    const result = await db.query('SELECT * FROM playlists WHERE user_id = $1', [userId]);
    return result.rows;
};

// Get a single playlist by Id from the database
export const getPlaylistById = async (playlistId, userId) => {
    const result = await db.query('SELECT * FROM playlists WHERE playlist_id = $1 AND user_id = $2',
        [playlistId, userId]);
    return result.rows[0];
};

// Create a new playlist in the database
export const createPlaylist = async (playlistName, playlistDescription, userId) => {
    const result = await db.query('INSERT INTO playlists (playlist_name, playlist_description, user_id) VALUES ($1, $2, $3) RETURNING *',
         [playlistName, playlistDescription, userId]);
    return result.rows[0];
};

// Create song playlist association in the database
export const addSongToPlaylist = async (playlistId, songId, userId) => {
    // Ensure that the playlist belongs to the user before adding the song
    const result = await db.query(`INSERT INTO song_playlists (playlist_id, song_id) 
        SELECT p.playlist_id, $2
        FROM playlists p
        WHERE p.playlist_id = $1 AND p.user_id = $3
        RETURNING *;`,
        [playlistId, songId, userId]);
    return result.rows[0];
};

// Remove song from playlist in the database
export const removeSongFromPlaylist = async (playlistId, songId, userId) => {
    // Ensure that the playlist belongs to the user before removing the song
    const result = await db.query(`DELETE FROM song_playlists sp
        USING playlists p
        WHERE sp.playlist_id = p.playlist_id
        AND sp.song_id = $2
        AND p.user_id = $3
        RETURNING *;`,
        [playlistId, songId, userId]);
    return result.rows[0];
};

// Update an existing playlist in the database
export const updatePlaylist = async (playlistId, playlistName, playlistDescription) => {
    const result = await db.query('UPDATE playlists SET playlist_name = $1, playlist_description = $2 WHERE playlist_id = $3 RETURNING *',
        [playlistName, playlistDescription, playlistId]
    );
    return result.rows[0];
};

// Delete a playlist from the database
export const deletePlaylist = async (playlistId) => {
    const result = await db.query('DELETE FROM playlists WHERE playlist_id = $1 RETURNING *',
        [playlistId]);
    return result.rows[0];
};