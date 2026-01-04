import express from 'express';
import { createSong, deleteSong, getAllSongs, getSongById, updateSong, addSongArtistAssociation, setUserSongPreference } from '../controllers/songController.js';
import protect from '../middleware/auth.js';

const router = express.Router();

router.get('/', getAllSongs);
router.get('/:id', getSongById);
router.post('/', createSong);
router.put('/:id', updateSong);
router.delete('/:id', deleteSong);
router.post('/:id/artists', addSongArtistAssociation);
// protect allows for secure user retrieval. put method allows creation and update
router.put('/:id/preferences', protect, setUserSongPreference);

export default router;