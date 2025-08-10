// TODO: Replace console logs with pino; add rate limiting middleware
// TODO: Add request validation layer (zod/joi) for routes
const express = require('express');
const mongoose = require('mongoose');
const corsMiddleware = require('cors');
const helmet = require('helmet');
const compression = require('compression');
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
app.use(helmet());
app.use(compression());
app.use(express.static('public'));
app.use(express.json());
const allowedOrigin = process.env.CORS_ORIGIN;
if (allowedOrigin) {
  app.use(
    corsMiddleware({
      origin: allowedOrigin,
    }),
  );
} else {
  app.use(corsMiddleware());
}

// Simple health-check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Initialize routes
/* istanbul ignore next */
app.use('/questions', questionRoutes);

// Error handling middleware
app.use(errorMiddleware);

// connect to mongodb geography-db
mongoose.Promise = global.Promise;

/* istanbul ignore next */
if (process.env.NODE_ENV !== 'test') {
  let httpServer;
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
      // Listen for requests
      httpServer = app.listen(PORT, function () {
        console.log('Connected to Mongodb');
        console.log(`API listening on port ${PORT}`);
        console.log('Server started and wait requests');
      });
    })
    .catch(error => console.log(error));

  const shutdown = () => {
    console.log('Shutting down gracefully...');
    const closeServer = () =>
      new Promise(resolve => httpServer && httpServer.close(() => resolve()));
    Promise.resolve()
      .then(closeServer)
      .then(() => mongoose.connection.close())
      .then(() => {
        console.log('Shutdown complete');
        process.exit(0);
      })
      .catch(err => {
        console.error('Error during shutdown', err);
        process.exit(1);
      });
  };

  process.on('SIGTERM', shutdown);
  process.on('SIGINT', shutdown);
}

module.exports = app;
