import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

// Main screen that displays a list of recipes
const RecipeList = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Recipe App</Text>

      {/* Navigate to details screen on button press */}
      <Button
        title="Go to Recipe Detail"
        onPress={() => navigation.navigate('RecipeDetail')}
      />
    </View>
  );
};

// Simple styles for layout
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 20,
  },
});

export default RecipeList;
