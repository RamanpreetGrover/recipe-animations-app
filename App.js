import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AnimatedNavigator from './src/navigation/AnimatedNavigator';

// Root component that sets up the navigation system with gesture support
export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <AnimatedNavigator />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
