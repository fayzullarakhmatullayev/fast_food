import CustomButton from '@/components/CustomButton';
import CustomInput from '@/components/CustomInput';
import * as Sentry from '@sentry/react-native';
import { Link, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Text, View } from 'react-native';

// eslint-disable-next-line import/no-unresolved
import { signIn } from '@/lib/appwrite';

const SignIn = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({ email: '', password: '' });

  const submit = async () => {
    if (!form.email || !form.password) return Alert.alert('Error', 'Please fill all the fields');
    setIsSubmitting(true);

    try {
      // Appwrite sign in
      await signIn({ email: form.email, password: form.password });
      router.replace('/');
    } catch (err: any) {
      console.log(err);
      Alert.alert('Error', err.message);
      Sentry.captureEvent(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View className="gap-10 bg-white rounded-lg p-5 mt-5">
      <CustomInput
        placeholder="Enter your email"
        value={form.email}
        onChangeText={(text) => setForm({ ...form, email: text })}
        label="Email"
        keyboardType="email-address"
      />
      <CustomInput
        placeholder="Enter your password"
        value={form.password}
        onChangeText={(text) => setForm({ ...form, password: text })}
        label="Password"
        secureTextEntry={true}
      />
      <CustomButton title="Sign In" isLoading={isSubmitting} onPress={submit} />
      <View className="flex justify-center mt-5 flex-row gap-2">
        <Text className="base-regular text-gray-100">Don&apos;t have an account? </Text>
        <Link href="/sign-up" className="base-bold text-primary">
          Sign Up
        </Link>
      </View>
    </View>
  );
};

export default SignIn;
