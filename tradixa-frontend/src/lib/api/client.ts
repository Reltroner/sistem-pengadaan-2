export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000/api";

export async function apiClient<T>(endpoint: string, options?: RequestInit): Promise<T | null> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 1200); // 1.2s timeout

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      console.warn(`API Error: ${response.status} ${response.statusText}`);
      return null;
    }

    const json = await response.json();
    if (json.ok) {
      return json.data as T;
    } else {
      console.warn(`API Error: ${json.error?.message}`);
      return null;
    }
  } catch (error: unknown) {
    clearTimeout(timeoutId);
    if (error instanceof Error && error.name === "AbortError") {
      console.warn(`API Timeout fetching ${endpoint}`);
    } else {
      console.warn(`API Fetch Failed for ${endpoint}:`, error);
    }
    return null;
  }
}
