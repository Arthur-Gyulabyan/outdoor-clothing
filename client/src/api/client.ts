import { errorSchema } from "@/schema/common";

const API_BASE_URL = "/api/v1";

interface ApiError {
  message: string;
}

export async function fetcher<T>(
  url: string,
  options?: RequestInit,
  json: boolean = true
): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${url}`, {
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    ...options,
  });

  if (!response.ok) {
    let errorData: ApiError = { message: "An unknown error occurred" };
    try {
      const parsedError = errorSchema.parse(await response.json());
      errorData.message = parsedError.message;
    } catch (e) {
      console.error("Failed to parse error response:", e);
    }
    throw new Error(errorData.message || `HTTP error! Status: ${response.status}`);
  }

  if (json) {
    return response.json();
  }
  return response as T;
}

export function postFetcher<T, V>(
  url: string,
  data: V,
  options?: RequestInit
): Promise<T> {
  return fetcher<T>(url, {
    method: "POST",
    body: JSON.stringify(data),
    ...options,
  });
}