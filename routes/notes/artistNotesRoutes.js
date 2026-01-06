import express from 'express';
import protect from '../../middleware/auth.js';
import { createArtistNote } from '../../controllers/notes/artistNotesController.js';

const router = express.Router();

// Protected as notes are personal, should not be accessible by others
router.get('/:artistId', protect, ); // get all notes for specfic artist by user 
router.get('/notes/:id', protect, );
router.get('/user/notes', protect, ); // get all notes for all artist entities by user
router.post('/:artistId/notes', protect, createArtistNote); 
router.put('/notes/:id', protect, );
router.delete('/notes/:id', protect, );

export default router;