const express = require('express');
const { createBoard, getBoards, getBoard } = require('../controllers/discussionBoardController');

const router = express.Router();

// Routes for discussion boards
router.post('/', createBoard);            
router.get('/', getBoards);                 
router.get('/:boardId', getBoard);         

module.exports = router;