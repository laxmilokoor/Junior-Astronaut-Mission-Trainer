const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8002'
).replace(/\/+$/, '');

let mutationQueue = Promise.resolve();

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      ...(options.body ? { 'Content-Type': 'application/json' } : {}),
      ...options.headers
    }
  });
  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const detail = typeof data?.detail === 'string' ? data.detail : response.statusText;
    throw new Error(detail || `Backend request failed (${response.status})`);
  }

  if (data === null) {
    throw new Error('Backend returned an invalid response.');
  }
  return data;
}

function queueMutation(path, method, body) {
  const operation = () => request(path, {
    method,
    body: JSON.stringify(body)
  });
  const result = mutationQueue.then(operation);
  mutationQueue = result.catch(() => {});
  return result;
}

export async function checkBackendConnection() {
  return request('/api/status');
}

export async function getMissionHistory() {
  const result = await request('/api/mission/history');
  if (!Array.isArray(result.history)) {
    throw new Error('Backend returned an invalid mission history.');
  }
  return result.history;
}

export function startBackendMission(missionId, resources) {
  return queueMutation('/api/mission/start', 'POST', { missionId, resources });
}

export function replaceBackendResources(resources) {
  return queueMutation('/api/resources', 'PUT', resources);
}

export function updateBackendResources(deltas) {
  return queueMutation('/api/resources/update', 'POST', deltas);
}

export function endBackendMission(mission) {
  return queueMutation('/api/mission/end', 'POST', mission);
}

export { API_BASE_URL };
