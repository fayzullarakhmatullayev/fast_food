import { Slot } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';

const AuthLayout = () => {
  return (
    <View>
      <Text>AuthLayout</Text>
      <Slot />
    </View>
  );
};

export default AuthLayout;
