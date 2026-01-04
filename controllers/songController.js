import handleResponse from "../Utils/responseHandler.js";
import * as songModel from "../models/songModel.js";
import { logUserEvent } from "../models/userEventModel.js";

export const createSong = async (req, res, next) => {
    const { songName, songLength, dateReleased, artistIds, albumIds, trackNumbers } = req.body;
    try {
        const newSong = await songModel.createSong(songName, songLength, dateReleased);
        // Add artist and album associations
        if (artistIds && artistIds.length > 0) {
            await songModel.addSongArtistAssociation(newSong.song_id, artistIds);
        }
        if (albumIds && albumIds.length > 0) {
            await songModel.addSongAlbumAssociation(newSong.song_id, albumIds, trackNumbers);
        }
        return handleResponse(res, 201, 'Song created successfully', newSong);
    } catch (err) {
        next(err);
    }
};

// req isn't used in this function but is needed in parameter list
export const getAllSongs = async (req, res, next) => {
    try {
        const songs = await songModel.getAllSongs();
        return handleResponse(res, 200, 'Songs fetched successfully', songs);
    } catch (err) {
        next(err);
    }
};

export const getSongById = async (req, res, next) => {
    try {
        const song = await songModel.getSongById(req.params.id);
        if (!song) {
            return handleResponse(res, 404, 'Song not found');
        }
        return handleResponse(res, 200, 'Song fetched successfully', song);
    } catch (err) {
        next(err);
    }
};

export const addSongArtistAssociation = async (req, res, next) => {
    const { songId, artistIds } = req.body;
    try {
        const newAssociation = await songModel.addSongArtistAssociation(songId, artistIds);
        return handleResponse(res, 201, 'Artist(s) associated with song successfully', newAssociation);
    } catch (err) {
        next(err);
    }
};

export const updateSong = async (req, res, next) => {
    const { songName, songLength, dateReleased } = req.body;
    try {
        const updatedSong = await songModel.updateSong(req.params.id, songName, songLength, dateReleased);
        if (!updatedSong) {
            return handleResponse(res, 404, 'Song not found');
        }
        return handleResponse(res, 200, 'Song updated successfully', updatedSong);
    } catch (err) {
        next(err);
    }
};

export const deleteSong = async (req, res, next) => {
    try {
        const deletedSong = await songModel.deleteSong(req.params.id);
        if (!deletedSong) {
            return handleResponse(res, 404, 'Song not found');
        }
        return handleResponse(res, 200, 'Song deleted successfully', deletedSong);
    } catch (err) {
        next(err);
    }
};

export const setUserSongPreference = async (req, res, next) => {
    const { preference, listenedTo } = req.body;
    const songId = req.params.id; // from url parameter
    const userId = req.user.user_id;
    try {
        const userSongPreference = await songModel.setUserSongPreference(userId, songId, preference, listenedTo);
        await logUserEvent({ userId: userId, entityType: 'song', entityId: songId, eventType: 'set_preference', eventData: { preference, listenedTo } });
        return handleResponse(res, 200, 'User song preference set successfully', userSongPreference);
    } catch (err) {
        next(err);
    }
};