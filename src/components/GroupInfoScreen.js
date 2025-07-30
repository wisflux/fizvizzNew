import React, { useState } from 'react';
import { ScrollView, View, Image, TouchableOpacity } from 'react-native';
import { Appbar, Avatar, Text, Button, Switch, Divider, IconButton, Chip } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { theme } from '../theme';
import { MemberProfileScreen } from './MemberProfileScreen';

const ActionButton = ({ icon, label }) => (
  <View style={styles.actionButton}>
    <Avatar.Icon
      size={48}
      icon={icon}
      style={styles.actionIcon}
      color={theme.colors.primary}
    />
    <Text variant="labelMedium" style={styles.actionLabel}>{label}</Text>
  </View>
);

const StatItem = ({ value, label }) => (
  <View style={styles.statItem}>
    <Text variant="titleMedium" style={styles.statValue}>{value}</Text>
    <Text variant="bodyMedium" style={styles.statLabel}>{label}</Text>
  </View>
);

const MemberItem = ({ name, role, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.memberItem}>
    <Avatar.Icon
      size={40}
      icon="account"
      style={{ backgroundColor: theme.colors.primaryContainer }}
    />
    <View style={styles.memberInfo}>
      <Text variant="bodyLarge">{name}</Text>
      {role && <Text variant="bodyMedium" style={styles.memberRole}>{role}</Text>}
    </View>
  </TouchableOpacity>
);

const SettingItem = ({ icon, label, hasSwitch, color }) => (
  <View style={styles.settingItem}>
    <MaterialCommunityIcons 
      name={icon} 
      size={24} 
      color={color || theme.colors.onSurface} 
      style={styles.settingIcon}
    />
    <Text variant="bodyLarge" style={[
      styles.settingLabel,
      color && { color }
    ]}>{label}</Text>
    {hasSwitch && <Switch value={false} />}
  </View>
);

const StatChip = ({ value, label }) => (
  <Chip
    mode="outlined"
    style={styles.statChip}
    textStyle={styles.statChipText}
  >
    <Text style={styles.statValue}>{value}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </Chip>
);

export const GroupInfoScreen = ({ group, onBack }) => {
  const insets = useSafeAreaInsets();
  const [selectedMember, setSelectedMember] = useState(null);
  const [selectedMemberIndex, setSelectedMemberIndex] = useState(0);

  const members = [
    { name: "Jordyn Franci" },
    { name: "Marcus Vaccaro", role: "Senior Developer" },
    { name: "Marcus Vaccaro", role: "Senior Developer" },
    { name: "Marcus Vaccaro", role: "Senior Developer" },
    { name: "Marcus Vaccaro", role: "Senior Developer" },
  ];

  const handleMemberPress = (member, index) => {
    setSelectedMember(member);
    setSelectedMemberIndex(index);
  };

  const handleMemberProfileBack = () => {
    setSelectedMember(null);
  };

  const handleMemberIndexChange = (newIndex) => {
    setSelectedMemberIndex(newIndex);
    setSelectedMember(members[newIndex]);
  };

  if (selectedMember) {
    return (
      <MemberProfileScreen
        member={selectedMember}
        members={members}
        currentIndex={selectedMemberIndex}
        onChangeIndex={handleMemberIndexChange}
        onBack={handleMemberProfileBack}
      />
    );
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <Appbar.Header style={styles.header}>
        <Appbar.BackAction 
          onPress={onBack} 
          color={theme.colors.onSurface}
        />
        <Appbar.Content />
        <Appbar.Action 
          icon="dots-vertical" 
          color={theme.colors.onSurface}
        />
      </Appbar.Header>

      <ScrollView style={styles.scrollView}>
        {/* Cover Image */}
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4' }}
          style={styles.coverImage}
        />

        {/* Group Icon */}
        <View style={styles.groupIconContainer}>
          <Avatar.Icon
            size={80}
            icon="arrow-down"
            style={styles.groupIcon}
            color="white"
          />
        </View>

        {/* Group Title */}
        <View style={styles.titleContainer}>
          <Text variant="headlineSmall" style={styles.title}>
            Training, Networking and Communication
          </Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <ActionButton icon="eye" label="Looking" />
          <ActionButton icon="account-plus" label="Add" />
          <ActionButton icon="account-arrow-right" label="Request" />
          <ActionButton icon="pin" label="Pin" />
        </View>

        {/* Creator Info */}
        <Text variant="bodyMedium" style={styles.createdBy}>
          Created By Thomas Dravid
        </Text>

        {/* Description */}
        <View style={styles.description}>
          <Text variant="bodyMedium">
            Lorem ipsum dolor sit amet consectetur. Purus ultrices arcu tempus ipsu...{' '}
            <Text style={styles.seeMore}>See more</Text>
          </Text>
        </View>

        {/* Stats */}
        <View style={styles.stats}>
          <StatChip value="220" label="Members" />
          <StatChip value="220" label="Cards" />
          <StatChip value="24" label="Posts" />
        </View>

        {/* Members */}
        <View style={styles.membersSection}>
          <View style={styles.membersHeader}>
            <Text variant="titleMedium">5 member</Text>
            <IconButton icon="magnify" />
          </View>

          {members.map((member, index) => (
            <MemberItem
              key={index}
              name={member.name}
              role={member.role}
              onPress={() => handleMemberPress(member, index)}
            />
          ))}
        </View>

        {/* Settings */}
        <View style={styles.settings}>
          <SettingItem icon="bell-off-outline" label="Mute notification" hasSwitch />
          <SettingItem icon="file-document-outline" label="Rules" />
          <SettingItem icon="cog-outline" label="Group setting" />
          <SettingItem icon="clock-outline" label="invite history" />
          <SettingItem icon="account-plus-outline" label="Invite to group" />
          <SettingItem icon="delete-outline" label="Delete group" color={theme.colors.error} />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 1,
    backgroundColor: theme.colors.surface,
    elevation: 0,
    borderBottomWidth: 0,
  },
  scrollView: {
    flex: 1,
  },
  coverImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  groupIconContainer: {
    marginTop: -40,
    marginLeft: 16,
  },
  groupIcon: {
    backgroundColor: theme.colors.primary,
  },
  titleContainer: {
    padding: 16,
  },
  title: {
    fontWeight: 'bold',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
  },
  actionButton: {
    alignItems: 'center',
  },
  actionIcon: {
    backgroundColor: theme.colors.primaryContainer,
  },
  actionLabel: {
    marginTop: 4,
  },
  createdBy: {
    paddingHorizontal: 16,
    color: theme.colors.onSurfaceVariant,
  },
  description: {
    padding: 16,
  },
  seeMore: {
    color: theme.colors.primary,
  },
  stats: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: theme.colors.surfaceVariant,
    gap: 8,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontWeight: 'bold',
  },
  statLabel: {
    color: theme.colors.onSurfaceVariant,
  },
  statChip: {
    backgroundColor: 'transparent',
    borderColor: theme.colors.outline,
    height: 32,
  },
  statChipText: {
    color: theme.colors.onSurface,
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.onSurface,
    marginRight: 4,
  },
  statLabel: {
    fontSize: 14,
    color: theme.colors.onSurfaceVariant,
  },
  membersSection: {
    padding: 16,
  },
  membersHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  memberItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  memberInfo: {
    marginLeft: 12,
  },
  memberRole: {
    color: theme.colors.onSurfaceVariant,
  },
  settings: {
    padding: 16,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  settingIcon: {
    marginRight: 16,
  },
  settingLabel: {
    flex: 1,
  },
}; 