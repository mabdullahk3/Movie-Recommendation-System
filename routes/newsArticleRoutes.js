const express = require('express');
const { createNewsArticle, getAllNewsArticles, getNewsArticleById, updateNewsArticle, deleteNewsArticle } = require('../controllers/newsArticleController');
const router = express.Router();

// Routes for news articles
router.post('/articles', createNewsArticle);
router.get('/articles', getAllNewsArticles);
router.get('/articles/:id', getNewsArticleById);
router.put('/articles/:id', updateNewsArticle);
router.delete('/articles/:id', deleteNewsArticle);

module.exports = router;