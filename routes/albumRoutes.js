import express from 'express';
import { createAlbum, deleteAlbum, getAllAlbums, getAlbumById, updateAlbum, addSongToAlbum } from '../controllers/albumController.js';

const router = express.Router();

router.get('/', getAllAlbums);
router.get('/:id', getAlbumById);
router.post('/', createAlbum);
router.put('/:id', updateAlbum);
router.put('/:id', addSongToAlbum);
router.delete('/:id', deleteAlbum);

export default router;