import React from 'react';
import { View } from 'react-native';
import { Card, Avatar, Text, Badge } from 'react-native-paper';
import { theme } from '../theme';
import { MemberAvatars } from './MemberAvatars';

export const GroupCard = ({ item, onPress }) => {
  return (
    <Card
      mode="contained"
      style={{ 
        marginBottom: 12, 
        backgroundColor: theme.colors.surface,
        borderWidth: 1,
        borderColor: theme.colors.outline,
      }}
      onPress={onPress}
    >
      <Card.Content>
        <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
          {item.avatar ? (
            <Avatar.Image
              size={48}
              source={item.avatar}
              style={{ 
                backgroundColor: item.backgroundColor,
                marginRight: 12 
              }}
            />
          ) : (
            <Avatar.Icon
              size={48}
              icon={item.icon}
              style={{ 
                backgroundColor: item.backgroundColor, 
                marginRight: 12 
              }}
            />
          )}
          
          <View style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
              {item.time && (
                <Text variant="bodySmall" style={{ color: theme.colors.onSurfaceVariant }}>
                  {item.time}
                </Text>
              )}
              {item.notificationCount && (
                <Badge size={20} style={{ backgroundColor: theme.colors.primary }}>
                  {item.notificationCount}
                </Badge>
              )}
            </View>
            
            <Text variant="titleMedium" style={{ marginBottom: 8, color: theme.colors.onSurface }}>
              {item.title}
            </Text>
            
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <MemberAvatars />
              {item.type === 'community' ? (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text variant="bodySmall" style={{ color: theme.colors.onSurface }}>
                    {item.groupsCount} <Text style={{ color: theme.colors.onSurfaceVariant }}>Groups</Text>
                  </Text>
                  <Text style={{ marginHorizontal: 8, color: theme.colors.onSurfaceVariant }}>•</Text>
                  <Text variant="bodySmall" style={{ color: theme.colors.onSurface }}>
                    {item.memberCount} <Text style={{ color: theme.colors.onSurfaceVariant }}>{item.memberType}</Text>
                  </Text>
                </View>
              ) : (
                <Text variant="bodySmall" style={{ color: theme.colors.onSurface }}>
                  {item.memberCount} <Text style={{ color: theme.colors.onSurfaceVariant }}>{item.memberType}</Text>
                </Text>
              )}
            </View>
          </View>
        </View>
      </Card.Content>
    </Card>
  );
}; 