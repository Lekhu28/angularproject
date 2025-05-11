const captchaStore = new Map();

function generateCaptcha(sessionId) {
  const value = Math.random().toString(36).substring(2, 6).toUpperCase();
  captchaStore.set(sessionId, value);
  setTimeout(() => captchaStore.delete(sessionId), 5 * 60 * 1000); // 5 min expiry
  return value;
}

function verifyCaptcha(sessionId, input) {
  const stored = captchaStore.get(sessionId);
  return stored && stored === input.toUpperCase();
}

module.exports = { generateCaptcha, verifyCaptcha };
