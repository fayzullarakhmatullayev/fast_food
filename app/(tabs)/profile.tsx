import CustomHeader from '@/components/CustomHeader';
import React from 'react';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Profile = () => {
  return (
    <SafeAreaView className="bg-white h-full p-5">
      <CustomHeader title="Your Profile" />
      <Text>Profile</Text>
    </SafeAreaView>
  );
};

export default Profile;
