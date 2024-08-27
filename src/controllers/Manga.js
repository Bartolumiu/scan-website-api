const Manga = require('../models/Manga');

// Get mangas (default limit: 10, max limit: 100, max sum of limit and offset: 1000)
exports.getMangas = async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 10;
        const offset = parseInt(req.query.offset) || 0;

        if (limit > 100) {
            return res.status(400).json({ message: 'Limit must be 100 or less' }); // 400 Bad Request
        } else if (limit + offset > 1000) {
            return res.status(400).json({ message: 'Sum of limit and offset must be 1000 or less' }); // 400 Bad Request
        }

        // Get mangas ordered by ID
        const mangas = await Manga.find().sort({ id: 1 }).limit(limit).skip(offset);

        return res.status(200).json({
            result: 'ok',
            response: 'collection',
            data: mangas,
            limit: limit,
            offset: offset,
            total: mangas.length
        }); // 200 OK
    } catch (e) {
        console.error('Error getting mangas:', e.message); // Log the error

        return res.status(500).json({
            result: 'error',
            errors: [{
                id: 'internal_server_error',
                status: 500,
                title: 'Internal Server Error',
                detail: e.message
            }]
        }); // 500 Internal Server Error
    }
};

// Get manga by ID
exports.getMangaByID = async (req, res) => {
    try {
        const manga = await Manga.findOne({ id: req.params.id });
        if (!manga) {
            return res.status(404).json({
                result: 'error',
                errors: [{
                    id: 'not_found',
                    status: 404,
                    title: 'Manga not found',
                    detail: `Manga with ID ${req.params.id} not found`
                }]
            }); // 404 Not Found
        }
        
        return res.status(200).json({
            result: 'ok',
            response: 'object',
            data: manga
        }); // 200 OK
    } catch (e) {
        console.error('Error getting manga by ID:', e.message); // Log the error

        return res.status(500).json({
            result: 'error',
            errors: [{
                id: 'internal_server_error',
                status: 500,
                title: 'Internal Server Error',
                detail: e.message
            }]
        }); // 500 Internal Server Error
    }
};

// Create manga
exports.createManga = async (req, res) => {
    try {
        // Check if manga already exists
        const mangaExists = await Manga.findOne({ id: req.body.id });

        if (mangaExists) {
            return res.status(409).json({
                result: 'error',
                errors: [{
                    id: 'conflict',
                    status: 409,
                    title: 'Manga already exists',
                    detail: `Manga with ID ${req.body.id} already exists`
                }]
            }); // 409 Conflict
        }

        // Create manga
        req.body.version = 1;
        const manga = new Manga(req.body);
        await manga.save();

        return res.status(201).json({
            result: 'ok',
            response: 'object',
            data: manga
        }); // 201 Created
    } catch (e) {
        console.error('Error creating manga:', e.message); // Log the error

        return res.status(500).json({
            result: 'error',
            errors: [{
                id: 'internal_server_error',
                status: 500,
                title: 'Internal Server Error',
                detail: e.message
            }]
        }); // 500 Internal Server Error
    }
};

// Update manga
exports.updateManga = async (req, res) => {
    try {
        const manga = await Manga.findOne({ id: req.params.id });
        if (!manga) {
            return res.status(404).json({
                result: 'error',
                errors: [{
                    id: 'not_found',
                    status: 404,
                    title: 'Manga not found',
                    detail: `Manga with ID ${req.params.id} not found`
                }]
            }); // 404 Not Found
        }

        // Update version and updatedAt
        manga.attributes.version++;
        manga.attributes.updatedAt = new Date().toISOString();
        await manga.save();

        return res.status(200).json({
            result: 'ok',
            response: 'object',
            data: manga
        }); // 200 OK
    } catch (e) {
        console.error('Error updating manga:', e.message); // Log the error

        return res.status(500).json({
            result: 'error',
            errors: [{
                id: 'internal_server_error',
                status: 500,
                title: 'Internal Server Error',
                detail: e.message
            }]
        }); // 500 Internal Server Error
    }
};

// Delete manga
exports.deleteManga = async (req, res) => {
    try {
        const manga = await Manga.findOneAndDelete({ id: req.params.id });
        if (!manga) {
            return res.status(404).json({
                result: 'error',
                errors: [{
                    id: 'not_found',
                    status: 404,
                    title: 'Manga not found',
                    detail: `Manga with ID ${req.params.id} not found`
                }]
            }); // 404 Not Found
        }

        return res.status(204).send(); // 204 No Content
    } catch (e) {
        console.error('Error deleting manga:', e.message); // Log the error

        return res.status(500).json({
            result: 'error',
            errors: [{
                id: 'internal_server_error',
                status: 500,
                title: 'Internal Server Error',
                detail: e.message
            }]
        }); // 500 Internal Server Error
    }
};