/**
 * Baamap - Geofencing App
 * Draw geofences on a map and send them to a server
 *
 * @format
 */

import 'react-native-gesture-handler';
import {StatusBar} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from './src/types/navigation';
import {InfoScreen} from './src/screens/InfoScreen';
import {MapScreen} from './src/screens/MapScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar barStyle="dark-content" />
        <Stack.Navigator initialRouteName="Info">
          <Stack.Screen
            name="Info"
            component={InfoScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Map"
            component={MapScreen}
            options={{title: 'Geofence Map'}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
