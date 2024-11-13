const express = require('express');
const { addComment, getCommentsByTopic } = require('../controllers/commentController');

const router = express.Router();

// Comment Routes
router.post('/', addComment);                       
router.get('/topic/:topicId', getCommentsByTopic);  

module.exports = router;