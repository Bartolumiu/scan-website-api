const Tag = require('../models/Tag');

// Get tags (default limit: 10, max limit: 100, max sum of limit and offset: 1000)
exports.getTags = async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 10;
        const offset = parseInt(req.query.offset) || 0;

        if (limit > 100) {
            return res.status(400).json({ message: 'Limit must be 100 or less' }); // 400 Bad Request
        } else if (limit + offset > 1000) {
            return res.status(400).json({ message: 'Sum of limit and offset must be 1000 or less' }); // 400 Bad Request
        }

        // Get tags ordered by ID
        const tags = await Tag.find().sort({ id: 1 }).limit(limit).skip(offset);

        return res.status(200).json({
            result: 'ok',
            response: 'collection',
            data: tags,
            limit: limit,
            offset: offset,
            total: tags.length
        }); // 200 OK
    } catch (e) {
        console.error('Error getting tags:', e.message); // Log the error

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

// Get tag by ID
exports.getTagByID = async (req, res) => {
    try {
        const tag = await Tag.findOne({ id: req.params.id });
        if (!tag) {
            return res.status(404).json({
                result: 'error',
                errors: [{
                    id: 'not_found',
                    status: 404,
                    title: 'Tag not found',
                    detail: `Tag with ID ${req.params.id} not found`
                }]
            }); // 404 Not Found
        }
        
        return res.status(200).json({
            result: 'ok',
            response: 'object',
            data: tag
        }); // 200 OK
    } catch (e) {
        console.error('Error getting tag by ID:', e.message); // Log the error

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

// Create tag
exports.createTag = async (req, res) => {
    try {
        // Check if tag already exists
        const tagExists = await Tag.findOne({ id: req.body.id });

        if (tagExists) {
            return res.status(409).json({
                result: 'error',
                errors: [{
                    id: 'conflict',
                    status: 409,
                    title: 'Tag already exists',
                    detail: `Tag with ID ${req.body.id} already exists`
                }]
            }); // 409 Conflict
        }

        // Create and save new tag
        req.body.version = 1;
        const tag = new Tag(req.body);
        await tag.save();

        return res.status(201).json({
            result: 'ok',
            response: 'object',
            data: tag
        }); // 201 Created
    } catch (e) {
        console.error('Error creating tag:', e.message); // Log the error

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

// Update tag
exports.updateTag = async (req, res) => {
    try {
        const tag = await Tag.findOne({ id: req.params.id });
        if (!tag) {
            return res.status(404).json({
                result: 'error',
                errors: [{
                    id: 'not_found',
                    status: 404,
                    title: 'Tag not found',
                    detail: `Tag with ID ${req.params.id} not found`
                }]
            }); // 404 Not Found
        }

        // Update version
        tag.attributes.version++;
        await tag.save();

        return res.status(200).json({
            result: 'ok',
            response: 'object',
            data: tag
        }); // 200 OK
    } catch (e) {
        console.error('Error updating tag:', e.message); // Log the error

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

// Delete tag
exports.deleteTag = async (req, res) => {
    try {
        const tag = await Tag.findOneAndDelete({ id: req.params.id });
        if (!tag) {
            return res.status(404).json({
                result: 'error',
                errors: [{
                    id: 'not_found',
                    status: 404,
                    title: 'Tag not found',
                    detail: `Tag with ID ${req.params.id} not found`
                }]
            }); // 404 Not Found
        }

        return res.status(204).send(); // 204 No Content
    } catch (e) {
        console.error('Error deleting tag:', e.message); // Log the error

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