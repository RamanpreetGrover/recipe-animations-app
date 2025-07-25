import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import RecipeList from '../screens/RecipeList';
import RecipeDetail from '../screens/RecipeDetail';

// Creating the stack navigator for screen transitions
const Stack = createStackNavigator();

// Handles switching between screens
const AnimatedNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false, // We'll design our own headers if needed
        animationEnabled: true, // Enables basic transition animation
      }}
    >
      <Stack.Screen name="RecipeList" component={RecipeList} />
      <Stack.Screen name="RecipeDetail" component={RecipeDetail} />
    </Stack.Navigator>
  );
};

export default AnimatedNavigator;
