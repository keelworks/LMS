const prisma = require('../config/database');

const createRoom = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: 'Name is required' });
  }

  try {
    const room = await prisma.chatroom.create({
      data: {
        name,
      },
    });

    res.status(201).json(room);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getRooms = async (req, res) => {
  try {
    const rooms = await prisma.chatroom.findMany();
    res.status(200).json(rooms);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const createMessage = async (req, res) => {
  const { content, roomId } = req.body;
  const userId = req.user.id;

  if (!content || !roomId) {
    return res.status(400).json({ message: 'Content and Room ID are required' });
  }

  try {
    const message = await prisma.message.create({
      data: {
        content,
        userId,
        roomId,
      },
    });

    res.status(201).json(message);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getMessages = async (req, res) => {
  const { roomId } = req.params;

  if (!roomId) {
    return res.status(400).json({ message: 'Room ID is required' });
  }

  try {
    const messages = await prisma.message.findMany({
      where: { roomId: parseInt(roomId) },
      include: { user: true, reactions: true },
    });

    res.status(200).json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const addReaction = async (req, res) => {
  const { type, messageId } = req.body;
  const userId = req.user.id;

  if (!type || !messageId) {
    return res.status(400).json({ message: 'Type and Message ID are required' });
  }

  try {
    const reaction = await prisma.reaction.create({
      data: {
        type,
        messageId,
        userId,
      },
    });

    res.status(201).json(reaction);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { createRoom, getRooms, createMessage, getMessages, addReaction };
