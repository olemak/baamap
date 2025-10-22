/**
 * Baamap - Geofencing App
 * Draw geofences on a map and send them to a server
 *
 * @format
 */

import {StatusBar, StyleSheet, View} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {GeofenceMap} from './src/components/GeofenceMap';

function App() {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        <GeofenceMap />
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
