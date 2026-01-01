import db from '../db.js';

// Get all artists from the database
export const getAllArtists = async () => {
    const result = await db.query('SELECT * FROM artists');
    return result.rows;
};

// Get a single artist by ID from the database
export const getArtistById = async (artistId) => {
    const result = await db.query('SELECT * FROM artists WHERE artist_id = $1', [artistId]);
    return result.rows[0];
};

// Create a new artist in the database
export const createArtist = async (artistName, artistType, artistCountry, artistDisambiguation, isDisbanded) => {
    const result = await db.query('INSERT INTO artists ( artist_name, artist_type, artist_country, artist_disambiguation, is_disbanded ) VALUES ( $1, $2, $3, $4, $5 ) RETURNING *', 
        [artistName, artistType, artistCountry, artistDisambiguation, isDisbanded]);
    return result.rows[0];
}

// Update an existing artist in the database
export const updateArtist = async (artistId, artistName, artistType, artistCountry, artistDisambiguation, isDisbanded) => {
    const result = await db.query('UPDATE artists SET artist_name = $1, artist_type = $2, artist_country = $3, artist_disambiguation = $4, is_disbanded = $5 WHERE artist_id = $6 RETURNING *',
        [artistName, artistType, artistCountry, artistDisambiguation, isDisbanded, artistId]
    );
    return result.rows[0];
}

// Delete an artist from the database
export const deleteArtist = async (artistId) => {
    const result = await db.query('DELETE FROM artists WHERE artist_id = $1 RETURNING *', [artistId]);
    return result.rows[0];
}
