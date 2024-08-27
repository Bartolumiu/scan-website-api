const Group = require('../models/Group');

// Get groups (default limit: 10, max limit: 100, max sum of limit and offset: 1000)
exports.getGroups = async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 10;
        const offset = parseInt(req.query.offset) || 0;

        if (limit > 100) {
            return res.status(400).json({ message: 'Limit must be 100 or less' }); // 400 Bad Request
        } else if (limit + offset > 1000) {
            return res.status(400).json({ message: 'Sum of limit and offset must be 1000 or less' }); // 400 Bad Request
        }

        // Get groups ordered by ID
        const groups = await Group.find().sort({ id: 1 }).limit(limit).skip(offset);

        return res.status(200).json({
            result: 'ok',
            response: 'collection',
            data: groups,
            limit: limit,
            offset: offset,
            total: groups.length
        }); // 200 OK
    } catch (e) {
        console.error('Error getting groups:', e.message); // Log the error

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

// Get group by ID
exports.getGroupByID = async (req, res) => {
    try {
        const group = await Group.findOne({ id: req.params.id });
        if (!group) {
            return res.status(404).json({
                result: 'error',
                errors: [{
                    id: 'not_found',
                    status: 404,
                    title: 'Group not found',
                    detail: `Group with ID ${req.params.id} not found`
                }]
            }); // 404 Not Found
        }

        return res.status(200).json({
            result: 'ok',
            response: 'object',
            data: group
        }); // 200 OK
    } catch (e) {
        console.error('Error getting group by ID:', e.message); // Log the error

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

// Create group
exports.createGroup = async (req, res) => {
    try {
        // Check if group already exists
        const groupExists = await Group.findOne({ id: req.body.id });

        if (groupExists) {
            return res.status(409).json({
                result: 'error',
                errors: [{
                    id: 'conflict',
                    status: 409,
                    title: 'Group already exists',
                    detail: `Group with ID ${req.body.id} already exists`
                }]
            }); // 409 Conflict
        }

        // Create and save new group
        req.body.version = 1;
        const group = new Group(req.body);
        await group.save();

        return res.status(201).json({
            result: 'ok',
            response: 'object',
            data: group
        }); // 201 Created
    } catch (e) {
        console.error('Error creating group:', e.message); // Log the error

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

// Update group
exports.updateGroup = async (req, res) => {
    try {
        const group = await Group.findOne({ id: req.params.id });
        if (!group) {
            return res.status(404).json({
                result: 'error',
                errors: [{
                    id: 'not_found',
                    status: 404,
                    title: 'Group not found',
                    detail: `Group with ID ${req.params.id} not found`
                }]
            }); // 404 Not Found
        }

        // Update version and updatedAt
        group.attributes.version++;
        group.attributes.updatedAt = new Date().toISOString();
        await group.save();

        return res.status(200).json({
            result: 'ok',
            response: 'object',
            data: group
        }); // 200 OK
    } catch (e) {
        console.error('Error updating group:', e.message); // Log the error

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

// Delete group
exports.deleteGroup = async (req, res) => {
    try {
        const group = await Group.findOneAndDelete({ id: req.params.id });
        if (!group) {
            return res.status(404).json({
                result: 'error',
                errors: [{
                    id: 'not_found',
                    status: 404,
                    title: 'Group not found',
                    detail: `Group with ID ${req.params.id} not found`
                }]
            }); // 404 Not Found
        }

        return res.status(204).send(); // 204 No Content
    } catch (e) {
        console.error('Error deleting group:', e.message); // Log the error

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