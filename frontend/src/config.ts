// API Configuration for Deployment
const base = (import.meta as any).env?.VITE_API_BASE_URL || 'http://localhost:5000';
export const API_BASE_URL = base.endsWith('/') ? base.slice(0, -1) : base;
export const API_URL = `${API_BASE_URL}/api`;
export const UPLOADS_URL = `${API_BASE_URL}/uploads`;
