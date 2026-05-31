import React, { useEffect, useRef, useState } from 'react';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';

const TYPE_STYLES = {
  success: {
    accent: '#22C55E',
    background: '#ECFDF5',
    border: '#A7F3D0',
    title: '#14532D',
    body: '#166534',
  },
  error: {
    accent: '#EF4444',
    background: '#FEF2F2',
    border: '#FECACA',
    title: '#7F1D1D',
    body: '#991B1B',
  },
  info: {
    accent: '#2563EB',
    background: '#EFF6FF',
    border: '#BFDBFE',
    title: '#1E3A8A',
    body: '#1D4ED8',
  },
};

export default function NotificationBanner({ notification, index, onDismiss }) {
  const stylesForType = TYPE_STYLES[notification.type] || TYPE_STYLES.info;
  const progress = useRef(new Animated.Value(0)).current;
  const exitProgress = useRef(new Animated.Value(0)).current;
  const timerRef = useRef(null);
  const isDismissingRef = useRef(false);
  const [isMounted, setIsMounted] = useState(true);

  const dismiss = () => {
    if (isDismissingRef.current) return;
    isDismissingRef.current = true;

    Animated.parallel([
      Animated.timing(progress, {
        toValue: 0,
        duration: 180,
        useNativeDriver: true,
      }),
      Animated.timing(exitProgress, {
        toValue: 1,
        duration: 180,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setIsMounted(false);
      onDismiss(notification.id);
    });
  };

  useEffect(() => {
    Animated.spring(progress, {
      toValue: 1,
      useNativeDriver: true,
      friction: 8,
      tension: 80,
    }).start();

    timerRef.current = setTimeout(dismiss, notification.duration);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [dismiss, notification.duration, progress]);

  const opacity = Animated.subtract(progress, Animated.multiply(exitProgress, 0.9));
  const translateY = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [-24 - index * 6, 0],
  });
  const scale = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [0.96, 1],
  });

  if (!isMounted) return null;

  return (
    <Animated.View
      style={[
        styles.wrapper,
        {
          opacity,
          transform: [{ translateY }, { scale }],
          marginTop: index === 0 ? 0 : 10,
          zIndex: 1000 - index,
        },
      ]}
    >
      <Pressable
        onPress={dismiss}
        style={[
          styles.card,
          {
            backgroundColor: stylesForType.background,
            borderColor: stylesForType.border,
          },
        ]}
      >
        <View style={[styles.accent, { backgroundColor: stylesForType.accent }]} />
        <View style={styles.content}>
          <Text style={[styles.title, { color: stylesForType.title }]} numberOfLines={1}>
            {notification.title}
          </Text>
          {!!notification.body && (
            <Text style={[styles.body, { color: stylesForType.body }]} numberOfLines={2}>
              {notification.body}
            </Text>
          )}
        </View>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    maxWidth: 520,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'stretch',
    borderWidth: 1,
    borderRadius: 18,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 8 },
    elevation: 6,
  },
  accent: {
    width: 6,
  },
  content: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 14,
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 4,
  },
  body: {
    fontSize: 13,
    lineHeight: 18,
  },
});
