const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const env = require('./config/env');
const { generalLimiter } = require('./middleware/rateLimiter');
const { notFoundHandler, errorHandler } = require('./middleware/errorHandler');
const registerRoutes = require('./routes/register.routes');

const app = express();

// Trust the first proxy hop (needed for correct client IPs behind
// nginx/reverse proxies in production, which express-rate-limit relies on).
app.set('trust proxy', 1);

app.use(helmet());

app.use(
  cors({
    origin(origin, callback) {
      // Allow non-browser tools (no Origin header) and any explicitly
      // whitelisted landing-page origin.
      if (!origin || env.allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error('CORS: bu manzilga ruxsat berilmagan'));
    },
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
  })
);

app.use(express.json({ limit: '10kb' }));
app.use(generalLimiter);

app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'ok' });
});

app.use('/api', registerRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
