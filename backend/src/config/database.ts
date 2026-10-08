// Re-export Firebase connection utilities (MongoDB and Mongoose have been completely removed)
export { isFirebaseConnected, isFirebaseConnected as isDatabaseConnected } from './firebase.js';

export async function connectDatabase(): Promise<void> {
  // No-op for Firebase Admin SDK
}

export async function disconnectDatabase(): Promise<void> {
  // No-op for Firebase Admin SDK
}
