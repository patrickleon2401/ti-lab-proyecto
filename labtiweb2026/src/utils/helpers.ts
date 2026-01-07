export const createDownloadUrl = (filename: string): string => {
  const { USE_MOCK } = await import('../constants/env');
  const { local } = await import('../../config.js');
  
  if (USE_MOCK) {
    return `/mock/${filename}`;
  } else {
    return `http://${local}/media/${filename}`;
  }
};

export const delay = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};