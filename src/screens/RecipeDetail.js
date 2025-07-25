import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  LayoutAnimation,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CircularProgress from '../animations/CircularProgress';

// Screen to display the selected recipe with ingredients and cooking timer
const RecipeDetail = ({ route, navigation }) => {
  const { item } = route.params; // Get the selected recipe from navigation params
  const [showIngredients, setShowIngredients] = useState(false); // Toggle for ingredients

  // Animate and toggle ingredient list
  const toggleIngredients = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setShowIngredients((prev) => !prev);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.inner}>
        {/* Recipe Title */}
        <Text style={styles.title}>{item.title}</Text>

        {/* Button to show/hide ingredients */}
        <TouchableOpacity style={styles.toggleButton} onPress={toggleIngredients}>
          <Text style={styles.toggleButtonText}>
            {showIngredients ? 'Hide Ingredients' : 'Show Ingredients'}
          </Text>
        </TouchableOpacity>

        {/* Scrollable list of ingredients (only shown when toggled) */}
        <ScrollView contentContainerStyle={styles.scrollArea}>
          {showIngredients && item.ingredients.map((ingredient, index) => (
            <Text key={index} style={styles.ingredientItem}>
              • {ingredient}
            </Text>
          ))}
        </ScrollView>

        {/* Fixed section for circular timer */}
        <View style={styles.timerWrapper}>
          <CircularProgress navigation={navigation} />
        </View>
      </View>
    </SafeAreaView>
  );
};

// Styling for the screen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  inner: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 25 : 0, // Avoid overlapping status bar on Android
    paddingHorizontal: 16,
    justifyContent: 'space-between', // Push top content up and timer down
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  toggleButton: {
    alignSelf: 'center',
    backgroundColor: '#ff6347',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 10,
  },
  toggleButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  scrollArea: {
    paddingBottom: 10, // Give ingredients some spacing
  },
  ingredientItem: {
    fontSize: 16,
    paddingVertical: 4,
    paddingLeft: 12,
    color: '#444',
  },
  timerWrapper: {
  marginTop: -10,    
  paddingBottom: 20,    
  alignItems: 'center',
},
});

export default RecipeDetail;
