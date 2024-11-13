const DiscussionBoard = require('../models/DiscussionBoard');

// Create a new discussion board
const createBoard = async (req, res) => {
    try {
        const board = new DiscussionBoard(req.body);
        await board.save();
        res.status(201).json(board);
    } catch (error) {
        res.status(500).json({ message: 'Error creating discussion board.', error });
    }
};

// Get all discussion boards
const getBoards = async (req, res) => {
    try {
        const boards = await DiscussionBoard.find();
        res.status(200).json(boards);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching boards.', error });
    }
};

// Get a specific discussion board by ID
const getBoard = async (req, res) => {
    try {
        const board = await DiscussionBoard.findById(req.params.boardId).populate('topics');
        res.status(200).json(board);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching board.', error });
    }
};

module.exports = { createBoard, getBoards, getBoard };