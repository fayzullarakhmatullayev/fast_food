import { Category } from '@/type';
import { useLocalSearchParams } from 'expo-router/build/hooks';
import React, { useState } from 'react';
import { FlatList, Text, TouchableOpacity } from 'react-native';

const Filter = ({ categories }: { categories: Category[] }) => {
  const searchParams = useLocalSearchParams();
  const [active, setActive] = useState(searchParams.category || '');

  const handlePress = (id: string) => {};

  const filterData: (Category | { $id: string; name: string })[] = categories
    ? [{ $id: 'all', name: 'All' }, ...categories]
    : [{ $id: 'all', name: 'All' }];

  return (
    <FlatList
      data={filterData}
      renderItem={({ item }) => (
        <TouchableOpacity>
          <Text>{item.name}</Text>
        </TouchableOpacity>
      )}
      keyExtractor={(item) => item.$id}
    />
  );
};

export default Filter;
