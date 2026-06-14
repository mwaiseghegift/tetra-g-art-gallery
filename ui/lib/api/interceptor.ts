// Token expiration interceptor
// Manages automatic token refresh and logout on token expiration

type LogoutCallback = () => void;
type RefreshTokenFn = (refreshToken: string) => Promise<{ access: string }>;

let logoutCallback: LogoutCallback | null = null;
let refreshTokenFn: RefreshTokenFn | null = null;
let refreshTokenValue: string | null = null;

export function setAuthInterceptor(
  onLogout: LogoutCallback,
  onRefresh: RefreshTokenFn,
  refreshToken: string
) {
  logoutCallback = onLogout;
  refreshTokenFn = onRefresh;
  refreshTokenValue = refreshToken;
}

export function clearAuthInterceptor() {
  logoutCallback = null;
  refreshTokenFn = null;
  refreshTokenValue = null;
}

export async function handleTokenExpiration(): Promise<boolean> {
  if (!refreshTokenFn || !refreshTokenValue) {
    // No refresh token available, must logout
    logoutCallback?.();
    return false;
  }

  try {
    const { access } = await refreshTokenFn(refreshTokenValue);
    refreshTokenValue = access;
    return true;
  } catch {
    // Refresh failed, logout user
    logoutCallback?.();
    return false;
  }
}

export function getRefreshToken(): string | null {
  return refreshTokenValue;
}

export function setRefreshToken(token: string) {
  refreshTokenValue = token;
}
