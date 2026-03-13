// src/lib/auth-logic.js

function validateSignup(email, password) {
  // 1. Check if email is empty or not a string
  if (!email || typeof email !== 'string') {
    return { isValid: false, error: "Email is required." };
  }

  // 2. Enforce Rutgers Scarletmail domain restriction
  if (!email.toLowerCase().endsWith('@scarletmail.rutgers.edu')) {
    return { isValid: false, error: "Must use a @scarletmail.rutgers.edu email." };
  }

  // 3. Enforce password length security standard
  if (!password || password.length < 8) {
    return { isValid: false, error: "Password too short." };
  }

  // If all checks pass
  return { isValid: true, error: null };
}

module.exports = { validateSignup };