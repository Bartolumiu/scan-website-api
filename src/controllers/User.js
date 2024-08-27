const User = require('../models/User');

// Get users (default limit: 10, max limit: 100, max sum of limit and offset: 1000)
exports.getUsers = async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 10;
        const offset = parseInt(req.query.offset) || 0;

        if (limit > 100) {
            return res.status(400).json({ message: 'Limit must be 100 or less' }); // 400 Bad Request
        } else if (limit + offset > 1000) {
            return res.status(400).json({ message: 'Sum of limit and offset must be 1000 or less' }); // 400 Bad Request
        }

        // Get users ordered by ID
        const users = await User.find().sort({ id: 1 }).limit(limit).skip(offset);

        return res.status(200).json({
            result: 'ok',
            response: 'collection',
            data: users,
            limit: limit,
            offset: offset,
            total: users.length
        }); // 200 OK
    } catch (e) {
        console.error('Error getting users:', e.message); // Log the error

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

// Get user by ID
exports.getUserByID = async (req, res) => {
    try {
        const user = await User.findOne({ id: req.params.id });
        if (!user) {
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
            data: user
        }); // 200 OK
    } catch (e) {
        console.error('Error getting user by ID:', e.message); // Log the error

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

// Create user
exports.createUser = async (req, res) => {
    try {
        // Check if user already exists
        const existingUser = await User.findOne({ id: req.body.id });

        if (existingUser) {
            return res.status(409).json({
                result: 'error',
                errors: [{
                    id: 'conflict',
                    status: 409,
                    title: 'User already exists',
                    detail: `User with ID ${req.body.id} already exists`
                }]
            }); // 409 Conflict
        }

        // Create and save new user
        req.body.version = 1;
        const user = new User(req.body);
        await user.save();

        return res.status(201).json({
            result: 'ok',
            response: 'object',
            data: user
        }); // 201 Created
    } catch (e) {
        console.error('Error creating user:', e.message); // Log the error

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

// Update user
exports.updateUser = async (req, res) => {
    try {
        const user = await User.findOne({ id: req.params.id });
        if (!user) {
            return res.status(404).json({
                result: 'error',
                errors: [{
                    id: 'not_found',
                    status: 404,
                    title: 'User not found',
                    detail: `User with ID ${req.params.id} not found`
                }]
            }); // 404 Not Found
        }

        // Update version
        user.attributes.version++;
        user.attributes.updatedAt = new Date().toISOString();
        await user.save();

        return res.status(200).json({
            result: 'ok',
            response: 'object',
            data: user
        }); // 200 OK
    } catch (e) {
        console.error('Error updating user:', e.message); // Log the error

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

// Delete user
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findOneAndDelete({ id: req.params.id });
        if (!user) {
            return res.status(404).json({
                result: 'error',
                errors: [{
                    id: 'not_found',
                    status: 404,
                    title: 'User not found',
                    detail: `User with ID ${req.params.id} not found`
                }]
            }); // 404 Not Found
        }

        return res.status(204).send(); // 204 No Content
    } catch (e) {
        console.error('Error deleting user:', e.message); // Log the error

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