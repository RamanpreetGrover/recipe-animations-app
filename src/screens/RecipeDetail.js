import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

// Screen that shows recipe instructions or details
const RecipeDetail = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recipe Detail Page</Text>

      {/* Return to previous screen */}
      <Button
        title="Back to Recipe List"
        onPress={() => navigation.goBack()}
      />
    </View>
  );
};

// Styling for layout
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: '500',
    marginBottom: 20,
  },
});

export default RecipeDetail;
