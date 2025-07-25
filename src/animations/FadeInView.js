import React, { useRef, useEffect } from 'react';
import { Animated } from 'react-native';

/**
 * FadeInView Component
 * 
 * A reusable wrapper component that applies a fade-in animation
 * to any children it wraps. Uses the Animated API.
 * 
 * Props:
 * - style: additional styles to apply to the Animated View
 * - children: components to render inside
 * - duration: optional, duration of fade in (default: 800ms)
 */
const FadeInView = ({ style, children, duration = 800 }) => {
  // Animated value for opacity, starts at 0 (fully transparent)
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // useEffect triggers the animation on component mount
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,             // animate to full opacity (1)
      duration,               // use passed-in duration or default
      useNativeDriver: true,  // enables better performance by running on native thread
    }).start();               // start the animation
  }, [fadeAnim, duration]);

  return (
    // Apply animated opacity and any passed-in styles
    <Animated.View style={{ ...style, opacity: fadeAnim }}>
      {children}
    </Animated.View>
  );
};

export default FadeInView;
