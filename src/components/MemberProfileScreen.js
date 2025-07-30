import React, { useState, useRef, useEffect } from 'react';
import { View, ScrollView, Image, Pressable, Linking, Animated, PanResponder, Dimensions } from 'react-native';
import { Text, Avatar, Button, Surface, IconButton } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { theme } from '../theme';

const SocialButton = ({ icon }) => (
  <Surface
    style={{
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: '#F5F7FA',
      justifyContent: 'center',
      alignItems: 'center',
    }}
    elevation={0}
  >
    <MaterialCommunityIcons name={icon} size={20} color={theme.colors.onSurfaceVariant} />
  </Surface>
);

const ServiceCard = ({ icon, color, title, description }) => (
  <Surface
    style={{
      backgroundColor: 'white',
      borderRadius: 12,
      marginBottom: 12,
      overflow: 'hidden',
    }}
    elevation={0}
  >
    <Pressable
      style={({ pressed }) => ({
        flexDirection: 'row',
        padding: 12,
        backgroundColor: pressed ? '#F5F7FA' : 'white',
      })}
    >
      <View
        style={{
          width: 60,
          height: 60,
          borderRadius: 8,
          marginRight: 12,
          backgroundColor: color,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <MaterialCommunityIcons name={icon} size={24} color="white" />
      </View>
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Text variant="titleMedium">{title}</Text>
          <IconButton
            icon="arrow-top-right"
            size={20}
            style={{ margin: 0 }}
          />
        </View>
        <Text
          variant="bodyMedium"
          style={{ color: theme.colors.onSurfaceVariant }}
          numberOfLines={2}
        >
          {description}
        </Text>
      </View>
    </Pressable>
  </Surface>
);

export const MemberProfileScreen = ({ member, onBack, members, currentIndex: initialIndex, onChangeIndex }) => {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState('Profile');
  const [currentSlideIndex, setCurrentSlideIndex] = useState(initialIndex);
  const horizontalScrollRef = useRef(null);
  const screenWidth = Dimensions.get('window').width;
  const tabs = ['Signal', 'Profile', 'Cards'];
  const pan = useRef(new Animated.ValueXY()).current;
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        // Only handle horizontal swipes
        return Math.abs(gestureState.dx) > Math.abs(gestureState.dy);
      },
      onPanResponderGrant: () => {
        pan.setOffset({
          x: pan.x._value,
          y: pan.y._value
        });
      },
      onPanResponderMove: Animated.event(
        [
          null,
          { dx: pan.x }
        ],
        { useNativeDriver: false }
      ),
      onPanResponderRelease: (evt, gestureState) => {
        pan.flattenOffset();
        const swipeThreshold = screenWidth * 0.3;

        if (Math.abs(gestureState.dx) > swipeThreshold) {
          // Swipe right (previous)
          if (gestureState.dx > 0 && currentSlideIndex > 0) {
            Animated.spring(pan, {
              toValue: { x: screenWidth, y: 0 },
              useNativeDriver: false,
            }).start(() => {
              pan.setValue({ x: -screenWidth, y: 0 });
              onChangeIndex(currentSlideIndex - 1);
              Animated.spring(pan, {
                toValue: { x: 0, y: 0 },
                useNativeDriver: false,
              }).start();
            });
          }
          // Swipe left (next)
          else if (gestureState.dx < 0 && currentSlideIndex < members.length - 1) {
            Animated.spring(pan, {
              toValue: { x: -screenWidth, y: 0 },
              useNativeDriver: false,
            }).start(() => {
              pan.setValue({ x: screenWidth, y: 0 });
              onChangeIndex(currentSlideIndex + 1);
              Animated.spring(pan, {
                toValue: { x: 0, y: 0 },
                useNativeDriver: false,
              }).start();
            });
          }
          // Bounce back if at the end
          else {
            Animated.spring(pan, {
              toValue: { x: 0, y: 0 },
              useNativeDriver: false,
            }).start();
          }
        } else {
          // Return to center if swipe wasn't far enough
          Animated.spring(pan, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: false,
          }).start();
        }
      }
    })
  ).current;

  // Reset pan value when member changes
  useEffect(() => {
    pan.setValue({ x: 0, y: 0 });
  }, [member]);

  // Update local state when prop changes
  useEffect(() => {
    setCurrentSlideIndex(initialIndex);
  }, [initialIndex]);

  const handleSlideChange = (event) => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(contentOffset / (screenWidth - 32));
    
    if (currentSlideIndex !== newIndex) {
      setCurrentSlideIndex(newIndex);
      onChangeIndex(newIndex);
    }
  };

  const handleTabPress = (tab, index) => {
    setActiveTab(tab);
    horizontalScrollRef.current?.scrollTo({
      x: index * (screenWidth - 32),
      animated: true
    });
  };

  const renderTabContent = () => (
    <ScrollView
      ref={horizontalScrollRef}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      onMomentumScrollEnd={handleSlideChange}
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { x: new Animated.Value(0) } } }],
        { 
          useNativeDriver: true,
          listener: (event) => {
            // Update index during scroll for smoother updates
            const contentOffset = event.nativeEvent.contentOffset.x;
            const newIndex = Math.round(contentOffset / (screenWidth - 32));
            if (currentSlideIndex !== newIndex) {
              setCurrentSlideIndex(newIndex);
            }
          }
        }
      )}
      scrollEventThrottle={16}
      style={styles.tabScrollView}
      contentContainerStyle={styles.tabScrollContent}
    >
      {/* Signal Tab */}
      <View style={[styles.tabPage, { width: screenWidth - 32 }]}>
        <View style={styles.section}>
          <Text variant="bodyMedium" style={styles.emptyState}>
            No signals available
          </Text>
        </View>
      </View>

      {/* Profile Tab */}
      <View style={[styles.tabPage, { width: screenWidth - 32 }]}>
        {/* Website */}
        <View style={styles.section}>
          <Text variant="titleMedium" style={styles.sectionTitle}>Website</Text>
          <Text
            variant="bodyLarge"
            style={styles.link}
            onPress={() => Linking.openURL('http://www.website.com')}
          >
            www.website.com
          </Text>
        </View>

        {/* Bio */}
        <View style={styles.section}>
          <Text variant="titleMedium" style={styles.sectionTitle}>Bio</Text>
          <Text variant="bodyMedium">
            Former frontend dev for Linear, Coinbase, and Postscript.
          </Text>
        </View>

        {/* Video Preview */}
        <View style={styles.section}>
          <Text variant="titleMedium" style={styles.sectionTitle}>Video Preview</Text>
          <View style={styles.videoPreview}>
            <Surface style={styles.playButton} elevation={0}>
              <MaterialCommunityIcons name="play" size={32} color="white" />
            </Surface>
          </View>
        </View>

        {/* Offerings */}
        <View style={styles.section}>
          <Text variant="titleMedium" style={styles.sectionTitle}>Offerings</Text>
          
          {/* Tabs */}
          <View style={{ 
            flexDirection: 'row', 
            gap: 12,
            marginBottom: 16,
          }}>
            <Button
              mode="contained-tonal"
              onPress={() => {}}
              style={{ 
                backgroundColor: theme.colors.primary,
                borderRadius: 20,
              }}
              labelStyle={{ color: 'white' }}
            >
              Services
            </Button>
            <Button
              mode="outlined"
              onPress={() => {}}
              style={{ borderRadius: 20 }}
            >
              Products
            </Button>
          </View>

          {/* Service Cards */}
          <ServiceCard
            icon="cash"
            color="#4CAF50"
            title="Financial advising"
            description="A financial advisor provides financial advice or guidance to customers for compensation..."
          />
          <ServiceCard
            icon="calculator"
            color="#2196F3"
            title="Accounting"
            description="Accounting is the process of recording financial transactions pertaining to"
          />
          <ServiceCard
            icon="calendar-star"
            color="#9C27B0"
            title="Event"
            description="Book tickets for best upcoming events in Jaipur. Explore music, comedy..."
          />
          <ServiceCard
            icon="account-group"
            color="#FF9800"
            title="Coaching & mentoring"
            description="development approaches based on the use of one-to-one conversations to..."
          />
        </View>
      </View>

      {/* Cards Tab */}
      <View style={[styles.tabPage, { width: screenWidth - 32 }]}>
        <View style={styles.section}>
          <Text variant="bodyMedium" style={styles.emptyState}>
            No cards available
          </Text>
        </View>
      </View>
    </ScrollView>
  );

  const renderPageIndicator = () => (
    <Animated.View style={styles.pageIndicatorContainer}>
      <Text style={styles.pageIndicator}>
        <Text style={styles.currentPage}>{currentSlideIndex + 1}</Text>
        <Text style={styles.pageSeparator}> / </Text>
        <Text style={styles.totalPages}>{members.length}</Text>
      </Text>
    </Animated.View>
  );

  return (
    <View style={{ 
      flex: 1, 
      backgroundColor: '#F5F7FA',
      paddingTop: insets.top,
    }}>
      {/* Header */}
      <View style={styles.header}>
        <IconButton
          icon="arrow-left"
          size={24}
          onPress={onBack}
        />
        {renderPageIndicator()}
        <IconButton
          icon="dots-vertical"
          size={24}
        />
      </View>

      <Animated.View 
        style={{
          flex: 1,
          transform: [{ translateX: pan.x }]
        }}
        {...panResponder.panHandlers}
      >
        {/* Profile Info */}
        <View style={{ alignItems: 'center', paddingHorizontal: 16 }}>
          {member.avatar ? (
            <Avatar.Image
              size={80}
              source={member.avatar}
              style={{ backgroundColor: '#F5F7FA' }}
            />
          ) : (
            <Avatar.Icon
              size={80}
              icon="account"
              style={{ backgroundColor: theme.colors.primary }}
            />
          )}
          <Text 
            variant="headlineSmall" 
            style={{ marginTop: 16, marginBottom: 4 }}
          >
            {member.name}
          </Text>
          <Text
            variant="bodyMedium"
            style={{ 
              color: theme.colors.onSurfaceVariant,
              textAlign: 'center',
              marginBottom: 16,
            }}
          >
            {member.role}
          </Text>

          {/* Social Links */}
          <View style={{ 
            flexDirection: 'row', 
            gap: 12,
            marginBottom: 16,
          }}>
            <SocialButton icon="instagram" />
            <SocialButton icon="twitter" />
            <SocialButton icon="linkedin" />
            <SocialButton icon="message-text" />
            <SocialButton icon="dots-horizontal" />
          </View>

          {/* Request Card Button */}
          <Button
            mode="outlined"
            icon="credit-card-outline"
            onPress={() => {}}
            style={{ 
              marginBottom: 24,
              width: '100%',
              borderRadius: 20,
            }}
            contentStyle={{ height: 40 }}
          >
            Request Card
          </Button>
        </View>

        {/* Tabs Container */}
        <View style={styles.tabsContainer}>
          <View style={styles.tabsRow}>
            {tabs.map((tab, index) => (
              <Pressable
                key={tab}
                onPress={() => handleTabPress(tab, index)}
                style={styles.tabButton}
              >
                <Text
                  variant="titleMedium"
                  style={[
                    styles.tabText,
                    activeTab === tab && styles.activeTabText
                  ]}
                >
                  {tab}
                </Text>
                {activeTab === tab && <View style={styles.activeTabIndicator} />}
              </Pressable>
            ))}
          </View>

          {renderTabContent()}
        </View>
      </Animated.View>
    </View>
  );
};

const styles = {
  pageIndicatorContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  pageIndicator: {
    fontSize: 16,
    fontWeight: '500',
  },
  currentPage: {
    color: theme.colors.primary,
    fontWeight: '600',
  },
  pageSeparator: {
    color: theme.colors.onSurfaceVariant,
  },
  totalPages: {
    color: theme.colors.onSurfaceVariant,
  },
  tabsContainer: {
    marginHorizontal: 16,
    backgroundColor: theme.colors.surface,
    borderRadius: 12,
    overflow: 'hidden',
  },
  tabsRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.surfaceVariant,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 16,
    position: 'relative',
  },
  tabText: {
    color: theme.colors.onSurfaceVariant,
  },
  activeTabText: {
    color: theme.colors.primary,
  },
  activeTabIndicator: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: theme.colors.primary,
  },
  tabScrollView: {
    flexGrow: 0,
  },
  tabScrollContent: {
    flexGrow: 0,
  },
  tabPage: {
    padding: 16,
  },
  tabContent: {
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    marginBottom: 8,
    fontWeight: 'bold',
  },
  link: {
    color: theme.colors.primary,
  },
  emptyState: {
    textAlign: 'center',
    color: theme.colors.onSurfaceVariant,
    fontStyle: 'italic',
  },
  videoPreview: {
    height: 200,
    backgroundColor: '#E0E0E0',
    borderRadius: 12,
    marginBottom: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
    height: 56,
    backgroundColor: 'transparent',
  },
}; 