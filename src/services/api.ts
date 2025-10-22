import {API_BASE_URL} from '../config';

interface Coordinate {
  latitude: number;
  longitude: number;
}

interface GeofenceData {
  coordinates: Coordinate[];
  name: string;
  timestamp: string;
}

interface GeofenceResponse {
  id: string;
  message: string;
}

export const sendGeofenceData = async (
  data: GeofenceData,
): Promise<GeofenceResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/geofence`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error sending geofence data:', error);
    throw error;
  }
};
