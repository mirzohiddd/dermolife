const rateLimit = require('express-rate-limit');

// Generous limiter for the whole API surface, to blunt basic abuse/scraping.
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'So‘rovlar soni ko‘p. Birozdan so‘ng qaytadan urinib ko‘ring.',
  },
});

// Stricter limiter specifically for form submissions, since each one
// triggers an outbound Telegram API call and should not be spammable.
const registerLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Juda ko‘p urinish. Iltimos, 10 daqiqadan so‘ng qaytadan urinib ko‘ring.',
  },
});

module.exports = { generalLimiter, registerLimiter };
