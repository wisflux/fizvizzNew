import React, { useState } from 'react';
import { Dimensions, ScrollView, StatusBar, View } from 'react-native';
import {
    Appbar,
    BottomNavigation,
    Chip,
    FAB,
    List,
    Searchbar,
    SegmentedButtons,
    Surface,
    Text
} from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { communitiesData, groupsData } from '../data/groups';
import { theme } from '../theme';
import { GroupCard } from './GroupCard';

const { width } = Dimensions.get('window');

export const GroupsScreen = () => {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState('Groups');
  const [activeFilter, setActiveFilter] = useState('Groups');
  const [searchQuery, setSearchQuery] = useState('');

  const getFilteredGroups = () => {
    return activeFilter === 'Groups' ? groupsData : [];
  };

  const getFilteredCommunities = () => {
    return activeFilter === 'Communities' ? communitiesData : [];
  };

  const renderSectionHeader = (icon, title, count, color) => (
    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
      <List.Icon icon={icon} color={color} />
      <Text variant="titleLarge" style={{ marginLeft: 8 }}>{title}</Text>
      <Chip mode="outlined" style={{ marginLeft: 8 }}>{count}</Chip>
    </View>
  );

      return (
      <View style={{ flex: 1, backgroundColor: theme.colors.surface }}>
        {/* Main Content */}
        <View style={{ flex: 1, marginBottom: 56 + insets.bottom }}>
          {/* Header */}
          <Appbar.Header 
            style={{ 
              backgroundColor: theme.colors.surface,
              height: 56,
            }}
          >
            <Appbar.Action icon="menu" />
            <Appbar.Content title="Groups" />
          </Appbar.Header>

          {/* Search Bar */}
          <View style={{ padding: 16, paddingVertical: 8 }}>
            <Searchbar
              placeholder="Search..."
              onChangeText={setSearchQuery}
              value={searchQuery}
              elevation={0}
              mode="bar"
              style={{ 
                backgroundColor: '#F5F8FA',
                borderWidth: 1,
                borderColor: theme.colors.outline,
                borderRadius: 20,
                height: 36,
                justifyContent: 'center',
              }}
              inputStyle={{
                color: theme.colors.onSurface,
                fontSize: 14,
                height: 36,
                paddingTop: 0,
                paddingBottom: 0,
                marginLeft: -4,
              }}
              iconSize={18}
              placeholderTextColor={theme.colors.onSurfaceVariant}
              iconColor={theme.colors.primary}
            />
          </View>

          {/* Filter Tabs */}
          <View style={{ padding: 16 }}>
            <SegmentedButtons
              value={activeFilter}
              onValueChange={setActiveFilter}
              buttons={[
                { 
                  value: 'Groups', 
                  label: `Groups (${groupsData.length})`,
                  icon: 'account-group'
                },
                { 
                  value: 'Communities', 
                  label: `Communities (${communitiesData.length})`,
                  icon: 'earth'
                }
              ]}
              style={{
                backgroundColor: 'transparent',
              }}
            />
          </View>

          {/* Groups and Communities List */}
          <ScrollView 
            style={{ flex: 1 }}
            contentContainerStyle={{ 
              padding: 16, // Space for FAB
            }}
          >
          {activeFilter === 'Groups' && getFilteredGroups().map((item) => (
            <GroupCard key={item.id} item={item} />
          ))}

          {activeFilter === 'Communities' && getFilteredCommunities().map((item) => (
            <GroupCard key={item.id} item={item} />
          ))}
        </ScrollView>
      </View>

        {/* FAB */}
        <FAB
          icon="plus"
          style={{ 
            position: 'absolute',
            margin: 16,
            right: 0,
            bottom: 72 + insets.bottom,
            backgroundColor: theme.colors.primary
          }}
          color="#FFFFFF"
          theme={{
            colors: {
              onPrimaryContainer: '#FFFFFF'
            }
          }}
        />

        {/* Bottom Navigation */}
        <BottomNavigation
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: insets.bottom,
          }}
          navigationState={{
            index: 3,
            routes: [
              { key: 'home', title: 'Home', focusedIcon: 'home', unfocusedIcon: 'home-outline' },
              { key: 'cards', title: 'Cards', focusedIcon: 'credit-card', unfocusedIcon: 'credit-card-outline' },
              { key: 'scan', title: 'Scan', focusedIcon: 'qrcode-scan', unfocusedIcon: 'qrcode-scan' },
              { key: 'groups', title: 'Groups', focusedIcon: 'account-group', unfocusedIcon: 'account-group-outline' },
              { key: 'events', title: 'Events', focusedIcon: 'calendar', unfocusedIcon: 'calendar-outline', badge: '3' },
            ],
          }}
          onIndexChange={() => {}}
          renderScene={() => null}
          barStyle={{ 
            backgroundColor: theme.colors.surface,
            height: 65,
          }}
        />
      </View>
  );
};