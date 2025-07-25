// SwipeableCard.js
import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  useAnimatedGestureHandler,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.3; // 30% of screen width

/**
 * SwipeableCard Component
 *
 * A reusable card component that responds to horizontal swipe gestures.
 * When swiped right beyond the threshold, it triggers a 'favorite' action.
 *
 * Props:
 * - title: Title text to display
 * - onSwipeRight: Function to call when card is swiped right past threshold
 */
const SwipeableCard = ({ title, onSwipeRight }) => {
  // Shared value for X-axis translation
  const translateX = useSharedValue(0);

  // Gesture handler for pan swipe
  const gestureHandler = useAnimatedGestureHandler({
    onActive: (event) => {
      translateX.value = event.translationX; // update X position as user drags
    },
    onEnd: () => {
      if (translateX.value > SWIPE_THRESHOLD) {
        // If swiped far enough right, trigger callback
        runOnJS(onSwipeRight)();
      }
      // Animate back to original position
      translateX.value = withSpring(0);
    },
  });

  // Bind animated style to the shared X translation value
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <PanGestureHandler onGestureEvent={gestureHandler}>
      <Animated.View style={[styles.card, animatedStyle]}>
        <Text style={styles.cardText}>{title}</Text>
      </Animated.View>
    </PanGestureHandler>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  cardText: {
    fontSize: 18,
    fontWeight: '500',
  },
});

export default SwipeableCard;
