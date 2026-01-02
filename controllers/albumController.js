import handleResponse from "../Utils/responseHandler.js";
import * as albumModel from "../models/albumModel.js";
import { addSongAlbumAssociation } from "../models/songModel.js";

export const createAlbum = async (req, res, next) => {
    const { albumName, numOfSongs, dateReleased, albumType, artistId, songs } = req.body;
    try {
        const newAlbum = await albumModel.createAlbum(albumName, numOfSongs, dateReleased, albumType, artistId);
        if (songs && songs.length > 0) {
            for (const song of songs) {
                await addSongAlbumAssociation(song.song_id, [newAlbum.album_id], [song.trackNumber]);
            }
        }
        return handleResponse(res, 201, 'Album created successfully', newAlbum);
    } catch (err) {
        next(err);
    }
};

// req isn't used in this function but is needed in parameter list
export const getAllAlbums = async (req, res, next) => {
    try {
        const albums = await albumModel.getAllAlbums();
        return handleResponse(res, 200, 'Albums fetched successfully', albums);
    } catch (err) {
        next(err);
    }
};

export const getAlbumById = async (req, res, next) => {
    try {
        const album = await albumModel.getAlbumById(req.params.id);
        if (!album) {
            return handleResponse(res, 404, 'Album not found');
        }
        return handleResponse(res, 200, 'Album fetched successfully', album);
    } catch (err) {
        next(err);
    }
};

export const updateAlbum = async (req, res, next) => {
    const { albumName, numOfSongs, dateReleased, albumType } = req.body;
    try {
        const updatedAlbum = await albumModel.updateAlbum(req.params.id, albumName, numOfSongs, dateReleased, albumType);
        if (!updatedAlbum) {
            return handleResponse(res, 404, 'Album not found');
        }
        return handleResponse(res, 200, 'Album updated successfully', updatedAlbum);
    } catch (err) {
        next(err);
    }
};

// Add song to album after creation
export const addSongToAlbum = async (req, res, next) => {
    const { albumId, songId, trackNumber } = req.body;
    try {
        const updatedAlbum = await albumModel.getAlbumById(albumId, songId, trackNumber);
        if (!updatedAlbum) {
            return handleResponse(res, 404, 'Album not found');
        }
        return handleResponse(res, 200, 'Song added to album successfully', updatedAlbum);
    } catch (err) {
        next(err);
    }
};

export const deleteAlbum = async (req, res, next) => {
    try {
        const deletedAlbum = await albumModel.deleteAlbum(req.params.id);
        if (!deletedAlbum) {
            return handleResponse(res, 404, 'Album not found');
        }
        return handleResponse(res, 200, 'Album deleted successfully', deletedAlbum);
    } catch (err) {
        next(err);
    }
};