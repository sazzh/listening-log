import express from 'express';
import { createArtist, deleteArtist, getAllArtists, getArtistById, updateArtist } from '../controllers/artistController.js';

const router = express.Router();

router.get('/', getAllArtists);
router.get('/:id', getArtistById);
router.post('/', createArtist);
router.put('/:id', updateArtist);
router.delete('/:id', deleteArtist);

export default router;