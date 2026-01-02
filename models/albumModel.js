import db from '../db.js';

// Get all albums from the database
export const getAllAlbums = async () => {
    const result = await db.query('SELECT * FROM albums');
    return result.rows;
};

// Get a single album by ID from the database
export const getAlbumById = async (albumId) => {
    const result = await db.query('SELECT * FROM albums WHERE album_id = $1', [albumId]);
    return result.rows[0];
};

// Create a new album in the database
export const createAlbum = async (albumName, numOfSongs, dateReleased, albumType, artistId) => {
    const result = await db.query('INSERT INTO albums (album_name, num_of_songs, date_released, album_type, artist_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [albumName, numOfSongs, dateReleased, albumType, artistId]);
    return result.rows[0];
}

// Update an existing album in the database
export const updateAlbum = async (albumId, albumName, numOfSongs, dateReleased, albumType) => {
    const result = await db.query('UPDATE albums SET album_name = $1, num_of_songs = $2, date_released = $3, album_type = $4 WHERE album_id = $5 RETURNING *',
        [albumName, numOfSongs, dateReleased, albumType]);
    return result.rows[0];
}

// Delete an album from the database
export const deleteAlbum = async (albumId) => {
    const result = await db.query('DELETE FROM albums WHERE album_id = $1 RETURNING *', [albumId]);
    return result.rows[0];
}