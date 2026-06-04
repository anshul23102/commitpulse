/**
 * lib/token-rotation-validator.ts
 *
 * GitHub token rotation validation.
 * Validates tokens before use to prevent silent failures.
 */

export function isValidGitHubToken(token: string): boolean {
  if (!token || typeof token !== 'string') {
    return false;
  }
  return token.startsWith('ghp_') || token.startsWith('ghu_') || token.startsWith('ghs_') || token.startsWith('ghr_');
}

export function validateTokenBeforeUse(token: string): { valid: boolean; reason?: string } {
  if (!token) {
    return { valid: false, reason: 'Token is empty or undefined' };
  }

  if (!isValidGitHubToken(token)) {
    return { valid: false, reason: 'Invalid GitHub token format' };
  }

  if (token.length < 36) {
    return { valid: false, reason: 'Token is too short' };
  }

  return { valid: true };
}

export function getNextToken(tokens: string[]): { token: string; index: number } | null {
  if (!Array.isArray(tokens) || tokens.length === 0) {
    return null;
  }

  const validTokens = tokens.filter((t) => validateTokenBeforeUse(t).valid);
  if (validTokens.length === 0) {
    throw new Error('No valid GitHub tokens available');
  }

  const currentIndex = Math.floor(Math.random() * validTokens.length);
  return {
    token: validTokens[currentIndex],
    index: tokens.indexOf(validTokens[currentIndex]),
  };
}
