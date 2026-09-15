require('dotenv').config();

/**
 * Centralised, validated access to environment variables.
 * Fails fast (with a clear message) if a required secret is missing,
 * instead of failing later with a confusing Telegram API error.
 */

const required = ['TELEGRAM_BOT_TOKEN', 'TELEGRAM_CHAT_ID'];

const missing = required.filter((key) => !process.env[key] || process.env[key].trim() === '');

if (missing.length > 0) {
  // eslint-disable-next-line no-console
  console.error(
    `\n[config] Missing required environment variable(s): ${missing.join(', ')}\n` +
      '[config] Copy .env.example to .env and fill in real values before starting the server.\n'
  );
  process.exit(1);
}

const parseOrigins = (value) =>
  (value || '')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);

module.exports = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT) || 5000,
  telegram: {
    botToken: process.env.TELEGRAM_BOT_TOKEN,
    chatId: process.env.TELEGRAM_CHAT_ID,
  },
  allowedOrigins: parseOrigins(
    process.env.ALLOWED_ORIGINS ||
      'http://localhost:5173,http://localhost:5174,http://localhost:5175'
  ),
  isProduction: (process.env.NODE_ENV || 'development') === 'production',
};
