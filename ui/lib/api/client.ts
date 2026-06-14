import { API_BASE_URL } from "@/lib/config";
import { handleTokenExpiration } from "./interceptor";

export class ApiError extends Error {
  status: number;
  data: unknown;

  constructor(message: string, status: number, data: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

type ApiFetchOptions = Omit<RequestInit, "body"> & {
  body?: unknown;
  token?: string;
};

function extractErrorMessage(data: unknown, fallback: string): string {
  if (data && typeof data === "object") {
    if ("detail" in data && typeof (data as { detail?: unknown }).detail === "string") {
      return (data as { detail: string }).detail;
    }
    const firstValue = Object.values(data as Record<string, unknown>)[0];
    if (Array.isArray(firstValue) && typeof firstValue[0] === "string") {
      return firstValue[0];
    }
  }
  return fallback;
}

export async function apiFetch<T>(
  path: string,
  { body, token, headers, ...rest }: ApiFetchOptions = {}
): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...rest,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  if (response.status === 204) {
    return undefined as T;
  }

  const data = await response.json().catch(() => undefined);

  if (!response.ok) {
    // Handle token expiration (401 Unauthorized)
    if (response.status === 401 && token) {
      // Token expired - handle expiration
      await handleTokenExpiration();
    }
    throw new ApiError(extractErrorMessage(data, response.statusText), response.status, data);
  }

  return data as T;
}
