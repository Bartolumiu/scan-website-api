const Author = require('../models/Author');

// Get authors (default limit: 10, max limit: 100, max sum of limit and offset: 1000)
exports.getAuthors = async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 10;
        const offset = parseInt(req.query.offset) || 0;

        if (limit > 100) {
            return res.status(400).json({ message: 'Limit must be 100 or less' }); // 400 Bad Request
        } else if (limit + offset > 1000) {
            return res.status(400).json({ message: 'Sum of limit and offset must be 1000 or less' }); // 400 Bad Request
        }

        // Get authors ordered by ID
        const authors = await Author.find().sort({ id: 1 }).limit(limit).skip(offset);
        
        return res.status(200).json({
            result: 'ok',
            response: 'collection',
            data: authors,
            limit: limit,
            offset: offset,
            total: authors.length
        }); // 200 OK
    } catch (e) {
        console.error('Error getting authors:', e.message); // Log the error

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

// Get author by ID
exports.getAuthorByID = async (req, res) => {
    try {
        const author = await Author.findOne({ id: req.params.id });
        if (!author) {
            return res.status(404).json({
                result: 'error',
                errors: [{
                    id: 'not_found',
                    status: 404,
                    title: 'Author not found',
                    detail: `Author with ID ${req.params.id} not found`
                }]
            }); // 404 Not Found
        }

        return res.status(200).json({
            result: 'ok',
            response: 'object',
            data: author
        }); // 200 OK
    } catch (e) {
        console.error('Error getting author by ID:', e.message); // Log the error

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

// Create author
exports.createAuthor = async (req, res) => {
    try {
        // Check if author already exists
        const authorExists = await Author.findOne({ id: req.body.id });

        if (authorExists) {
            return res.status(409).json({
                result: 'error',
                errors: [{
                    id: 'conflict',
                    status: 409,
                    title: 'Author already exists',
                    detail: `Author with ID ${req.body.id} already exists`
                }]
            }); // 409 Conflict
        }

        // Create and save new author
        req.body.version = 1;
        const author = new Author(req.body);
        await author.save();

        return res.status(201).json({
            result: 'ok',
            response: 'object',
            data: author
        }); // 201 Created
    } catch (e) {
        console.error('Error creating author:', e.message); // Log the error

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

// Update author
exports.updateAuthor = async (req, res) => {
    try {
        const author = await Author.findOne({ id: req.params.id });
        if (!author) {
            return res.status(404).json({
                result: 'error',
                errors: [{
                    id: 'not_found',
                    status: 404,
                    title: 'Author not found',
                    detail: `Author with ID ${req.params.id} not found`
                }]
            }); // 404 Not Found
        }

        // Update version and updatedAt
        author.attributes.version++;
        author.attributes.updatedAt = new Date().toISOString();
        await author.save();

        return res.status(200).json({
            result: 'ok',
            response: 'object',
            data: author
        }); // 200 OK
    } catch (e) {
        console.error('Error updating author:', e.message); // Log the error

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

// Delete author
exports.deleteAuthor = async (req, res) => {
    try {
        const author = await Author.findOneAndDelete({ id: req.params.id });
        if (!author) {
            return res.status(404).json({
                result: 'error',
                errors: [{
                    id: 'not_found',
                    status: 404,
                    title: 'Author not found',
                    detail: `Author with ID ${req.params.id} not found`
                }]
            }); // 404 Not Found
        }

        return res.status(204).send(); // 204 No Content
    } catch (e) {
        console.error('Error deleting author:', e.message); // Log the error

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