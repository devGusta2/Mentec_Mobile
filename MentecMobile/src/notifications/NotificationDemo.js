import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import useNotification from './useNotification';

export default function NotificationDemo() {
  const { notify } = useNotification();

  if (!__DEV__) return null;

  return (
    <View pointerEvents="box-none" style={styles.container}>
      {/* <View style={styles.card}>
        <Text style={styles.title}>Demo de notificações in-app</Text>
        <Text style={styles.subtitle}>
          Use estes botões para testar o stack, o auto-dismiss e a animação.
        </Text>

        <View style={styles.row}>
          <Pressable
            style={[styles.button, styles.success]}
            onPress={() =>
              notify({
                title: 'Mensagem enviada',
                body: 'Sua ação foi concluída com sucesso.',
                type: 'success',
              })
            }
          >
            <Text style={styles.buttonText}>Success</Text>
          </Pressable>

          <Pressable
            style={[styles.button, styles.info]}
            onPress={() =>
              notify({
                title: 'Nova mensagem recebida',
                body: 'Você recebeu uma nova mensagem no chat.',
                type: 'info',
              })
            }
          >
            <Text style={styles.buttonText}>Nova mensagem</Text>
          </Pressable>
        </View>

        <Pressable
          style={[styles.button, styles.error, styles.fullWidth]}
          onPress={() =>
            notify({
              title: 'Erro de conexão',
              body: 'Não foi possível sincronizar agora. Tente novamente.',
              type: 'error',
            })
          }
        >
          <Text style={styles.buttonText}>Erro</Text>
        </Pressable>
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 16,
  },
  card: {
    backgroundColor: 'rgba(20, 20, 20, 0.9)',
    borderRadius: 20,
    padding: 16,
    gap: 10,
  },
  title: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
  },
  subtitle: {
    color: 'rgba(255,255,255,0.72)',
    fontSize: 12,
    lineHeight: 16,
  },
  row: {
    flexDirection: 'row',
    gap: 10,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  fullWidth: {
    width: '100%',
    flex: 0,
  },
  success: {
    backgroundColor: '#16A34A',
  },
  info: {
    backgroundColor: '#2563EB',
  },
  error: {
    backgroundColor: '#DC2626',
  },
  buttonText: {
    color: '#FFF',
    fontWeight: '700',
  },
});
