const express = require('express');
const { createRoom, getRooms, createMessage, getMessages, addReaction } = require('../controllers/chatController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/rooms', authMiddleware, createRoom);
router.get('/rooms', authMiddleware, getRooms);
router.post('/messages', authMiddleware, createMessage);
router.get('/rooms/:roomId/messages', authMiddleware, getMessages);
router.post('/reactions', authMiddleware, addReaction);

module.exports = router;
