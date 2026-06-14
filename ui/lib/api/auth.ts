import { API_ENDPOINTS } from "@/lib/config/apis";
import { apiFetch } from "./client";
import type { AuthTokens, RegisterInput, User } from "./types";

export function register(data: RegisterInput) {
  return apiFetch<User>(API_ENDPOINTS.auth.register, { method: "POST", body: data });
}

export function obtainTokens(username: string, password: string) {
  return apiFetch<AuthTokens>(API_ENDPOINTS.auth.token, {
    method: "POST",
    body: { username, password },
  });
}

export function refreshToken(refresh: string) {
  return apiFetch<{ access: string }>(API_ENDPOINTS.auth.refresh, {
    method: "POST",
    body: { refresh },
  });
}

export function getCurrentUser(token: string) {
  return apiFetch<User>(API_ENDPOINTS.auth.me, { token });
}

export function updateCurrentUser(
  data: Partial<Pick<User, "first_name" | "last_name" | "email">>,
  token: string
) {
  return apiFetch<User>(API_ENDPOINTS.auth.me, { method: "PATCH", body: data, token });
}
