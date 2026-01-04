import express from 'express';
import { createArtist, deleteArtist, getAllArtists, getArtistById, setUserArtistPreference, updateArtist } from '../controllers/artistController.js';
import protect from '../middleware/auth.js';

const router = express.Router();

router.get('/', getAllArtists);
router.get('/:id', getArtistById);
router.post('/', createArtist);
router.put('/:id', updateArtist);
router.delete('/:id', deleteArtist);
router.put('/:id/preferences', protect, setUserArtistPreference);

export default router;