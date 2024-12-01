const express = require('express');
const { addComment, getCommentsByTopic } = require('../controllers/commentController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Comment Routes
router.post('/',protect, addComment);                       
router.get('/topic/:topicId', getCommentsByTopic);  

module.exports = router;