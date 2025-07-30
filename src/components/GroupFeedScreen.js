import React, { useState } from 'react';
import { ScrollView, View, TouchableOpacity } from 'react-native';
import { Appbar, Avatar, Text, Surface, Chip, IconButton, FAB, ProgressBar } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { theme } from '../theme';
import { GroupInfoScreen } from './GroupInfoScreen';

/**
 * PollOption Component
 * Renders a single poll option with a checkmark, label, percentage, and progress bar
 */
const PollOption = ({ label, percentage }) => (
  <View style={styles.pollOptionContainer}>
    <View style={styles.pollOptionHeader}>
      <IconButton
        icon="check-circle"
        iconColor={theme.colors.primary}
        size={20}
        style={styles.pollCheckIcon}
      />
      <Text variant="bodyLarge" style={styles.pollOptionLabel}>{label}</Text>
      <Text variant="bodyMedium" style={styles.pollPercentage}>{percentage}%</Text>
    </View>
    <ProgressBar
      progress={percentage / 100}
      color={theme.colors.primary}
      style={styles.pollProgressBar}
    />
  </View>
);

/**
 * Post Component
 * Renders a post with user information, poll question, and poll options
 */
const Post = () => (
  <Surface
    elevation={0}
    style={styles.postContainer}
  >
    {/* Post Header - User Info */}
    <View style={styles.postHeader}>
      <Avatar.Text
        size={40}
        label="A"
        style={styles.userAvatar}
      />
      <View style={styles.userInfo}>
        <Text variant="titleMedium">Dianne Russel</Text>
        <Text variant="bodySmall" style={styles.secondaryText}>
          Senior manager - Production an...
        </Text>
        <Text variant="bodySmall" style={styles.secondaryText}>
          2 month
        </Text>
      </View>
      <IconButton icon="dots-vertical" />
    </View>

    {/* Post Content */}
    <Chip
      mode="outlined"
      style={styles.voteChip}
    >
      Votes count
    </Chip>

    <Text variant="bodyLarge" style={styles.pollQuestion}>
      News feed UI design concept app blog clean design feeds ios news newspaper ui ux ux?
    </Text>

    {/* Poll Options */}
    <View style={styles.pollOptionsContainer}>
      <PollOption label="Option A" percentage={10} />
      <PollOption label="Option B" percentage={10} />
      <PollOption label="Option C" percentage={10} />
    </View>
  </Surface>
);

/**
 * GroupFeedScreen Component
 * Main screen component that displays a group's feed with posts and polls
 */
export const GroupFeedScreen = ({ group, onBack }) => {
  const insets = useSafeAreaInsets();
  const [showGroupInfo, setShowGroupInfo] = useState(false);

  // Handle navigation to group info
  const handleGroupInfoPress = () => {
    setShowGroupInfo(true);
  };

  // Handle back press from group info
  const handleGroupInfoBack = () => {
    setShowGroupInfo(false);
  };

  // Render group avatar based on available data
  const renderGroupAvatar = () => {
    if (group?.avatar) {
      return (
        <Avatar.Image
          size={40}
          source={group.avatar}
          style={styles.groupAvatar}
        />
      );
    }
    return (
      <Avatar.Icon
        size={40}
        icon="account-group"
        style={[styles.groupAvatar, { backgroundColor: theme.colors.secondaryContainer }]}
      />
    );
  };

  if (showGroupInfo) {
    return (
      <GroupInfoScreen
        group={group}
        onBack={handleGroupInfoBack}
      />
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <Appbar.Header style={styles.header}>
        <Appbar.BackAction onPress={onBack} />
        <View style={styles.headerContent}>
          {renderGroupAvatar()}
          <TouchableOpacity 
            onPress={handleGroupInfoPress}
            style={styles.headerTitleContainer}
          >
            <Appbar.Content
              title="Training,..."
              subtitle="Supporting line..."
              titleStyle={styles.headerTitle}
              style={styles.headerContentText}
            />
          </TouchableOpacity>
        </View>
        <Appbar.Action icon="magnify" />
        <Appbar.Action icon="dots-vertical" />
      </Appbar.Header>

      {/* Feed Content */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
      >
        <Text
          variant="titleMedium"
          style={styles.sectionTitle}
        >
          Today
        </Text>

        <Post />
      </ScrollView>

      {/* Floating Action Button */}
      <FAB
        icon="plus"
        style={[styles.fab, { bottom: insets.bottom + 16 }]}
        mode="elevated"
      />
    </View>
  );
};

/**
 * Styles
 * Organized by component and section for better maintainability
 */
const styles = {
  // Main Container
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },

  // Header Styles
  header: {
    backgroundColor: theme.colors.surface,
    height: 56, // Fixed height for consistent alignment
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 12,
    height: '100%', // Ensure full height
  },
  headerTitle: {
    fontSize: 20,
  },
  headerContentText: {
    marginLeft: 0,
    justifyContent: 'center', // Center content vertically
  },
  headerTitleContainer: {
    flex: 1,
    justifyContent: 'center', // Center content vertically
    height: '100%', // Ensure full height
  },
  groupAvatar: {
    marginRight: 0,
  },

  // Feed Content Styles
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    padding: 16,
  },
  sectionTitle: {
    marginBottom: 16,
    color: theme.colors.onSurfaceVariant,
  },

  // Post Styles
  postContainer: {
    backgroundColor: theme.colors.surface,
    marginBottom: 8,
    padding: 16,
  },
  postHeader: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  userAvatar: {
    backgroundColor: theme.colors.primary,
    marginRight: 12,
  },
  userInfo: {
    flex: 1,
  },
  secondaryText: {
    color: theme.colors.onSurfaceVariant,
  },
  voteChip: {
    alignSelf: 'flex-start',
    marginBottom: 16,
  },
  pollQuestion: {
    marginBottom: 16,
  },

  // Poll Styles
  pollOptionsContainer: {
    marginVertical: 16,
  },
  pollOptionContainer: {
    marginVertical: 8,
  },
  pollOptionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  pollCheckIcon: {
    margin: 0,
    marginRight: 8,
  },
  pollOptionLabel: {
    flex: 1,
  },
  pollPercentage: {
    color: theme.colors.onSurfaceVariant,
  },
  pollProgressBar: {
    height: 8,
    borderRadius: 4,
  },

  // FAB Styles
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    backgroundColor: theme.colors.surface,
  },
}; 