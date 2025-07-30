import React from 'react';
import { View, TextInput } from 'react-native';
import { IconButton } from 'react-native-paper';
import { theme } from '../theme';

export const SearchBar = ({ 
  value, 
  onChangeText, 
  onBack,
  placeholder = 'Search',
  autoFocus = true,
}) => {
  return (
    <View style={{ 
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingVertical: 8,
      backgroundColor: theme.colors.surface,
      gap: 12
    }}>
      <IconButton
        icon="arrow-left"
        size={24}
        onPress={onBack}
        style={{ margin: 0 }}
      />
      <View style={{ 
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F5F8FA',
        borderRadius: 8,
        height: 40,
      }}>
        <IconButton
          icon="magnify"
          size={20}
          style={{ margin: 0 }}
          iconColor={theme.colors.onSurfaceVariant}
        />
        <TextInput
          placeholder={placeholder}
          onChangeText={onChangeText}
          value={value}
          style={{ 
            flex: 1,
            fontSize: 16,
            color: theme.colors.onSurface,
          }}
          autoFocus={autoFocus}
          returnKeyType="search"
        />
        {value ? (
          <IconButton
            icon="close"
            size={20}
            onPress={() => onChangeText('')}
            style={{ margin: 0 }}
          />
        ) : null}
      </View>
    </View>
  );
}; 