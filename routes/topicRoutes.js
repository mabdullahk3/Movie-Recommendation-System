const express = require('express');
const { createTopic, getTopicsByBoard } = require('../controllers/topicController');

const router = express.Router();

// Routes for topics
router.post('/', createTopic);                       
router.get('/board/:boardId', getTopicsByBoard);     

module.exports = router;