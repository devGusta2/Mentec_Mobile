const listeners = new Set();

export function subscribeToNotifications(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function emitNotification(payload) {

  if (!payload || typeof payload.title !== 'string' || typeof payload.body !== 'string') {
    console.log("PAYLOAD INVÁLIDO:", payload);
    return;
  }

  const normalizedPayload = {
    title: payload.title,
    body: payload.body,
    type:
      payload.type === 'success' ||
      payload.type === 'error' ||
      payload.type === 'info'
        ? payload.type
        : 'info',
  };

  console.log("BUS RECEBEU:", normalizedPayload);

  listeners.forEach((listener) => {
    try {
      listener(normalizedPayload);
    } catch (error) {
      console.log('NotificationBus listener error:', error);
    }
  });
}

export function clearNotificationListeners() {
  listeners.clear();
}
