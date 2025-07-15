import { CustomButtonProps } from '@/type';
import cn from 'clsx';
import React from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';

const CustomButton = ({
  title = 'Click me',
  style,
  textStyle,
  leftIcon,
  isLoading = false,
  onPress
}: CustomButtonProps) => {
  return (
    <TouchableOpacity className={cn('custom-btn', style)} onPress={onPress} disabled={isLoading}>
      {leftIcon}
      <View className="flex-center flex-row">
        {isLoading && <ActivityIndicator size="small" color="#ffffff" className="mr-2" />}
        <Text className={cn('text-white-100 paragraph-semibold', textStyle)}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default CustomButton;
