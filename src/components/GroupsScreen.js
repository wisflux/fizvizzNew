import React, { useState } from 'react';
import { Dimensions, ScrollView, StatusBar, View } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import {
    Appbar,
    BottomNavigation,
    Chip,
    FAB,
    List,
    Searchbar,
    SegmentedButtons,
    Surface,
    Text,
    Avatar
} from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { communitiesData, groupsData } from '../data/groups';
import { theme } from '../theme';
import { GroupCard } from './GroupCard';
import { GlobalSearchModal } from './GlobalSearchModal';
import { GroupFeedScreen } from './GroupFeedScreen';

const { width } = Dimensions.get('window');

export const GroupsScreen = () => {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState('Groups');
  const [activeFilter, setActiveFilter] = useState('Groups');
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);

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
      {selectedGroup ? (
        <GroupFeedScreen 
          group={selectedGroup}
          onBack={() => setSelectedGroup(null)}
        />
      ) : (
        <>
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
              <Appbar.Action icon="magnify" onPress={() => setIsSearchVisible(true)} />
            </Appbar.Header>

            {/* Filter Tabs */}
            <View style={{ padding: 16 }}>
              <SegmentedButtons
                value={activeFilter}
                onValueChange={setActiveFilter}
                buttons={[
                  { 
                    value: 'Groups', 
                    label: 'Groups',
                    icon: ({ size, color }) => (
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <MaterialCommunityIcons name="account-group" size={size} color={color} />
                        <Text style={{ marginLeft: 4, color }}>{`(${groupsData.length})`}</Text>
                      </View>
                    )
                  },
                  { 
                    value: 'Communities', 
                    label: 'Communities',
                    icon: ({ size, color }) => (
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <MaterialCommunityIcons name="earth" size={size} color={color} />
                        <Text style={{ marginLeft: 4, color }}>{`(${communitiesData.length})`}</Text>
                      </View>
                    )
                  }
                ]}
                style={{
                  backgroundColor: 'transparent',
                }}
                density="medium"
              />
            </View>

            {/* Groups List */}
            <ScrollView 
              style={{ flex: 1 }}
              contentContainerStyle={{ 
                padding: 16,
                paddingBottom: 80
              }}
            >
              {activeFilter === 'Groups' && getFilteredGroups().map((item) => (
                <GroupCard 
                  key={item.id} 
                  item={item} 
                  onPress={() => setSelectedGroup(item)} 
                />
              ))}
              
              {activeFilter === 'Communities' && getFilteredCommunities().map((item) => (
                <GroupCard 
                  key={item.id} 
                  item={item} 
                  onPress={() => setSelectedGroup(item)} 
                />
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
              bottom: 0,
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
              marginBottom: insets.bottom,
              height: 56
            }}
          />

          {/* Global Search Modal */}
          <GlobalSearchModal
            visible={isSearchVisible}
            onDismiss={() => setIsSearchVisible(false)}
            groupsData={groupsData}
            communitiesData={communitiesData}
            onItemPress={(item) => {
              setIsSearchVisible(false);
              setSelectedGroup(item);
            }}
          />
        </>
      )}
    </View>
  );
};