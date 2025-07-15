import { useRouter } from 'expo-router';
import React from 'react';
import { Button, Text, View } from 'react-native';

const SignIn = () => {
  const router = useRouter();
  return (
    <View>
      <Text>SignIn</Text>
      <Button title="Sign up" onPress={() => router.push('/sign-up')}></Button>
    </View>
  );
};

export default SignIn;
