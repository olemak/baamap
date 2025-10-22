import React, {useState, useRef} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Alert,
  ActivityIndicator,
} from 'react-native';
import MapView, {Polygon, Marker} from 'react-native-maps';
import {sendGeofenceData} from '../services/api';

interface Coordinate {
  latitude: number;
  longitude: number;
}

export const GeofenceMap: React.FC = () => {
  const [coordinates, setCoordinates] = useState<Coordinate[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [region, setRegion] = useState({
    latitude: 59.9139,
    longitude: 10.7522,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const mapRef = useRef<MapView>(null);

  const handleMapPress = (event: any) => {
    if (!isDrawing) return;

    const {coordinate} = event.nativeEvent;
    setCoordinates(prev => [...prev, coordinate]);
  };

  const startDrawing = () => {
    setCoordinates([]);
    setIsDrawing(true);
  };

  const finishDrawing = () => {
    setIsDrawing(false);
    if (coordinates.length < 3) {
      Alert.alert('Error', 'Please draw at least 3 points to create a geofence');
      setCoordinates([]);
    }
  };

  const clearDrawing = () => {
    setCoordinates([]);
    setIsDrawing(false);
  };

  const handleSendGeofence = async () => {
    if (coordinates.length < 3) {
      Alert.alert('Error', 'Please draw a geofence first');
      return;
    }

    setIsSending(true);
    try {
      const response = await sendGeofenceData({
        coordinates,
        name: `Geofence_${Date.now()}`,
        timestamp: new Date().toISOString(),
      });

      Alert.alert('Success', `Geofence sent successfully! ID: ${response.id}`);
    } catch (error) {
      Alert.alert('Error', 'Failed to send geofence data');
      console.error(error);
    } finally {
      setIsSending(false);
    }
  };

  const zoomIn = () => {
    const newRegion = {
      ...region,
      latitudeDelta: region.latitudeDelta / 2,
      longitudeDelta: region.longitudeDelta / 2,
    };
    setRegion(newRegion);
    mapRef.current?.animateToRegion(newRegion, 300);
  };

  const zoomOut = () => {
    const newRegion = {
      ...region,
      latitudeDelta: region.latitudeDelta * 2,
      longitudeDelta: region.longitudeDelta * 2,
    };
    setRegion(newRegion);
    mapRef.current?.animateToRegion(newRegion, 300);
  };

  const onRegionChangeComplete = (newRegion: typeof region) => {
    setRegion(newRegion);
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        region={region}
        onRegionChangeComplete={onRegionChangeComplete}
        zoomEnabled={true}
        zoomControlEnabled={true}
        scrollEnabled={true}
        pitchEnabled={false}
        rotateEnabled={false}
        onPress={handleMapPress}>
        {coordinates.length > 0 && (
          <>
            {coordinates.map((coord, index) => (
              <Marker
                key={index}
                coordinate={coord}
                pinColor={index === 0 ? 'green' : 'red'}
              />
            ))}
            {coordinates.length > 2 && (
              <Polygon
                coordinates={coordinates}
                strokeColor="#FF0000"
                fillColor="rgba(255,0,0,0.3)"
                strokeWidth={2}
              />
            )}
          </>
        )}
      </MapView>

      <View style={styles.zoomControls}>
        <TouchableOpacity style={styles.zoomButton} onPress={zoomIn}>
          <Text style={styles.zoomButtonText}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.zoomButton} onPress={zoomOut}>
          <Text style={styles.zoomButtonText}>−</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.controls}>
        <View style={styles.buttonRow}>
          {!isDrawing ? (
            <TouchableOpacity
              style={[styles.button, styles.startButton]}
              onPress={startDrawing}>
              <Text style={styles.buttonText}>Start Drawing</Text>
            </TouchableOpacity>
          ) : (
            <>
              <TouchableOpacity
                style={[styles.button, styles.finishButton]}
                onPress={finishDrawing}>
                <Text style={styles.buttonText}>Finish</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.clearButton]}
                onPress={clearDrawing}>
                <Text style={styles.buttonText}>Clear</Text>
              </TouchableOpacity>
            </>
          )}
        </View>

        {coordinates.length >= 3 && !isDrawing && (
          <TouchableOpacity
            style={[styles.button, styles.sendButton]}
            onPress={handleSendGeofence}
            disabled={isSending}>
            {isSending ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Send to Server</Text>
            )}
          </TouchableOpacity>
        )}

        {isDrawing && (
          <View style={styles.infoBox}>
            <Text style={styles.infoText}>
              Tap on the map to add points ({coordinates.length} points)
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  zoomControls: {
    position: 'absolute',
    right: 20,
    top: 100,
    gap: 10,
  },
  zoomButton: {
    backgroundColor: '#fff',
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  zoomButtonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  controls: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    minWidth: 120,
    alignItems: 'center',
  },
  startButton: {
    backgroundColor: '#007AFF',
  },
  finishButton: {
    backgroundColor: '#34C759',
  },
  clearButton: {
    backgroundColor: '#FF3B30',
  },
  sendButton: {
    backgroundColor: '#5856D6',
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  infoBox: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
  },
  infoText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 14,
  },
});
