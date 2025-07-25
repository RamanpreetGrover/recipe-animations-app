import React from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import RecipeList from '../screens/RecipeList';
import RecipeDetail from '../screens/RecipeDetail';

// Create a Stack Navigator
const Stack = createStackNavigator();

// Navigation component for app with animated transitions
const AnimatedNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="RecipeList"
      screenOptions={{
        // Apply custom transition animations (fade, slide, etc.)
        ...TransitionPresets.SlideFromRightIOS,
        headerShown: false, // Hide default header for a cleaner look
      }}
    >
      {/* Main list screen */}
      <Stack.Screen name="RecipeList" component={RecipeList} />

      {/* Detail screen with ingredients and timer */}
      <Stack.Screen name="RecipeDetail" component={RecipeDetail} />
    </Stack.Navigator>
  );
};

export default AnimatedNavigator;
