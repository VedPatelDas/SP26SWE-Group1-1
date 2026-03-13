// This test defines the "Acceptance Criteria" for our sign-up feature
describe("Authentication Logic", function() {
  
  it("should accept valid Rutgers scarletmail addresses", function() {
    const result = validateRutgersEmail("testuser@scarletmail.rutgers.edu");
    expect(result).toBe(true);
  });

  it("should reject non-Rutgers email addresses", function() {
    const result = validateRutgersEmail("attacker@gmail.com");
    expect(result).toBe(false);
  });

  it("should reject empty or null inputs", function() {
    const result = validateRutgersEmail("");
    expect(result).toBe(false);
  });
});