// spec/auth_spec.js
const { validateSignup } = require('../src/lib/auth-logic');

describe("Sign Up Validation Logic", function() {
  
  it("should return true for valid Rutgers scarletmail", function() {
    const result = validateSignup("vedpatel@scarletmail.rutgers.edu", "Rutgers1766!");
    expect(result.isValid).toBe(true);
  });

  it("should return false for gmail or other non-Rutgers emails", function() {
    const result = validateSignup("student@gmail.com", "Rutgers1766!");
    expect(result.isValid).toBe(false);
    expect(result.error).toBe("Must use a @scarletmail.rutgers.edu email.");
  });

  it("should reject passwords shorter than 8 characters", function() {
    const result = validateSignup("vedpatel@scarletmail.rutgers.edu", "123");
    expect(result.isValid).toBe(false);
    expect(result.error).toBe("Password too short.");
  });
});