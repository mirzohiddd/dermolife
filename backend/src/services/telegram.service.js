const axios = require('axios');
const env = require('../config/env');

const LANDING_LABELS = {
  'landing-1': 'Landing 1',
  'landing-2': 'Landing 2',
  'landing-3': 'Landing 3',
};

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function formatMessage({ name, disease, duration, phone, landing }) {
  const now = new Date();
  const date = now.toLocaleDateString('uz-UZ', { timeZone: 'Asia/Tashkent' });
  const time = now.toLocaleTimeString('uz-UZ', {
    timeZone: 'Asia/Tashkent',
    hour: '2-digit',
    minute: '2-digit',
  });

  return [
    '🆕 YANGI RO‘YXAT',
    '',
    `👤 Ism: ${escapeHtml(name)}`,
    `📱 Telefon: ${escapeHtml(phone)}`,
    `🩺 Kasallik: ${escapeHtml(disease)}`,
    `⏱ Davomiyligi: ${escapeHtml(duration)}`,
    `🌐 Landing: ${escapeHtml(LANDING_LABELS[landing] || landing)}`,
    '',
    `📅 Sana: ${date}`,
    `🕐 Vaqt: ${time}`,
  ].join('\n');
}

/**
 * Sends a registration notification to the configured Telegram group.
 * Throws on failure so the caller can decide how to respond to the client
 * without ever leaking the bot token or raw Telegram error to the frontend.
 */
async function sendRegistrationNotification(registration) {
  const url = `https://api.telegram.org/bot${env.telegram.botToken}/sendMessage`;

  const response = await axios.post(
    url,
    {
      chat_id: env.telegram.chatId,
      text: formatMessage(registration),
      parse_mode: 'HTML',
    },
    { timeout: 10000 }
  );

  if (!response.data || response.data.ok !== true) {
    const description = response.data && response.data.description;
    throw new Error(`Telegram API did not confirm delivery${description ? `: ${description}` : ''}`);
  }

  return response.data;
}

module.exports = { sendRegistrationNotification };
