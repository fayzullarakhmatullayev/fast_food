import { useRouter } from 'expo-router';
import React from 'react';
import { Button, Text, View } from 'react-native';

const SignUp = () => {
  const router = useRouter();
  return (
    <View>
      <Text>SignUp</Text>
      <Button title="Sign in" onPress={() => router.push('/sign-in')}></Button>
    </View>
  );
};

export default SignUp;
