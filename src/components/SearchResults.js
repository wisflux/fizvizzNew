import React from 'react';
import { View, ScrollView, Pressable } from 'react-native';
import { Text, Avatar } from 'react-native-paper';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { theme } from '../theme';

export const SearchResults = ({ 
  results, 
  onItemPress,
  contentContainerStyle,
  ListEmptyComponent,
}) => {
  return (
    <ScrollView 
      style={{ flex: 1, backgroundColor: 'white' }}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={contentContainerStyle}
    >
      {results.length > 0 ? (
        results.map(item => (
          <Pressable
            key={item.id}
            onPress={() => onItemPress?.(item)}
            style={({ pressed }) => [
              {
                flexDirection: 'row',
                padding: 16,
                backgroundColor: pressed ? '#F5F8FA' : 'white',
                borderBottomWidth: 1,
                borderBottomColor: '#F0F0F0',
              }
            ]}
          >
            <Avatar.Image 
              size={48} 
              source={item.avatar} 
              style={{ backgroundColor: '#F5F8FA' }}
            />
            <View style={{ flex: 1, marginLeft: 16 }}>
              <Text 
                variant="titleMedium" 
                style={{ 
                  color: theme.colors.onSurface,
                  marginBottom: 4,
                }}
                numberOfLines={2}
              >
                {item.name}
              </Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <MaterialCommunityIcons
                  name="account"
                  size={16}
                  color={theme.colors.onSurfaceVariant}
                  style={{ marginRight: 4 }}
                />
                <Text 
                  variant="bodyMedium"
                  style={{ color: theme.colors.onSurfaceVariant }}
                >
                  {item.memberCount} Members
                </Text>
                <Text
                  variant="bodyMedium"
                  style={{ color: theme.colors.onSurfaceVariant }}
                >
                  {" · view your card"}
                </Text>
              </View>
            </View>
          </Pressable>
        ))
      ) : (
        ListEmptyComponent || (
          <View style={{ padding: 16 }}>
            <Text variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant }}>
              No results found
            </Text>
          </View>
        )
      )}
    </ScrollView>
  );
}; 