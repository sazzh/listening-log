import { createArtistService, getAllArtistsService, getArtistByIdService, updateArtistService, deleteArtistService } from "../models/artistModel.js";
import handleResponse from "../Utils/responseHandler.js";

export const createArtist = async (req, res, next) => {
    const { artistName, artistType, artistCountry, artistDisambiguation, isDisbanded } = req.body;
    try {
        const newArtist = await createArtistService(artistName, artistType, artistCountry, artistDisambiguation, isDisbanded);
        return handleResponse(res, 201, 'Artist created successfully', newArtist);
    } catch (err) {
        next(err);
    }
};

export const getAllArtists = async (req, res, next) => {
    try {
        const artists = await getAllArtistsService();
        return handleResponse(res, 200, 'Artists fetched successfully', artists);
    } catch (err) {
        next(err);
    }
};

export const getArtistById = async (req, res, next) => {
    try {
        const artist = await getArtistByIdService(req.params.id);
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
        const updatedArtist = await updateArtistService(req.params.id, artistName, artistType, artistCountry, artistDisambiguation, isDisbanded);
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
        const deletedArtist = await deleteArtistService(req.params.id);
        if (!deletedArtist) {
            return handleResponse(res, 404, 'Artist not found');
        }
        return handleResponse(res, 200, 'Artist deleted successfully', deletedArtist);
    } catch (err) {
        next(err);
    }
};