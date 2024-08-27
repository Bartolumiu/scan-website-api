const Cover = require('../models/Cover');

// Get covers (default limit: 10, max limit: 100, max sum of limit and offset: 1000)
exports.getCovers = async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 10;
        const offset = parseInt(req.query.offset) || 0;

        if (limit > 100) {
            return res.status(400).json({ message: 'Limit must be 100 or less' }); // 400 Bad Request
        } else if (limit + offset > 1000) {
            return res.status(400).json({ message: 'Sum of limit and offset must be 1000 or less' }); // 400 Bad Request
        }

        // Get covers ordered by ID
        const covers = await Cover.find().sort({ id: 1 }).limit(limit).skip(offset);

        return res.status(200).json({
            result: 'ok',
            response: 'collection',
            data: covers,
            limit: limit,
            offset: offset,
            total: covers.length
        }); // 200 OK
    } catch (e) {
        console.error('Error getting covers:', e.message); // Log the error

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

// Get cover by ID
exports.getCoverByID = async (req, res) => {
    try {
        const cover = await Cover.findOne({ id: req.params.id });
        if (!cover) {
            return res.status(404).json({
                result: 'error',
                errors: [{
                    id: 'not_found',
                    status: 404,
                    title: 'Cover not found',
                    detail: `Cover with ID ${req.params.id} not found`
                }]
            }); // 404 Not Found
        }
        
        return res.status(200).json({
            result: 'ok',
            response: 'object',
            data: cover
        }); // 200 OK
    } catch (e) {
        console.error('Error getting cover by ID:', e.message); // Log the error

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

// Create cover
exports.createCover = async (req, res) => {
    try {
        // Check if cover already exists
        const coverExists = await Cover.findOne({ id: req.body.id });

        if (coverExists) {
            return res.status(409).json({
                result: 'error',
                errors: [{
                    id: 'conflict',
                    status: 409,
                    title: 'Cover already exists',
                    detail: `Cover with ID ${req.body.id} already exists`
                }]
            }); // 409 Conflict
        }

        // Create and save new cover
        req.body.version = 1;
        const cover = new Cover(req.body);
        await cover.save();

        return res.status(201).json({
            result: 'ok',
            response: 'object',
            data: cover
        }); // 201 Created
    } catch (e) {
        console.error('Error creating cover:', e.message); // Log the error

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

// Update cover
exports.updateCover = async (req, res) => {
    try {
        const cover = await Cover.findOne({ id: req.params.id });
        if (!cover) {
            return res.status(404).json({
                result: 'error',
                errors: [{
                    id: 'not_found',
                    status: 404,
                    title: 'Cover not found',
                    detail: `Cover with ID ${req.params.id} not found`
                }]
            }); // 404 Not Found
        }

        // Update version and updatedAt
        cover.attributes.version++;
        cover.attributes.updatedAt = new Date().toISOString();
        await cover.save();
        
        return res.status(200).json({
            result: 'ok',
            response: 'object',
            data: cover
        }); // 200 OK
    } catch (e) {
        console.error('Error updating cover:', e.message); // Log the error

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

// Delete cover
exports.deleteCover = async (req, res) => {
    try {
        const cover = await Cover.findOneAndDelete({ id: req.params.id });
        if (!cover) {
            return res.status(404).json({
                result: 'error',
                errors: [{
                    id: 'not_found',
                    status: 404,
                    title: 'Cover not found',
                    detail: `Cover with ID ${req.params.id} not found`
                }]
            }); // 404 Not Found
        }

        return res.status(204).send(); // 204 No Content
    } catch (e) {
        console.error('Error deleting cover:', e.message); // Log the error

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