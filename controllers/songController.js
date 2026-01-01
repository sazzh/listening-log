import handleResponse from "../Utils/responseHandler.js";
import * as songModel from "../models/songModel.js";

export const createSong = async (req, res, next) => {
    const { songName, songLength, dateReleased, trackNumber, albumId, artistIds } = req.body;
    try {
        const newSong = await songModel.createSong(songName, songLength, dateReleased, trackNumber, albumId);
        if (artistIds && artistIds.length > 0) {
            await songModel.addSongArtistAssociation(newSong.song_id, artistIds);
        }
        return handleResponse(res, 201, 'Song created successfully', newSong);
    } catch (err) {
        next(err);
    }
};

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

export const updateSong = async (req, res, next) => {
    const { songName, songLength, dateReleased, trackNumber } = req.body;
    try {
        const updatedSong = await songModel.updateSong(req.params.id, songName, songLength, dateReleased, trackNumber);
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