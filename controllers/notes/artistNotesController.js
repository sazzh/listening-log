import handleResponse from "../../Utils/responseHandler.js";
import * as artistNotesModel from "../../models/notes/artistNotesModel.js";
import { logUserEvent } from "../../models/userEventModel.js";

// Create a new note for an artist
export const createArtistNote = async (req, res, next) => {
    const { artistId } = req.params;
    const { noteText } = req.body;
    const userId = req.user.user_id;

    try {
        const newNote = await artistNotesModel.createArtistNote(artistId, userId, noteText);
        await logUserEvent({ userId: userId, entityType: 'artistnote', entityId: newNote.note_id, eventType: 'create', eventData: { artistId } });
        return handleResponse(res, 201, 'Artist note created successfully', newNote);
    } catch (err) {
        next(err);
    }
};

// Get a note by ID from the database

// Get all notes for a specific artist by a user from the database

// Get all notes for artists by a user from the database

// Update an existing artist note in the database

// Delete an artist note from the database