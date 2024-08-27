const express = require('express');
const router = express.Router();

// Import Controllers
const authorController = require('../controllers/Author');
const coverArtController = require('../controllers/Cover');
const mangaController = require('../controllers/Manga');
const groupController = require('../controllers/Group');
const tagController = require('../controllers/Tag');
const userController = require('../controllers/User');

// Author Routes
router.get('/author', authorController.getAuthors);
router.get('/author/:id', authorController.getAuthorByID);
router.post('/author', authorController.createAuthor);
router.put('/author/:id', authorController.updateAuthor);
router.delete('/author/:id', authorController.deleteAuthor);

// Cover Art Routes
router.get('/cover', coverArtController.getCovers);
router.get('/cover/:id', coverArtController.getCoverByID);
router.post('/cover', coverArtController.createCover);
router.put('/cover/:id', coverArtController.updateCover);
router.delete('/cover/:id', coverArtController.deleteCover);

// Manga Routes
router.get('/manga', mangaController.getMangas);
router.get('/manga/:id', mangaController.getMangaByID);
router.post('/manga', mangaController.createManga);
router.put('/manga/:id', mangaController.updateManga);
router.delete('/manga/:id', mangaController.deleteManga);

// Scanlation Group Routes
router.get('/group', groupController.getGroups);
router.get('/group/:id', groupController.getGroupByID);
router.post('/group', groupController.createGroup);
router.put('/group/:id', groupController.updateGroup);
router.delete('/group/:id', groupController.deleteGroup);

// Tag Routes
router.get('/tag', tagController.getTags);
router.get('/tag/:id', tagController.getTagByID);
router.post('/tag', tagController.createTag);
router.put('/tag/:id', tagController.updateTag);
router.delete('/tag/:id', tagController.deleteTag);

// User Routes
router.get('/user', userController.getUsers);
router.get('/user/:id', userController.getUserByID);
router.post('/user', userController.createUser);
router.put('/user/:id', userController.updateUser);
router.delete('/user/:id', userController.deleteUser);

module.exports = (app) => {
    app.use('/api', router);
}