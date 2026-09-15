// This landing's identifier, sent with every registration so the backend
// (and the Telegram message) knows which page the lead came from.
const LANDING_ID = 'landing-1';

// Falls back to localhost:5000 for local dev; override with a .env file
// (VITE_API_URL=https://your-api-domain.com/api) when deploying.
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

/**
 * Submits the registration form to the backend.
 * Resolves with the backend's success payload, or throws an Error whose
 * `.message` is already a safe, user-facing string (never raw Telegram
 * or server internals) and whose `.fieldErrors` (if present) maps
 * field name -> validation message.
 */
export async function registerParticipant({ name, disease, duration, phone }) {
  let response;
  try {
    response = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, disease, duration, phone, landing: LANDING_ID }),
    });
  } catch (networkError) {
    throw new Error('Xatolik yuz berdi. Iltimos, qaytadan urinib ko‘ring.');
  }

  let data = null;
  try {
    data = await response.json();
  } catch {
    // Non-JSON response body — fall through to the generic error below.
  }

  if (!response.ok || !data || data.success !== true) {
    const error = new Error(
      (data && data.message) || 'Xatolik yuz berdi. Iltimos, qaytadan urinib ko‘ring.'
    );
    error.fieldErrors = data && data.errors;
    throw error;
  }

  return data;
}
