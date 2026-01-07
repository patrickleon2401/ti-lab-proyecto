export const USE_MOCK = true;

const local = "192.168.51.205";
const pcdeApoyo = "127.0.0.1:8000";

export { local, pcdeApoyo };

export const createApiUrl = (endpoint) => {
  if (USE_MOCK) {
    return '';
  }
  return `http://${local}/back${endpoint}`;
};