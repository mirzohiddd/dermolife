const { validateRegistration } = require('../utils/validate');
const { sendRegistrationNotification } = require('../services/telegram.service');

async function registerHandler(req, res) {
  const result = validateRegistration(req.body);

  if (!result.valid) {
    return res.status(400).json({
      success: false,
      message: 'Ma’lumotlar noto‘g‘ri yoki to‘liq emas. Iltimos, tekshirib qaytadan yuboring.',
      errors: result.errors,
    });
  }

  try {
    await sendRegistrationNotification(result.data);

    return res.status(200).json({
      success: true,
      message: 'Ro‘yxatdan muvaffaqiyatli o‘tdingiz!',
    });
  } catch (error) {
    // Log full detail server-side only. The client only ever gets a
    // generic, safe message — never the Telegram error body, bot token,
    // or chat id.
    // eslint-disable-next-line no-console
    console.error('[register] Telegram delivery failed:', error.message);

    return res.status(502).json({
      success: false,
      message: 'Xatolik yuz berdi. Iltimos, qaytadan urinib ko‘ring.',
    });
  }
}

module.exports = { registerHandler };
