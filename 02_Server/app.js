const express = require('express');
const mongoose = require('mongoose');
const corsMiddleware = require('cors');
const questionRoutes = require('./routes/questionRoutes');
const errorMiddleware = require('./middleware/errorMiddleware');

require('dotenv').config();

// set up express app
const app = express();

// Define port for server
const PORT = process.env.PORT || 4000;

/*
 * Set up middlewares
 */
app.use(express.static('public'));
app.use(express.json());
app.use(corsMiddleware());

// Simple health-check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Initialize routes
app.use('/questions', questionRoutes);

// Error handling middleware
app.use(errorMiddleware);

// connect to mongodb geography-db
mongoose.Promise = global.Promise;

if (process.env.NODE_ENV !== 'test') {
  mongoose
    .connect(process.env.MONGODB_URL, { useNewUrlParser: true })
    .then(() => {
      // Listen for requests
      app.listen(PORT, function () {
        console.log('Connected to Mongodb');
        console.log(`API listening on port ${PORT}`);
        console.log('Server started and wait requests');
      });
    })
    .catch(error => console.log(error));
}

module.exports = app;
