import express from 'express';
import { getUserPlaylists, getPlaylistById, createPlaylist, addSongToPlaylist, removeSongFromPlaylist, updatePlaylist, deletePlaylist } from '../controllers/playlistController.js';
import protect from '../middleware/auth.js';

const router = express.Router();

// Majority are protected as playlists are user specific and not accessible app wide
router.get('/', protect, getUserPlaylists);
router.get('/:id', getPlaylistById);
router.post('/', protect, createPlaylist);
router.post('/:id/songs', protect, addSongToPlaylist);
router.delete('/:id/songs/:songId', protect, removeSongFromPlaylist);
router.put('/:id', protect, updatePlaylist);
router.delete('/:id', protect,deletePlaylist);

export default router;