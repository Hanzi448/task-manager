const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authMiddleware = require('./middleware/authMiddleware');
const { body, validationResult } = require('express-validator');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path'); // ✅ ADD THIS

require('dotenv').config();

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*', // Update with specific domain in production
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  },
});

const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error('MongoDB connection error:', err));

// Inject io into every request
app.use((req, res, next) => {
  req.io = io;
  next();
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

// Serve static files from React frontend
app.use(express.static(path.join(__dirname, '../client/build')));

// Catch-all for React routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

// Socket.io handling
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Start the server
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
