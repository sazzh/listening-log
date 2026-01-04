import handleResponse from "../Utils/responseHandler.js";
import * as artistModel from "../models/artistModel.js";
import { logUserEvent } from "../models/userEventModel.js";

export const createArtist = async (req, res, next) => {
    const { artistName, artistType, artistCountry, artistDisambiguation, isDisbanded } = req.body;
    try {
        const newArtist = await artistModel.createArtist(artistName, artistType, artistCountry, artistDisambiguation, isDisbanded);
        return handleResponse(res, 201, 'Artist created successfully', newArtist);
    } catch (err) {
        next(err);
    }
};

// req isn't used in this function but is needed in parameter list
export const getAllArtists = async (req, res, next) => {
    try {
        const artists = await artistModel.getAllArtists();
        return handleResponse(res, 200, 'Artists fetched successfully', artists);
    } catch (err) {
        next(err);
    }
};

export const getArtistById = async (req, res, next) => {
    try {
        const artist = await artistModel.getArtistById(req.params.id);
        if (!artist) {
            return handleResponse(res, 404, 'Artist not found');
        }
        return handleResponse(res, 200, 'Artist fetched successfully', artist);
    } catch (err) {
        next(err);
    }
};

export const updateArtist = async (req, res, next) => {
    const { artistName, artistType, artistCountry, artistDisambiguation, isDisbanded } = req.body;
    try {
        const updatedArtist = await artistModel.updateArtist(req.params.id, artistName, artistType, artistCountry, artistDisambiguation, isDisbanded);
        if (!updatedArtist) {
            return handleResponse(res, 404, 'Artist not found');
        }
        return handleResponse(res, 200, 'Artist updated successfully', updatedArtist);
    } catch (err) {
        next(err);
    }
};

export const deleteArtist = async (req, res, next) => {
    try {
        const deletedArtist = await artistModel.deleteArtist(req.params.id);
        if (!deletedArtist) {
            return handleResponse(res, 404, 'Artist not found');
        }
        return handleResponse(res, 200, 'Artist deleted successfully', deletedArtist);
    } catch (err) {
        next(err);
    }
};

export const setUserArtistPreference = async (req, res, next) => {
    const { preference } = req.body;
    const artistId = req.params.id;
    const userId = req.user.user_id;
    try {
        const userArtistPreference = await artistModel.setUserArtistPreference(userId, artistId, preference);
        await logUserEvent({ userId: userId, entityType: 'artist', entityId: artistId, eventType: 'set_preference', eventData: { preference } });
        return handleResponse(res, 200, 'User artist preference set successfully', userArtistPreference);
    } catch (err) {
        next(err);
    }
};