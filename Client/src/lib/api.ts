export const API_BASE_URL = "https://slotswapper-project-4hp6.onrender.com/api";

export async function apiRequest(endpoint: string, method = "GET", body?: any) {
  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Request failed");
  return data;
}
