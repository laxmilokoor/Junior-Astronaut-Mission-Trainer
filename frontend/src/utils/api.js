
const API_BASE_URL = "http://127.0.0.1:8002";

export async function checkBackendConnection() {
  const response = await fetch(`${API_BASE_URL}/api/status`);

  if (!response.ok) {
    throw new Error("Backend connection failed");
  }

  return await response.json();
}

export { API_BASE_URL };
