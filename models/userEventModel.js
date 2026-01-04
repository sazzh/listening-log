import db from '../db.js';

// Create a user event entry in the database
// method called when creating/updating playlists/notes as well as setting song/artist preferences
export const logUserEvent = async ({ userId, entityType, entityId, eventType, eventData = {} }) => {
    const result = await db.query('INSERT INTO userevents (user_id, entity_type, entity_id, event_type, event_data) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [userId, entityType, entityId, eventType, eventData]);
    return result.rows[0];
};

// Get all user events from the database
export const getAllUserEvents = async (userId) => {
    const result = await db.query('SELECT * FROM userevents WHERE user_id = $1', [userId]);
    return result.rows;
};

// Get a users events by entity type from the database
// song, artist, playlist, note
export const getUserEventsByEntityType = async (userId, entityType) => {
    const result = await db.query('SELECT * FROM userevents WHERE user_id = $1 AND entity_type = $2', [userId, entityType]);
    return result.rows;
};

// Delete a user event from the database
export const deleteUserEvent = async (eventId) => {
    const result = await db.query('DELETE FROM userevents WHERE event_id = $1 RETURNING *', [eventId]);
    return result.rows[0];
};

// Cannot update user events as they are history logs