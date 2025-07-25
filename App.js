import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AnimatedNavigator from './src/navigation/AnimatedNavigator';

// Root component that sets up the navigation system
export default function App() {
  return (
    <NavigationContainer>
      <AnimatedNavigator />
    </NavigationContainer>
  );
}
