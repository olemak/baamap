import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types/navigation';

type InfoScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Info'>;
};

export function InfoScreen({navigation}: InfoScreenProps) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Baamap</Text>
        <Text style={styles.subtitle}>Geofencing Made Simple</Text>
        
        <View style={styles.description}>
          <Text style={styles.descriptionText}>
            Baamap is a geofencing app that lets you:
          </Text>
          <Text style={styles.bullet}>• Draw custom geofences on a map</Text>
          <Text style={styles.bullet}>• View your current location</Text>
          <Text style={styles.bullet}>• Send geofences to a server</Text>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Map')}>
          <Text style={styles.buttonText}>Open Map</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 20,
    color: '#666',
    marginBottom: 40,
  },
  description: {
    marginBottom: 40,
    alignItems: 'flex-start',
  },
  descriptionText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 12,
  },
  bullet: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
    paddingLeft: 8,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
