import React, { useState, useEffect, useMemo } from 'react';
import { StyleSheet, View, Animated, Easing } from 'react-native';

export default function WeatherEffects({children, isDaytime}) {
  const [stars, setStars] = useState([]);

  useEffect(() => {
    const newStars = [];

    // Generate stars with random positions and sizes
    for (let i = 0; i < 250; i++) {
      newStars.push({
        key: i,
        xPos: Math.random() * 500,
        yPos: Math.random() * 600,
        size: Math.random() * 3 + 1,
        opacity: new Animated.Value(Math.random() * 0.5 + 0.5),
        duration: Math.random() * 10000 + 500,
      });
    }

    setStars(newStars);
  }, []);

  useEffect(() => {
    // Animate stars
    stars.forEach(star => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(star.opacity, {
            toValue: 0,
            duration: star.duration,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
          Animated.timing(star.opacity, {
            toValue: Math.random() * 0.5 + 0.5,
            duration: star.duration,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
        ]),
      ).start();
    });
  }, [stars]);

  const memoizedStars = useMemo(() => stars, [stars]);

  return (
    <View style={styles.container}>
      {!isDaytime && memoizedStars.map(star => (
        <Animated.View
          key={star.key}
          style={[
            styles.star,
            {
              left: star.xPos,
              top: star.yPos,
              width: star.size,
              height: star.size,
              opacity: star.opacity,
            },
          ]}
        />
      ))}
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  star: {
    position: 'absolute',
    backgroundColor: '#fff',
    borderRadius: 100,
  },
});
