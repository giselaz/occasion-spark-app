// Token storage utilities for secure token management

const ACCESS_TOKEN_KEY = 'eventhub_access_token';
const REFRESH_TOKEN_KEY = 'eventhub_refresh_token';

// Access Token Management (stored in localStorage for demo - consider sessionStorage for more security)
export const getAccessToken = (): string | null => {
  try {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  } catch (error) {
    console.error('Error getting access token:', error);
    return null;
  }
};

export const setAccessToken = (token: string): void => {
  try {
    localStorage.setItem(ACCESS_TOKEN_KEY, token);
  } catch (error) {
    console.error('Error setting access token:', error);
  }
};

export const removeAccessToken = (): void => {
  try {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
  } catch (error) {
    console.error('Error removing access token:', error);
  }
};

// Refresh Token Management
// NOTE: In production, refresh tokens should be stored in httpOnly cookies for security
// For now, we'll use localStorage for the demo, but this is NOT recommended for production

export const getRefreshToken = (): string | null => {
  try {
    return localStorage.getItem(REFRESH_TOKEN_KEY);
  } catch (error) {
    console.error('Error getting refresh token:', error);
    return null;
  }
};

export const setRefreshToken = (token: string): void => {
  try {
    localStorage.setItem(REFRESH_TOKEN_KEY, token);
  } catch (error) {
    console.error('Error setting refresh token:', error);
  }
};

export const removeRefreshToken = (): void => {
  try {
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  } catch (error) {
    console.error('Error removing refresh token:', error);
  }
};

// Clear all tokens
export const clearAllTokens = (): void => {
  removeAccessToken();
  removeRefreshToken();
};

// Token validation utility
export const isTokenExpired = (token: string): boolean => {
  try {
    // For real JWT tokens, you would decode and check the exp claim
    // This is a mock implementation
    const payload = JSON.parse(atob(token.split('.')[1]));
    const currentTime = Date.now() / 1000;
    return payload.exp < currentTime;
  } catch (error) {
    // If token is malformed, consider it expired
    return true;
  }
};

/* 
SECURITY NOTES FOR PRODUCTION:

1. Access Tokens:
   - Store in memory (React state) for maximum security
   - If persistence needed, use sessionStorage (cleared on tab close)
   - localStorage is least secure but most convenient for demos

2. Refresh Tokens:
   - MUST be stored in httpOnly cookies in production
   - Should have longer expiration than access tokens
   - Should be rotated on each use (refresh token rotation)
   - Never store in localStorage/sessionStorage in production

3. Additional Security Measures:
   - Implement proper CSRF protection
   - Use secure, sameSite cookies
   - Implement token rotation
   - Add proper error handling for token refresh
   - Consider implementing automatic logout on token expiry
*/