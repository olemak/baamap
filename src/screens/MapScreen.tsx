import React from 'react';
import {View, StyleSheet} from 'react-native';
import {GeofenceMap} from '../components/GeofenceMap';

export function MapScreen() {
  return (
    <View style={styles.container}>
      <GeofenceMap />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
