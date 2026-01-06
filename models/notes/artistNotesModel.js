import db from '../../db.js';

// Create a new note for an artist
export const createArtistNote = async (artistId, userId, noteText) => {
    const result = await db.query('INSERT INTO artistnotes (artist_id, user_id, note_text) VALUES ($1, $2, $3) RETURNING *',
        [artistId, userId, noteText]);
    return result.rows[0];
};

// Get a note by ID from the database
export const getArtistNoteById = async (noteId, userId) => {
    const result = await db.query('SELECT * FROM artistnotes WHERE note_id = $1 AND user_id = $2',
        [noteId, userId]);
    return result.rows[0];
};

// Get all notes for a specific artist by a user from the database
export const getAllNotesForArtist = async (artistId, userId) => {
    const result = await db.query('SELECT * FROM artistnotes WHERE artist_id = $1 AND user_id = $2',
        [artistId, userId]);
    return result.rows;
};

// Get all notes for artists by a user from the database
export const getAllArtistNotesByUser = async (userId) => {
    const result = await db.query('SELECT * FROM artistnotes WHERE user_id = $1',
        [userId]);
    return result.rows;
};

// Update an existing artist note in the database
export const updateArtistNote = async (noteId, noteText, userId) => {
    const result = await db.query('UPDATE artistnotes SET note_text = $1 WHERE note_id = $2 AND user_id = $3 RETURNING *',
        [noteText, noteId, userId]);
    return result.rows[0];
};

// Delete an artist note from the database
export const deleteArtistNote = async (noteId, userId) => {
    const result = await db.query('DELETE FROM artistnotes WHERE note_id = $1 AND user_id = $2 RETURNING *',
        [noteId, userId]);
    return result.rows[0];
};