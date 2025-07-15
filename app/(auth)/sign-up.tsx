import CustomButton from '@/components/CustomButton';
import CustomInput from '@/components/CustomInput';
import * as Sentry from '@sentry/react-native';
// eslint-disable-next-line import/no-unresolved
import { createUser } from '@/lib/appwrite';

import { Link, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Text, View } from 'react-native';

const SignUp = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const submit = async () => {
    if (!form.email || !form.password || !form.name)
      return Alert.alert('Error', 'Please fill all the fields');
    setIsSubmitting(true);

    try {
      // Appwrite sign in
      await createUser({
        email: form.email,
        password: form.password,
        name: form.name
      });

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
        placeholder="Enter your full name"
        value={form.name}
        onChangeText={(text) => setForm({ ...form, name: text })}
        label="Full name"
      />
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
      <CustomButton title="Sign Up" isLoading={isSubmitting} onPress={submit} />
      <View className="flex justify-center mt-5 flex-row gap-2">
        <Text className="base-regular text-gray-100">Already have an account?</Text>
        <Link href="/sign-in" className="base-bold text-primary">
          Sign In
        </Link>
      </View>
    </View>
  );
};

export default SignUp;
