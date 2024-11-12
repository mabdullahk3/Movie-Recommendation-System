const NewsArticle = require('../models/NewsArticle');

// Create a new NewsArticle
const createNewsArticle = async (req, res) => {
    const { title, content, category, author, source } = req.body;

    try {
        const newsArticle = await NewsArticle.create({
            title,
            content,
            category,
            author,
            source
        });
        res.status(201).json(newsArticle);
    } catch (error) {
        res.status(500).json({ message: 'Error creating news article' });
    }
};

// Get all news articles
const getAllNewsArticles = async (req, res) => {
    try {
        const newsArticles = await NewsArticle.find().sort({ datePublished: -1 }); 
        res.status(200).json(newsArticles);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching news articles' });
    }
};

// Get a specific news article by ID
const getNewsArticleById = async (req, res) => {
    const { id } = req.params;
    
    try {
        const newsArticle = await NewsArticle.findById(id);
        if (!newsArticle) {
            return res.status(404).json({ message: 'News article not found :(' });
        }
        res.status(200).json(newsArticle);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching the news article.' });
    }
};

// Updating an existing news article
const updateNewsArticle = async (req, res) => {
    const { id } = req.params;
    const { title, content, category, author, source } = req.body;

    try {
        const newsArticle = await NewsArticle.findById(id);
        if (!newsArticle) {
            return res.status(404).json({ message: 'News article not found' });
        }

        newsArticle.title = title || newsArticle.title;
        newsArticle.content = content || newsArticle.content;
        newsArticle.category = category || newsArticle.category;
        newsArticle.author = author || newsArticle.author;
        newsArticle.source = source || newsArticle.source;
        
        const updatedNewsArticle = await newsArticle.save();
        res.status(200).json(updatedNewsArticle);
    } catch (error) {
        res.status(500).json({ message: 'Error updating news article' });
    }
};

// Delete a news article
const deleteNewsArticle = async (req, res) => {
    const { id } = req.params;
    
    try {
        const newsArticle = await NewsArticle.findByIdAndDelete(id);
        if (!newsArticle) {
            return res.status(404).json({ message: 'News article not found' });
        }

        res.status(200).json({ message: 'News article deleted.' });
    } catch (error) {
        console.error('Error deleting news article :(', error);
        res.status(500).json({ message: 'Error deleting news article :(' });
    }
};


module.exports = {
    createNewsArticle,
    getAllNewsArticles,
    getNewsArticleById,
    updateNewsArticle,
    deleteNewsArticle
};