import express from 'express';
import { getUserPlaylists, getPlaylistById, createPlaylist, addSongToPlaylist, removeSongFromPlaylist, updatePlaylist, deletePlaylist } from '../controllers/playlistController.js';

const router = express.Router();

router.get('/user/:userId', getUserPlaylists); // Playlists only exist per user not app wide
router.get('/:id', getPlaylistById);
router.post('/', createPlaylist);
router.post('/:id/songs', addSongToPlaylist);
router.delete('/:id/songs/:songId', removeSongFromPlaylist);
router.put('/:id', updatePlaylist);
router.delete('/:id', deletePlaylist);

export default router;