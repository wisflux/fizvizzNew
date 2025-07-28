import React from 'react';
import { View } from 'react-native';
import { Avatar } from 'react-native-paper';

export const MemberAvatars = () => {
  return (
    <View style={{ flexDirection: 'row', marginRight: 8 }}>
      <Avatar.Text size={24} label="A" style={{ marginRight: -8, zIndex: 3 }} />
      <Avatar.Text size={24} label="B" style={{ marginRight: -8, zIndex: 2 }} />
      <Avatar.Text size={24} label="C" style={{ zIndex: 1 }} />
    </View>
  );
}; 