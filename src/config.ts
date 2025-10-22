// Change this to your server's IP address when testing on a physical device
// For iOS simulator: use 'localhost' or '127.0.0.1'
// For Android emulator: use '10.0.2.2'
// For physical device: use your computer's local IP address (e.g., '192.168.1.100')

export const API_BASE_URL = __DEV__
  ? 'http://localhost:3000'
  : 'https://your-production-server.com';
