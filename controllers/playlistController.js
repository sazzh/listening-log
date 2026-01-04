import handleResponse from "../Utils/responseHandler.js";
import * as playlistModel from "../models/playlistModel.js";
import { logUserEvent } from "../models/userEventModel.js";

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
        await logUserEvent({ userId: userId, entityType: 'playlist', entityId: newPlaylist.playlist_id, eventType: 'create', eventData: { playlistName } });
        return handleResponse(res, 201, 'Playlist created successfully', newPlaylist);
    } catch (err) {
        next(err);
    }
};

export const addSongToPlaylist = async (req, res, next) => {
    const { playlistId, songId } = req.body;
    try {
        const newAssociation = await playlistModel.addSongToPlaylist(playlistId, songId);
        await logUserEvent({ userId: req.user.user_id, entityType: 'playlist', entityId: playlistId, eventType: 'added_to_playlist', eventData: { songId } });
        return handleResponse(res, 201, 'Song added to playlist successfully', newAssociation);
    } catch (err) {
        next(err);
    }
};

export const removeSongFromPlaylist = async (req, res, next) => {
    const { playlistId, songId } = req.body;
    try {
        const removedAssociation = await playlistModel.removeSongFromPlaylist(playlistId, songId);
        if (!removedAssociation) {
            return handleResponse(res, 404, 'Song or Playlist not found or no association exists');
        }
        await logUserEvent({ userId: req.user.user_id, entityType: 'playlist', entityId: playlistId, eventType: 'removed_from_playlist', eventData: { songId } });
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
        await logUserEvent({ userId: req.user.user_id, entityType: 'playlist', entityId: req.params.id, eventType: 'update', eventData: { playlistName, playlistDescription } });
        return handleResponse(res, 200, 'Playlist updated successfully', updatedPlaylist);
    } catch (err) {
        next(err);
    }
};

export const deletePlaylist = async (req, res, next) => {
    const playlistId = req.params.playlistId;
    const { playlistName } = req.body;
    try {
        const deletedPlaylist = await playlistModel.deletePlaylist(playlistId);
        if (!deletedPlaylist) {
            return handleResponse(res, 404, 'Playlist not found');
        }
        await logUserEvent({ userId: req.user.user_id, entityType: 'playlist', entityId: playlistId, eventType: 'delete', eventData: { playlistName } });
        return handleResponse(res, 200, 'Playlist deleted successfully', deletedPlaylist);
    } catch (err) {
        next(err);
    }
};