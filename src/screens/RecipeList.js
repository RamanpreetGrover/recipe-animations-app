import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
  Animated,
  Dimensions,
} from 'react-native';
import RecipeCard from '../components/RecipeCard';
import { useNavigation } from '@react-navigation/native';

// ✅ Load local images
import pancakeImg from '../../assets/pancake.jpg';
import spaghettiImg from '../../assets/sphegetti.jpg';
import chickenImg from '../../assets/chicken.jpg';

const { height } = Dimensions.get('window');

// Main screen to display list of recipes with animated parallax scroll
const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();

  // Animated scroll value for parallax effect
  const scrollY = new Animated.Value(0);

  // Fake fetch function to simulate API call
  const fetchRecipes = () => {
    setLoading(true);
    setTimeout(() => {
      setRecipes([
        {
          id: '1',
          title: 'Pancakes',
          image: pancakeImg,
          ingredients: ['2 cups flour', '1 egg', '1/2 cup sugar', '1 cup milk'],
        },
        {
          id: '2',
          title: 'Spaghetti Bolognese',
          image: spaghettiImg,
          ingredients: ['Spaghetti', 'Tomato sauce', 'Ground beef', 'Garlic'],
        },
        {
          id: '3',
          title: 'Grilled Chicken Salad',
          image: chickenImg,
          ingredients: ['Chicken breast', 'Lettuce', 'Cucumber', 'Olive oil'],
        },
      ]);
      setLoading(false);
    }, 1500);
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  // Pull-to-refresh behavior
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchRecipes();
    setTimeout(() => setRefreshing(false), 2000);
  }, []);

  // Loading spinner while fetching data
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#ff6347" />
        <Text style={styles.loadingText}>Loading recipes...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🍳 Welcome to Recipe App</Text>

      {/* Animated FlatList for parallax scroll */}
      <Animated.FlatList
        data={recipes}
        keyExtractor={(item) => item.id}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        renderItem={({ item, index }) => {
          const inputRange = [
            -1,
            0,
            (150 + 16) * index,
            (150 + 16) * (index + 2),
          ];
          const scale = scrollY.interpolate({
            inputRange,
            outputRange: [1, 1, 1, 0],
          });

          return (
            <Animated.View style={{ transform: [{ scale }] }}>
              <RecipeCard
                item={item}
                onPress={() => navigation.navigate('RecipeDetail', { item })}
              />
            </Animated.View>
          );
        }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
});

export default RecipeList;
