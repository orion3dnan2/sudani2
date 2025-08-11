import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { LoginScreen, RegisterScreen } from '@/components/AuthScreen';
import { router } from 'expo-router';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  const handleLogin = (username?: string, password?: string) => {
    if (username === 'admin' && password === '123456') {
      router.replace('/admin-dashboard');
    } else if (username === 'merchant' && password === 'merchant') {
      router.replace('/merchant-dashboard');
    } else {
      router.replace('/(tabs)');
    }
  };

  const handleRegister = () => {
    // هنا يمكن إضافة منطق إنشاء حساب جديد
    router.replace('/(tabs)');
  };

  return (
    <View style={styles.container}>
      {isLogin ? (
        <LoginScreen onLogin={handleLogin} />
      ) : (
        <RegisterScreen onRegister={handleRegister} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f5f9',
  },
});