# Baamap - Geofencing App

A React Native application that allows users to draw geofences on a map and send the coordinates to a backend server.

## Features

- Interactive map interface with pinch-to-zoom and pan gestures
- "My Location" button to center map on current position
- Zoom controls (+ / − buttons and pinch gestures)
- Draw custom geofence polygons by tapping on the map
- Send geofence data to backend server
- Visual feedback with markers and polygon overlay
- Real-time coordinate tracking
- Info screen with app description and navigation

## Project Structure

```
baamap/
├── src/
│   ├── components/
│   │   └── GeofenceMap.tsx    # Main map component with drawing logic
│   ├── screens/
│   │   ├── InfoScreen.tsx     # Landing page with app info
│   │   └── MapScreen.tsx      # Map screen wrapper
│   ├── services/
│   │   └── api.ts              # API service for server communication
│   ├── types/
│   │   └── navigation.ts       # Navigation type definitions
│   └── config.ts               # Configuration (API URL)
├── server/
│   ├── index.js                # Express server
│   └── package.json            # Server dependencies
├── App.tsx                     # Main app entry point with navigation
└── package.json                # React Native dependencies
```

## Setup

### 1. Install Mobile App Dependencies

```bash
npm install
```

### 2. Install iOS Dependencies (macOS only)

```bash
cd ios && pod install && cd ..
```

### 3. Set Up Server

```bash
cd server
npm install
```

### 4. Configure API URL

Edit `src/config.ts` to set the correct server URL:

- **iOS Simulator**: Use `http://localhost:3000`
- **Android Emulator**: Use `http://10.0.2.2:3000`
- **Physical Device**: Use your computer's local IP address (e.g., `http://192.168.1.100:3000`)

To find your local IP:
- macOS/Linux: `ifconfig | grep "inet "`
- Windows: `ipconfig`

## Running the App

### Start the Server

```bash
cd server
npm start
```

The server will run on http://localhost:3000

### Run the Mobile App

**iOS:**
```bash
npx react-native run-ios
```

**Android:**
```bash
npx react-native run-android
```

## Usage

1. On the **Info screen**, tap **"Open Map"** to access the map
2. Use the **📍 button** to center the map on your current location
3. Use **+ / − buttons** or **pinch gestures** to zoom in/out
4. Tap **"Start Drawing"** to begin creating a geofence
5. Tap on the map to add points (minimum 3 points required)
6. Tap **"Finish"** when done drawing
7. The polygon will appear on the map with markers
8. Tap **"Send to Server"** to transmit the coordinates
9. The server will respond with a confirmation and geofence ID

## API Endpoints

### POST /geofence
Create a new geofence

**Request Body:**
```json
{
  "name": "Geofence_1234567890",
  "coordinates": [
    {"latitude": 59.9139, "longitude": 10.7522},
    {"latitude": 59.9140, "longitude": 10.7530},
    {"latitude": 59.9145, "longitude": 10.7525}
  ],
  "timestamp": "2025-10-22T13:50:00Z"
}
```

**Response:**
```json
{
  "id": "uuid-here",
  "message": "Geofence created successfully",
  "data": { ... }
}
```

### GET /geofences
Retrieve all geofences

### GET /geofence/:id
Retrieve a specific geofence

### DELETE /geofence/:id
Delete a geofence

### GET /health
Health check endpoint

## Platform-Specific Setup

### iOS

Location permissions are already configured in `ios/BaamapApp/Info.plist`:
```xml
<key>NSLocationWhenInUseUsageDescription</key>
<string>Baamap needs your location to center the map and create geofences around your position.</string>
```

To test location in the iOS Simulator:
1. Go to **Features → Location** in the simulator menu
2. Choose a preset location (e.g., "Apple", "City Run") or **Custom Location...**
3. Tap the 📍 button in the app to center on that location

### Android

Add to `android/app/src/main/AndroidManifest.xml`:
```xml
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
<application>
  <meta-data
    android:name="com.google.android.geo.API_KEY"
    android:value="YOUR_GOOGLE_MAPS_API_KEY"/>
</application>
```

## Troubleshooting

**Map not showing:**
- iOS: Make sure CocoaPods are installed (`cd ios && pod install`)
- Android: Ensure you have a Google Maps API key configured

**Server connection failed:**
- Check that the server is running on the correct port
- Verify the API_BASE_URL in `src/config.ts` matches your setup
- For physical devices, ensure your phone and computer are on the same network

**TypeScript errors:**
```bash
npx tsc --noEmit
```

## Future Features

See [GitHub Issues](https://github.com/olemak/baamap/issues) for planned enhancements:

- Name geofences before sending
- Support multiple geofences simultaneously
- List view of all geofences
- Customizable geofence colors
- Undo last point while drawing
- Local persistence of geofences
- Time-based morphing geofences (shape/location changes over time)

## License

MIT
