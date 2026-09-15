const env = require('../config/env');

function notFoundHandler(req, res) {
  res.status(404).json({ success: false, message: 'Endpoint topilmadi' });
}

// Express identifies error-handling middleware by its 4-argument signature.
// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  // eslint-disable-next-line no-console
  console.error('[unhandled error]', err);

  // Malformed JSON body from express.json() lands here.
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ success: false, message: 'So‘rov tanasi noto‘g‘ri formatda (JSON kutilgan)' });
  }

  // Rejected by the CORS origin check in app.js.
  if (err.message && err.message.startsWith('CORS:')) {
    return res.status(403).json({ success: false, message: 'Ruxsat etilmagan manzil (CORS)' });
  }

  res.status(500).json({
    success: false,
    message: 'Serverda kutilmagan xatolik yuz berdi.',
    ...(env.isProduction ? {} : { detail: err.message }),
  });
}

module.exports = { notFoundHandler, errorHandler };
