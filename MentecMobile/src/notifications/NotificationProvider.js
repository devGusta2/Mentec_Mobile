import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { View, StyleSheet } from 'react-native';
import NotificationBanner from './NotificationBanner';
import { subscribeToNotifications } from './NotificationBus';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
export const NotificationContext = createContext(undefined);

const DEFAULT_DURATION = 6000;
const MAX_VISIBLE = 3;

export function NotificationProvider({ children }) {
  const insets = useSafeAreaInsets();
  const [notifications, setNotifications] = useState([]);
  const removeNotification = useCallback((id) => {
    setNotifications((current) => current.filter((item) => item.id !== id));
  }, []);

  const notify = useCallback(
    ({ title, body, type = 'info', duration = DEFAULT_DURATION }) => {

      console.log("CRIANDO NOTIFICAÇÃO:");
      console.log("TITLE:", title);
      console.log("BODY:", body);

      const id = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

      const safeDuration =
        Number.isFinite(duration) && duration > 0
          ? duration
          : DEFAULT_DURATION;

      const notification = {
        id,
        title: title || '',
        body: body || '',
        type,
        duration: safeDuration,
      };

      setNotifications((current) => [notification, ...current]);

      return id;
    },
    []
  );

  const clearNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  useEffect(() => {
    const unsubscribe = subscribeToNotifications((payload) => {

      console.log("PROVIDER RECEBEU:", payload);

      notify(payload);
    });

    return unsubscribe;
  }, [notify]);

  const value = useMemo(
    () => ({
      notifications,
      notify,
      removeNotification,
      clearNotifications,
    }),
    [notifications, notify, removeNotification, clearNotifications]
  );

  const visibleNotifications = notifications.slice(0, MAX_VISIBLE);

  return (
    <NotificationContext.Provider value={value}>
      {children}
      <View
        pointerEvents="box-none"
        style={[
          styles.overlay,
          {
            paddingTop: insets.top + 10,
          },
        ]}
      >
        {visibleNotifications.map((notification, index) => (
          <NotificationBanner
            key={notification.id}
            notification={notification}
            index={index}
            onDismiss={removeNotification}
          />
        ))}
      </View>
    </NotificationContext.Provider>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 12,
    zIndex: 9999,
    elevation: 9999,
  },
});
