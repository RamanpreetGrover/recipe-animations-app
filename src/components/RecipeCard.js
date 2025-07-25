import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Pressable,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';
import {
  Gesture,
  GestureDetector,
} from 'react-native-gesture-handler';

// ✅ Modern swipe-to-favorite card using Reanimated 3 Gesture API
const RecipeCard = ({ item, onPress }) => {
  const [isFavorite, setIsFavorite] = useState(false); // Track favorite status
  const translateX = useSharedValue(0);                // Horizontal swipe position

  // 🧠 Gesture for swipe detection using new Gesture API
  const swipeGesture = Gesture.Pan()
    .onUpdate((event) => {
      translateX.value = event.translationX;
    })
    .onEnd(() => {
      if (translateX.value > 100) {
        runOnJS(setIsFavorite)((prev) => !prev); // Call React state updater
      }
      translateX.value = withSpring(0); // Snap back to original position
    });

  // 🎨 Animated styles that follow swipe position
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <GestureDetector gesture={swipeGesture}>
      <Animated.View style={[styles.card, animatedStyle]}>
        <Pressable onPress={onPress}>
          <Image source={item.image} style={styles.cardImage} />
          <View style={styles.cardTextWrapper}>
            <FontAwesome
              name={isFavorite ? 'heart' : 'cutlery'}
              size={20}
              color={isFavorite ? '#e91e63' : '#333'}
              style={{ marginRight: 10 }}
            />
            <Text style={styles.cardTitle}>{item.title}</Text>
          </View>
        </Pressable>
      </Animated.View>
    </GestureDetector>
  );
};

// 💅 Styles
const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  cardImage: {
    width: '100%',
    height: 150,
    borderRadius: 8,
  },
  cardTextWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: '#333',
  },
});

export default RecipeCard;
