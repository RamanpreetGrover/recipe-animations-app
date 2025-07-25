// CircularProgress.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withTiming,
} from 'react-native-reanimated';

// Constants for circle dimensions
const SIZE = 140;
const STROKE_WIDTH = 10;
const RADIUS = (SIZE - STROKE_WIDTH) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

// Create animated version of SVG circle
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

/**
 * CircularProgress component
 *
 * Displays a cooking countdown timer as a circular progress animation.
 * Includes start, restart, and back-to-recipe controls.
 */
const CircularProgress = ({ navigation }) => {
  const [started, setStarted] = useState(false);     // Track if timer started
  const [timeLeft, setTimeLeft] = useState(20);      // Time left in seconds
  const [done, setDone] = useState(false);           // Track if timer finished
  const progress = useSharedValue(0);                // Reanimated shared progress value (0 to 1)

  // Start cooking timer
  const startTimer = () => {
    setStarted(true);
    setDone(false);
    setTimeLeft(20);
    progress.value = 0;

    // Animate progress bar using timing (20s = 20000ms)
    progress.value = withTiming(1, { duration: 20000 });

    // Regular JavaScript interval to update timeLeft every second
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === 1) {
          clearInterval(interval);
          setDone(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Bind animated strokeDashoffset to progress
  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: CIRCUMFERENCE * (1 - progress.value),
  }));

  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>Cooking Timer</Text>

      {/* Circular progress ring with timer in center */}
      <View style={styles.circleContainer}>
        <Svg width={SIZE} height={SIZE}>
          {/* Background circle */}
          <Circle
            stroke="#eee"
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={RADIUS}
            strokeWidth={STROKE_WIDTH}
          />
          {/* Animated foreground progress circle */}
          <AnimatedCircle
            stroke="#ff6347"
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={RADIUS}
            strokeWidth={STROKE_WIDTH}
            strokeDasharray={CIRCUMFERENCE}
            animatedProps={animatedProps}
            strokeLinecap="round"
          />
        </Svg>

        {/* Timer countdown text */}
        <View style={styles.timerTextWrapper}>
          <Text style={styles.timerText}>
            {done ? '0s' : `${timeLeft}s`}
          </Text>
        </View>
      </View>

      {/* Show Start button only when timer not started */}
      {!started && (
        <View style={styles.buttonWrapper}>
          <Button title="Start Cooking" onPress={startTimer} />
        </View>
      )}

      {/* Show Restart and Go Back once timer finishes */}
      {done && (
        <View style={styles.doneActions}>
          <Text style={styles.doneMessage}>
            ✅ Timer Finished! Enjoy your meal.
          </Text>
          <View style={styles.buttonRow}>
            <Button title="Restart Timer" onPress={startTimer} />
            <View style={{ width: 16 }} />
            <Button title="Back to Recipes" onPress={() => navigation.goBack()} />
          </View>
        </View>
      )}
    </View>
  );
};

// Styling
const styles = StyleSheet.create({
  wrapper: {
    marginTop: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    marginBottom: 16,
    fontWeight: '600',
  },
  circleContainer: {
    width: SIZE,
    height: SIZE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timerTextWrapper: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  timerText: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  buttonWrapper: {
    marginTop: 20,
  },
  doneMessage: {
    fontSize: 16,
    color: 'green',
    marginTop: 20,
    fontWeight: '500',
  },
  doneActions: {
    marginTop: 20,
    alignItems: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'center',
  },
});

export default CircularProgress;
