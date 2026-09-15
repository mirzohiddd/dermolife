const VALID_LANDINGS = ['landing-1', 'landing-2', 'landing-3'];

// Accepts numbers written with optional leading +, spaces, dashes or
// parentheses; after stripping formatting it must be 9-15 digits long.
// This covers Uzbek numbers (+998 XX XXX XX XX -> 12 digits) and is
// permissive enough for other CIS country codes without accepting junk.
const PHONE_CLEAN_REGEX = /[\s\-().]/g;
const PHONE_DIGITS_REGEX = /^\+?[0-9]{9,15}$/;

function isNonEmptyString(value, { min = 1, max = 200 } = {}) {
  return typeof value === 'string' && value.trim().length >= min && value.trim().length <= max;
}

/**
 * Validates the registration payload.
 * Returns { valid: true, data } with trimmed/normalised fields,
 * or { valid: false, errors } with a field -> message map.
 */
function validateRegistration(body = {}) {
  const errors = {};
  const { name, disease, duration, phone, landing } = body || {};

  if (!isNonEmptyString(name, { min: 2, max: 100 })) {
    errors.name = 'Ism-familiya kamida 2 ta belgidan iborat bo‘lishi kerak';
  }

  if (!isNonEmptyString(disease, { min: 2, max: 100 })) {
    errors.disease = 'Kasallik turini tanlang yoki kiriting';
  }

  if (!isNonEmptyString(duration, { min: 1, max: 100 })) {
    errors.duration = 'Muddatni ko‘rsating';
  }

  if (typeof phone !== 'string' || phone.trim() === '') {
    errors.phone = 'Telefon raqamini kiriting';
  } else {
    const cleaned = phone.replace(PHONE_CLEAN_REGEX, '');
    if (!PHONE_DIGITS_REGEX.test(cleaned)) {
      errors.phone = 'Telefon raqami noto‘g‘ri formatda';
    }
  }

  if (!VALID_LANDINGS.includes(landing)) {
    errors.landing = `landing qiymati quyidagilardan biri bo‘lishi kerak: ${VALID_LANDINGS.join(', ')}`;
  }

  if (Object.keys(errors).length > 0) {
    return { valid: false, errors };
  }

  return {
    valid: true,
    data: {
      name: name.trim(),
      disease: disease.trim(),
      duration: duration.trim(),
      phone: phone.trim(),
      landing,
    },
  };
}

module.exports = { validateRegistration, VALID_LANDINGS };
