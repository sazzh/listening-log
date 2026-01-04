import handleResponse from "../Utils/responseHandler.js";
import * as playlistModel from "../models/playlistModel.js";

export const getUserPlaylists = async (req, res, next) => {
    const userId = req.user.user_id; // Get user ID from authenticated request
    try {
        const playlists = await playlistModel.getUserPlaylists(userId);
        return handleResponse(res, 200, 'Playlists fetched successfully', playlists);
    } catch (err) {
        next(err);
    }
};

export const getPlaylistById = async (req, res, next) => {
    const playlistId = req.params.playlistId;
    try {
        const playlist = await playlistModel.getPlaylistById(playlistId);
        return handleResponse(res, 200, 'Playlist fetched successfully', playlist);
    } catch (err) {
        next(err);
    }
};

export const createPlaylist = async (req, res, next) => {
    const { playlistName, playlistDescription, userId } = req.body;
    try {
        const newPlaylist = await playlistModel.createPlaylist(playlistName, playlistDescription, userId);
        return handleResponse(res, 201, 'Playlist created successfully', newPlaylist);
    } catch (err) {
        next(err);
    }
};

export const addSongToPlaylist = async (req, res, next) => {
    const { playlistId, songId } = req.body;
    try {
        const newAssociation = await playlistModel.addSongToPlaylist(playlistId, songId);
        return handleResponse(res, 201, 'Song added to playlist successfully', newAssociation);
    } catch (err) {
        next(err);
    }
};

export const removeSongFromPlaylist = async (req, res, next) => {
    const { playlistId, songId } = req.body;
    try {
        const removedAssociation = await playlistModel.removeSongFromPlaylist(playlistId, songId);
        return handleResponse(res, 200, 'Song removed from playlist successfully', removedAssociation);
    }
    catch (err) {
        next(err);
    }
};

export const updatePlaylist = async (req, res, next) => {
    const { playlistName, playlistDescription } = req.body;
    try {
        const updatedPlaylist = await playlistModel.updatePlaylist(req.params.id, playlistName, playlistDescription);
        if (!updatedPlaylist) {
            return handleResponse(res, 404, 'Playlist not found');
        }
        return handleResponse(res, 200, 'Playlist updated successfully', updatedPlaylist);
    } catch (err) {
        next(err);
    }
};

export const deletePlaylist = async (req, res, next) => {
    const playlistId = req.params.playlistId;
    try {
        const deletedPlaylist = await playlistModel.deletePlaylist(playlistId);
        return handleResponse(res, 200, 'Playlist deleted successfully', deletedPlaylist);
    } catch (err) {
        next(err);
    }
};