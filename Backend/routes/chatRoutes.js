const express = require('express');
const router = express.Router();
const Chat = require('../models/Chat');

// Get all chat messages
router.get('/chats', async (req, res) => {
  try {
    const chats = await Chat.find().sort({ timestamp: -1 });
    res.json(chats);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Save a new chat message
router.post('/chats', async (req, res) => {
  const chat = new Chat({
    username: req.body.username,
    message: req.body.message
  });

  try {
    const newChat = await chat.save();
    res.status(201).json(newChat);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;