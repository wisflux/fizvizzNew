import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StatusBar,
  Dimensions,
} from 'react-native';
import { Ionicons, MaterialIcons, AntDesign, Entypo, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

// Sample groups and communities data
const groupsData = [
  {
    id: 1,
    icon: 'clock-o',
    iconType: 'FontAwesome',
    iconColor: '#4ECDC4',
    backgroundColor: '#4ECDC4',
    time: '02:35am',
    title: 'Training, Networking and Communication',
    memberCount: '+50k',
    type: 'group',
    memberType: 'Members',
    notificationCount: 6,
  },
  {
    id: 2,
    icon: 'chat-bubble-outline',
    iconType: 'MaterialIcons',
    iconColor: '#fff',
    backgroundColor: '#059669',
    time: '02:35am',
    title: 'Business Group',
    memberCount: '30k',
    type: 'group',
    memberType: 'Members',
    notificationCount: 32,
  },
  {
    id: 3,
    icon: 'triangle',
    iconType: 'Entypo',
    iconColor: '#fff',
    backgroundColor: '#047857',
    time: null,
    title: 'Operations and Compliance',
    memberCount: '+10k',
    type: 'group',
    memberType: 'Members',
    notificationCount: null,
  },
];

const communitiesData = [
  {
    id: 4,
    icon: 'bird',
    iconType: 'FontAwesome5',
    iconColor: '#fff',
    backgroundColor: '#1e3a8a',
    time: '02:35am',
    title: 'Project Proposal, Approval, and Execution',
    memberCount: '+30k',
    groupsCount: 12,
    type: 'community',
    memberType: 'Members',
    notificationCount: 3,
  },
  {
    id: 5,
    icon: 'handshake',
    iconType: 'MaterialCommunityIcons',
    iconColor: '#fff',
    backgroundColor: '#dc2626',
    time: null,
    title: 'ACOPS Collaboration',
    memberCount: '+5k',
    groupsCount: 8,
    type: 'community',
    memberType: 'Members',
    notificationCount: null,
  },
];

// Sample group detail data
const groupDetailData = {
  posts: [
    {
      id: 1,
      author: {
        name: 'Dianne Russell',
        title: 'Senior manager - Production an...',
        avatar: 'A',
        avatarColor: '#1e3a8a',
      },
      timestamp: '2 month',
      content: 'News feed UI design concept app blog clean design feeds ios news newspaper ui ux ux?',
      hasImage: true,
      imageShapes: ['triangle', 'square', 'circle'],
      poll: {
        id: 'poll1',
        options: [
          { id: 'A', label: 'Option A', votes: 10 },
          { id: 'B', label: 'Option B', votes: 10 },
          { id: 'C', label: 'Option C', votes: 10 },
        ],
        totalVotes: 30,
      },
      tags: ['Votes count']
    }
  ]
};

// Sample group info data
const groupInfoData = {
  title: 'Training, Networking and Communication',
  createdBy: 'Thomas Dravid',
  description: 'Lorem ipsum dolor sit amet consectetur. Purus ultrices arcu tempus ipsu....',
  stats: {
    members: 220,
    cards: 220,
    posts: 24
  },
  members: [
    {
      id: 1,
      name: 'Jordyn Franci',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150',
      title: null,
      profileData: {
        name: "Jordyn Franci",
        title: "UX Designer • Product Design at Creative Solutions Inc",
        image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150",
        website: "www.jordynfranci.com",
        bio: "Creative UX designer with 5+ years experience in user-centered design and prototyping.",
        videoThumbnail: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        seeking: [
          {
            title: "I am seeking creative design partnerships",
            description: "Let's create amazing user experiences together! 🎨"
          }
        ],
        services: [
          {
            title: "UX/UI Design",
            description: "Complete user experience design from research to final implementation...",
            image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
          },
          {
            title: "Design System",
            description: "Building scalable and consistent design systems for modern applications...",
            image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
          }
        ]
      }
    },
    {
      id: 2,
      name: 'Marcus Vaccaro',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      title: 'Senior Developer',
      profileData: {
        name: "Marcus Vaccaro",
        title: "Senior Developer • Full Stack Development at Tech Innovations Ltd",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
        website: "www.marcusvaccaro.dev",
        bio: "Full-stack developer specializing in React, Node.js, and cloud architecture solutions.",
        videoThumbnail: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        seeking: [
          {
            title: "I am seeking development collaborations",
            description: "Open to exciting new tech projects! 💻"
          }
        ],
        services: [
          {
            title: "Full Stack Development",
            description: "End-to-end web application development using modern technologies...",
            image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
          },
          {
            title: "Cloud Architecture",
            description: "Designing and implementing scalable cloud infrastructure solutions...",
            image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
          }
        ]
      }
    },
    {
      id: 3,
      name: 'Marcus Vaccaro',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
      title: 'Senior Developer',
      profileData: {
        name: "Marcus Vaccaro",
        title: "Senior Developer • Full Stack Development at Tech Innovations Ltd",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
        website: "www.marcusvaccaro.dev",
        bio: "Full-stack developer specializing in React, Node.js, and cloud architecture solutions.",
        videoThumbnail: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        seeking: [
          {
            title: "I am seeking development collaborations",
            description: "Open to exciting new tech projects! 💻"
          }
        ],
        services: [
          {
            title: "Full Stack Development",
            description: "End-to-end web application development using modern technologies...",
            image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
          },
          {
            title: "Cloud Architecture",
            description: "Designing and implementing scalable cloud infrastructure solutions...",
            image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
          }
        ]
      }
    },
    {
      id: 4,
      name: 'Marcus Vaccaro',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
      title: 'Senior Developer',
      profileData: {
        name: "Marcus Vaccaro",
        title: "Senior Developer • Full Stack Development at Tech Innovations Ltd",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
        website: "www.marcusvaccaro.dev",
        bio: "Full-stack developer specializing in React, Node.js, and cloud architecture solutions.",
        videoThumbnail: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        seeking: [
          {
            title: "I am seeking development collaborations",
            description: "Open to exciting new tech projects! 💻"
          }
        ],
        services: [
          {
            title: "Full Stack Development",
            description: "End-to-end web application development using modern technologies...",
            image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
          },
          {
            title: "Cloud Architecture",
            description: "Designing and implementing scalable cloud infrastructure solutions...",
            image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
          }
        ]
      }
    },
    {
      id: 5,
      name: 'Marcus Vaccaro',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
      title: 'Senior Developer',
      profileData: {
        name: "Marcus Vaccaro",
        title: "Senior Developer • Full Stack Development at Tech Innovations Ltd",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
        website: "www.marcusvaccaro.dev",
        bio: "Full-stack developer specializing in React, Node.js, and cloud architecture solutions.",
        videoThumbnail: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        seeking: [
          {
            title: "I am seeking development collaborations",
            description: "Open to exciting new tech projects! 💻"
          }
        ],
        services: [
          {
            title: "Full Stack Development",
            description: "End-to-end web application development using modern technologies...",
            image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
          },
          {
            title: "Cloud Architecture",
            description: "Designing and implementing scalable cloud infrastructure solutions...",
            image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
          }
        ]
      }
    }
  ]
};

function GroupsScreen() {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState('Groups');
  const [activeFilter, setActiveFilter] = useState('All'); // 'All', 'Groups', 'Communities'
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [showGroupInfo, setShowGroupInfo] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [currentMemberIndex, setCurrentMemberIndex] = useState(0);
  const [profileActiveTab, setProfileActiveTab] = useState('Services');
  const [userVotes, setUserVotes] = useState({}); // Track user votes for polls
  const [muteNotifications, setMuteNotifications] = useState(false);
  const memberScrollRef = useRef(null);

  const renderGroupIcon = (item) => {
    const iconProps = {
      name: item.icon,
      size: 24,
      color: item.iconColor,
    };

    switch (item.iconType) {
      case 'FontAwesome':
        return <FontAwesome5 {...iconProps} />;
      case 'FontAwesome5':
        return <FontAwesome5 {...iconProps} />;
      case 'MaterialCommunityIcons':
        return <MaterialCommunityIcons {...iconProps} />;
      case 'MaterialIcons':
        return <MaterialIcons {...iconProps} />;
      case 'Entypo':
        return <Entypo {...iconProps} />;
      default:
        return <Ionicons {...iconProps} />;
    }
  };

  const renderMemberAvatars = () => (
    <View style={styles.memberAvatars}>
      <View style={[styles.avatar, { zIndex: 3 }]} />
      <View style={[styles.avatar, { marginLeft: -8, zIndex: 2 }]} />
      <View style={[styles.avatar, { marginLeft: -8, zIndex: 1 }]} />
    </View>
  );

  const renderItem = (item) => (
    <TouchableOpacity 
      key={item.id} 
      style={styles.groupItem}
      onPress={() => setSelectedGroup(item)}
    >
      <View style={styles.groupContent}>
        <View style={[styles.groupIcon, { backgroundColor: item.backgroundColor }]}>
          {renderGroupIcon(item)}
        </View>
        
        <View style={styles.groupInfo}>
          <View style={styles.groupHeader}>
            {item.time && <Text style={styles.timeText}>{item.time}</Text>}
            {item.notificationCount && (
              <View style={styles.notificationBadge}>
                <Text style={styles.notificationText}>{item.notificationCount}</Text>
              </View>
            )}
          </View>
          
          <Text style={styles.groupTitle}>{item.title}</Text>
          
          <View style={styles.memberInfo}>
            {renderMemberAvatars()}
            {item.type === 'community' ? (
              <View style={styles.communityStats}>
                <Text style={styles.memberCount}>
                  {item.groupsCount} <Text style={styles.memberType}>Groups</Text>
                </Text>
                <Text style={styles.statSeparator}>•</Text>
                <Text style={styles.memberCount}>
                  {item.memberCount} <Text style={styles.memberType}>{item.memberType}</Text>
                </Text>
              </View>
            ) : (
              <Text style={styles.memberCount}>
                {item.memberCount} <Text style={styles.memberType}>{item.memberType}</Text>
              </Text>
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  const getFilteredData = () => {
    const allData = [...groupsData, ...communitiesData];
    switch (activeFilter) {
      case 'Groups':
        return groupsData;
      case 'Communities':
        return communitiesData;
      default:
        return allData;
    }
  };

  const getFilteredGroups = () => {
    return activeFilter === 'All' || activeFilter === 'Groups' ? groupsData : [];
  };

  const getFilteredCommunities = () => {
    return activeFilter === 'All' || activeFilter === 'Communities' ? communitiesData : [];
  };

  const handleMemberPrevious = () => {
    if (currentMemberIndex > 0) {
      const newIndex = currentMemberIndex - 1;
      setCurrentMemberIndex(newIndex);
      setSelectedMember(groupInfoData.members[newIndex]);
      memberScrollRef.current?.scrollTo({
        x: newIndex * width,
        animated: true,
      });
    }
  };

  const handleMemberNext = () => {
    if (currentMemberIndex < groupInfoData.members.length - 1) {
      const newIndex = currentMemberIndex + 1;
      setCurrentMemberIndex(newIndex);
      setSelectedMember(groupInfoData.members[newIndex]);
      memberScrollRef.current?.scrollTo({
        x: newIndex * width,
        animated: true,
      });
    }
  };

  const handleMemberScroll = (event) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(contentOffsetX / width);
    if (newIndex !== currentMemberIndex && newIndex >= 0 && newIndex < groupInfoData.members.length) {
      setCurrentMemberIndex(newIndex);
      setSelectedMember(groupInfoData.members[newIndex]);
    }
  };

  const handleVote = (pollId, optionId) => {
    setUserVotes(prev => ({
      ...prev,
      [pollId]: optionId
    }));
  };

  const renderShapes = () => (
    <View style={styles.shapesContainer}>
      <View style={[styles.shape, styles.triangle]} />
      <View style={[styles.shape, styles.square]} />
      <View style={[styles.shape, styles.circle]} />
    </View>
  );

  const renderPollOption = (option, pollId, totalVotes) => {
    const userVote = userVotes[pollId];
    const isSelected = userVote === option.id;
    const percentage = totalVotes > 0 ? Math.round((option.votes / totalVotes) * 100) : 0;
    
    return (
      <TouchableOpacity
        key={option.id}
        style={[styles.pollOption, isSelected && styles.selectedPollOption]}
        onPress={() => handleVote(pollId, option.id)}
      >
        <View style={styles.pollOptionContent}>
          <View style={styles.pollOptionLeft}>
            <Ionicons 
              name={isSelected ? "checkmark-circle" : "ellipse-outline"} 
              size={20} 
              color={isSelected ? "#3B82F6" : "#3B82F6"} 
            />
            <Text style={styles.pollOptionText}>{option.label}</Text>
          </View>
          <Text style={styles.pollPercentage}>{percentage}%</Text>
        </View>
        <View style={styles.pollProgress}>
          <View style={[styles.pollProgressBar, { width: `${percentage}%` }]} />
        </View>
      </TouchableOpacity>
    );
  };

  const renderMemberProfile = (member) => {
    const profile = member.profileData;
    
    return (
      <View key={member.id} style={styles.memberProfileContainer}>
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {/* Profile Section */}
          <View style={styles.profileSection}>
            <View style={styles.profileImageContainer}>
              <View style={[styles.profileImagePlaceholder, { backgroundColor: '#E5E7EB' }]} />
            </View>
            <Text style={styles.profileName}>{profile.name}</Text>
            <Text style={styles.profileTitle}>
              {profile.title}
            </Text>
            
            {/* Social Icons */}
            <View style={styles.socialIcons}>
              <TouchableOpacity style={styles.socialIcon}>
                <AntDesign name="instagram" size={20} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialIcon}>
                <AntDesign name="twitter" size={20} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialIcon}>
                <AntDesign name="linkedin-square" size={20} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialIcon}>
                <MaterialIcons name="message" size={20} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialIcon}>
                <Entypo name="dots-three-horizontal" size={20} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Seeking Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Seeking</Text>
              <TouchableOpacity>
                <Ionicons name="add" size={24} color="#000" />
              </TouchableOpacity>
            </View>
            
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.seekingContainer}>
              {profile.seeking.map((item, index) => (
                <View key={index} style={[styles.seekingCard, index > 0 && { marginLeft: 12 }]}>
                  <Text style={styles.seekingTitle}>{item.title}</Text>
                  <Text style={styles.seekingDescription}>{item.description}</Text>
                  <TouchableOpacity style={styles.labelButton}>
                    <Text style={styles.labelButtonText}>Label</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
          </View>

          {/* Website Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Website</Text>
            <TouchableOpacity>
              <Text style={styles.websiteLink}>{profile.website}</Text>
            </TouchableOpacity>
          </View>

          {/* Bio Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Bio</Text>
            <Text style={styles.bioText}>
              {profile.bio}
            </Text>
          </View>

          {/* Video Section */}
          <View style={styles.section}>
            <View style={styles.videoContainer}>
              <View style={styles.videoThumbnailPlaceholder} />
              <TouchableOpacity style={styles.playButton}>
                <Ionicons name="play" size={32} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Offerings Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Offerings</Text>
              <View style={styles.rightActions}>
                <TouchableOpacity>
                  <Ionicons name="add" size={24} color="#000" />
                </TouchableOpacity>
                <TouchableOpacity style={{ marginLeft: 8 }}>
                  <MaterialIcons name="edit" size={24} color="#000" />
                </TouchableOpacity>
              </View>
            </View>

            {/* Tabs */}
            <View style={styles.tabContainer}>
              <TouchableOpacity 
                style={[styles.tab, profileActiveTab === 'Services' && styles.activeTab]}
                onPress={() => setProfileActiveTab('Services')}
              >
                <Text style={[styles.tabText, profileActiveTab === 'Services' && styles.activeTabText]}>
                  Services
                </Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.tab, profileActiveTab === 'Products' && styles.activeTab]}
                onPress={() => setProfileActiveTab('Products')}
              >
                <Text style={[styles.tabText, profileActiveTab === 'Products' && styles.activeTabText]}>
                  Products
                </Text>
              </TouchableOpacity>
            </View>

            {/* Service Cards */}
            <View style={styles.servicesContainer}>
              {profile.services.map((service, index) => (
                <View key={index} style={styles.serviceCard}>
                  <View style={styles.serviceImagePlaceholder} />
                  <View style={styles.serviceContent}>
                    <View style={styles.serviceHeader}>
                      <Text style={styles.serviceTitle}>{service.title}</Text>
                      <TouchableOpacity>
                        <MaterialIcons name="open-in-new" size={20} color="#666" />
                      </TouchableOpacity>
                    </View>
                    <Text style={styles.serviceDescription}>
                      {service.description}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </View>

          <View style={{ height: 50 }} />
        </ScrollView>
      </View>
    );
  };

  // Member Profile Slider View
  if (selectedMember) {
    return (
      <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />
        
        {/* Navigation Bar */}
        <View style={styles.navBar}>
          <TouchableOpacity 
            style={styles.navButton} 
            onPress={() => {
              setSelectedMember(null);
              setCurrentMemberIndex(0);
            }}
          >
            <Ionicons name="arrow-back" size={24} color="#374151" />
          </TouchableOpacity>
          
          <Text style={styles.navTitle}>Public profile</Text>
          
          <TouchableOpacity 
            style={[styles.nextButton, currentMemberIndex === groupInfoData.members.length - 1 && styles.disabledButton]} 
            onPress={handleMemberNext}
            disabled={currentMemberIndex === groupInfoData.members.length - 1}
          >
            <Text style={[
              styles.nextButtonText, 
              currentMemberIndex === groupInfoData.members.length - 1 && styles.disabledButtonText
            ]}>
              Next
            </Text>
          </TouchableOpacity>
        </View>

        {/* Horizontal Member Profile Slider */}
        <ScrollView
          ref={memberScrollRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={handleMemberScroll}
          scrollEventThrottle={16}
          style={styles.horizontalScrollView}
        >
          {groupInfoData.members.map((member) => renderMemberProfile(member))}
        </ScrollView>

        {/* Profile Indicator with Navigation */}
        <View style={styles.indicatorContainer}>
          <TouchableOpacity 
            style={[styles.navArrow, styles.leftArrow, currentMemberIndex === 0 && styles.disabledArrow]}
            onPress={handleMemberPrevious}
            disabled={currentMemberIndex === 0}
          >
            <Ionicons name="chevron-back" size={20} color={currentMemberIndex === 0 ? "#ccc" : "#666"} />
          </TouchableOpacity>
          
          <View style={styles.indicators}>
            {groupInfoData.members.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.indicator,
                  currentMemberIndex === index && styles.activeIndicator
                ]}
              />
            ))}
          </View>
          
          <TouchableOpacity 
            style={[styles.navArrow, styles.rightArrow, currentMemberIndex === groupInfoData.members.length - 1 && styles.disabledArrow]}
            onPress={handleMemberNext}
            disabled={currentMemberIndex === groupInfoData.members.length - 1}
          >
            <Ionicons name="chevron-forward" size={20} color={currentMemberIndex === groupInfoData.members.length - 1 ? "#ccc" : "#666"} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  if (showGroupInfo && selectedGroup) {
    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />
        
        {/* Group Info Header */}
        <View style={styles.groupInfoHeader}>
          <TouchableOpacity style={styles.backButton} onPress={() => setShowGroupInfo(false)}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          
          <View style={styles.groupInfoHeaderCenter}>
            <View style={[styles.groupInfoIcon, { backgroundColor: selectedGroup.backgroundColor }]}>
              {renderGroupIcon(selectedGroup)}
            </View>
          </View>
          
          <TouchableOpacity style={styles.headerAction}>
            <Ionicons name="ellipsis-vertical" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Header Image */}
        <View style={styles.groupHeaderImage}>
          <View style={styles.meetingRoomImage}>
            {/* Placeholder for meeting room image */}
            <View style={styles.presentationScreen} />
          </View>
        </View>

        <ScrollView style={styles.groupInfoContent} showsVerticalScrollIndicator={false}>
          {/* Group Title */}
          <View style={styles.groupInfoTitleSection}>
            <Text style={styles.groupInfoTitle}>{groupInfoData.title}</Text>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.actionButton}>
              <View style={styles.actionButtonIcon}>
                <MaterialIcons name="handshake" size={24} color="#fff" />
              </View>
              <Text style={styles.actionButtonText}>Looking</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionButton}>
              <View style={styles.actionButtonIcon}>
                <Ionicons name="person-add" size={24} color="#fff" />
              </View>
              <Text style={styles.actionButtonText}>Add</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionButton}>
              <View style={styles.actionButtonIcon}>
                <MaterialIcons name="group-add" size={24} color="#fff" />
              </View>
              <Text style={styles.actionButtonText}>Request</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionButton}>
              <View style={styles.actionButtonIcon}>
                <Ionicons name="flag" size={24} color="#fff" />
              </View>
              <Text style={styles.actionButtonText}>Pin</Text>
            </TouchableOpacity>
          </View>

          {/* Created By */}
          <View style={styles.createdBySection}>
            <Text style={styles.createdByText}>Created By {groupInfoData.createdBy}</Text>
          </View>

          {/* Description */}
          <View style={styles.descriptionSection}>
            <Text style={styles.descriptionTitle}>Description</Text>
            <Text style={styles.descriptionText}>
              {groupInfoData.description} 
              <Text style={styles.seeMoreText}> See more</Text>
            </Text>
          </View>

          {/* Stats */}
          <View style={styles.statsSection}>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Members {groupInfoData.stats.members}</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Cards {groupInfoData.stats.cards}</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Posts {groupInfoData.stats.posts}</Text>
            </View>
          </View>

          {/* Members List */}
          <View style={styles.membersSection}>
            <View style={styles.membersHeader}>
              <Text style={styles.membersCount}>{groupInfoData.members.length} member</Text>
              <TouchableOpacity>
                <Ionicons name="search" size={20} color="#666" />
              </TouchableOpacity>
            </View>
            
            {groupInfoData.members.map((member, index) => (
              <TouchableOpacity 
                key={member.id} 
                style={styles.memberItem}
                onPress={() => {
                  setSelectedMember(member);
                  setCurrentMemberIndex(index);
                }}
              >
                <View style={styles.memberInfo}>
                  <View style={styles.memberAvatarContainer}>
                    <View style={styles.memberAvatar}>
                      {/* Using color as placeholder for actual image */}
                      <View style={[styles.memberAvatarPlaceholder, { backgroundColor: '#E5E7EB' }]} />
                    </View>
                  </View>
                  <View style={styles.memberDetails}>
                    <Text style={styles.memberName}>{member.name}</Text>
                    {member.title && (
                      <Text style={styles.memberTitle}>{member.title}</Text>
                    )}
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Menu Options */}
          <View style={styles.menuOptions}>
            <TouchableOpacity style={styles.menuOption}>
              <Ionicons name="notifications-off" size={20} color="#666" />
              <Text style={styles.menuOptionText}>Mute notification</Text>
              <TouchableOpacity 
                style={[styles.toggle, muteNotifications && styles.toggleActive]}
                onPress={() => setMuteNotifications(!muteNotifications)}
              >
                <View style={[styles.toggleThumb, muteNotifications && styles.toggleThumbActive]} />
              </TouchableOpacity>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuOption}>
              <MaterialIcons name="rule" size={20} color="#666" />
              <Text style={styles.menuOptionText}>Rules</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuOption}>
              <Ionicons name="settings" size={20} color="#666" />
              <Text style={styles.menuOptionText}>Group setting</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuOption}>
              <Ionicons name="time" size={20} color="#666" />
              <Text style={styles.menuOptionText}>invite history</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuOption}>
              <Ionicons name="person-add" size={20} color="#666" />
              <Text style={styles.menuOptionText}>Invite to group</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuOption}>
              <MaterialIcons name="delete" size={20} color="#EF4444" />
              <Text style={[styles.menuOptionText, { color: '#EF4444' }]}>Delete group</Text>
            </TouchableOpacity>
          </View>

          <View style={{ height: 50 }} />
        </ScrollView>
      </View>
    );
  }

  if (selectedGroup) {
    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />
        
        {/* Group Detail Header */}
        <View style={styles.groupDetailHeader}>
          <TouchableOpacity style={styles.backButton} onPress={() => setSelectedGroup(null)}>
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.groupDetailInfo} onPress={() => setShowGroupInfo(true)}>
            <View style={[styles.groupDetailIcon, { backgroundColor: selectedGroup.backgroundColor }]}>
              {renderGroupIcon(selectedGroup)}
            </View>
            <View style={styles.groupDetailText}>
              <Text style={styles.groupDetailTitle}>Training,...</Text>
              <Text style={styles.groupDetailSubtitle}>Supporting line...</Text>
            </View>
          </TouchableOpacity>
          
          <View style={styles.groupDetailActions}>
            <TouchableOpacity style={styles.headerAction}>
              <Ionicons name="search" size={20} color="#666" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerAction}>
              <MaterialIcons name="article" size={20} color="#666" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerAction}>
              <Ionicons name="ellipsis-vertical" size={20} color="#666" />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView style={styles.groupDetailContent} showsVerticalScrollIndicator={false}>
          {/* Today Section */}
          <View style={styles.sectionDivider}>
            <Text style={styles.sectionDividerText}>Today</Text>
          </View>

          {/* Posts */}
          {groupDetailData.posts.map((post) => (
            <View key={post.id} style={styles.post}>
              {/* Post Header */}
              <View style={styles.postHeader}>
                <View style={styles.postAuthor}>
                  <View style={[styles.authorAvatar, { backgroundColor: post.author.avatarColor }]}>
                    <Text style={styles.authorAvatarText}>{post.author.avatar}</Text>
                  </View>
                  <View style={styles.authorInfo}>
                    <Text style={styles.authorName}>{post.author.name}</Text>
                    <Text style={styles.authorTitle}>{post.author.title}</Text>
                    <Text style={styles.postTimestamp}>{post.timestamp}</Text>
                  </View>
                </View>
                <TouchableOpacity style={styles.postMenu}>
                  <Ionicons name="ellipsis-vertical" size={20} color="#666" />
                </TouchableOpacity>
              </View>

              {/* Post Tags */}
              {post.tags && (
                <View style={styles.postTags}>
                  {post.tags.map((tag, index) => (
                    <View key={index} style={styles.postTag}>
                      <Text style={styles.postTagText}>{tag}</Text>
                    </View>
                  ))}
                </View>
              )}

              {/* Post Content */}
              <Text style={styles.postContent}>{post.content}</Text>

              {/* Post Image */}
              {post.hasImage && (
                <View style={styles.postImage}>
                  {renderShapes()}
                </View>
              )}

              {/* Poll */}
              {post.poll && (
                <View style={styles.poll}>
                  {post.poll.options.map((option) =>
                    renderPollOption(option, post.poll.id, post.poll.totalVotes)
                  )}
                </View>
              )}
            </View>
          ))}
        </ScrollView>

        {/* Floating Action Button */}
        <TouchableOpacity style={styles.fab}>
          <Ionicons name="add" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.menuButton}>
          <MaterialIcons name="menu" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Groups</Text>
        <View style={styles.headerRight} />
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <TextInput
            style={styles.searchInput}
            placeholder="Hinted search text"
            placeholderTextColor="#9CA3AF"
          />
          <TouchableOpacity style={styles.searchIcon}>
            <Ionicons name="search" size={20} color="#9CA3AF" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Filter Tabs */}
      <View style={styles.filterContainer}>
        <View style={styles.filterTabs}>
          <TouchableOpacity 
            style={[styles.filterTab, activeFilter === 'All' && styles.activeFilterTab]}
            onPress={() => setActiveFilter('All')}
          >
            <Text style={[styles.filterTabText, activeFilter === 'All' && styles.activeFilterTabText]}>
              All ({groupsData.length + communitiesData.length})
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.filterTab, activeFilter === 'Groups' && styles.activeFilterTab]}
            onPress={() => setActiveFilter('Groups')}
          >
            <View style={styles.filterTabContent}>
              <Ionicons name="people-circle" size={16} color={activeFilter === 'Groups' ? '#059669' : '#6B7280'} />
              <Text style={[styles.filterTabText, activeFilter === 'Groups' && styles.activeFilterTabText]}>
                Groups ({groupsData.length})
              </Text>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.filterTab, activeFilter === 'Communities' && styles.activeFilterTab]}
            onPress={() => setActiveFilter('Communities')}
          >
            <View style={styles.filterTabContent}>
              <Ionicons name="globe" size={16} color={activeFilter === 'Communities' ? '#7C3AED' : '#6B7280'} />
              <Text style={[styles.filterTabText, activeFilter === 'Communities' && styles.activeFilterTabText]}>
                Communities ({communitiesData.length})
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* Groups and Communities List */}
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {activeFilter === 'All' && (
          <>
            {/* Groups Section */}
            {getFilteredGroups().length > 0 && (
              <>
                <View style={styles.sectionHeader}>
                  <View style={styles.sectionTitleContainer}>
                    <Ionicons name="people-circle" size={20} color="#059669" />
                    <Text style={styles.sectionTitle}>Groups</Text>
                    <View style={styles.sectionCount}>
                      <Text style={styles.sectionCountText}>{getFilteredGroups().length}</Text>
                    </View>
                  </View>
                </View>
                
                {getFilteredGroups().map((item) => renderItem(item))}
              </>
            )}

            {/* Communities Section */}
            {getFilteredCommunities().length > 0 && (
              <>
                <View style={[styles.sectionHeader, { marginTop: getFilteredGroups().length > 0 ? 24 : 0 }]}>
                  <View style={styles.sectionTitleContainer}>
                    <Ionicons name="globe" size={20} color="#7C3AED" />
                    <Text style={styles.sectionTitle}>Communities</Text>
                    <View style={styles.sectionCount}>
                      <Text style={styles.sectionCountText}>{getFilteredCommunities().length}</Text>
                    </View>
                  </View>
                </View>
                
                {getFilteredCommunities().map((item) => renderItem(item))}
              </>
            )}
          </>
        )}

        {activeFilter === 'Groups' && (
          <>
            {getFilteredGroups().map((item) => renderItem(item))}
          </>
        )}

        {activeFilter === 'Communities' && (
          <>
            {getFilteredCommunities().map((item) => renderItem(item))}
          </>
        )}
        
        <View style={{ height: 20 }} />
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity style={styles.fab}>
        <Ionicons name="add" size={24} color="#fff" />
      </TouchableOpacity>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => setActiveTab('Home')}>
          <Ionicons name="home-outline" size={24} color={activeTab === 'Home' ? '#3B82F6' : '#9CA3AF'} />
          <Text style={[styles.navText, { color: activeTab === 'Home' ? '#3B82F6' : '#9CA3AF' }]}>Home</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem} onPress={() => setActiveTab('Cards')}>
          <MaterialIcons name="credit-card" size={24} color={activeTab === 'Cards' ? '#3B82F6' : '#9CA3AF'} />
          <Text style={[styles.navText, { color: activeTab === 'Cards' ? '#3B82F6' : '#9CA3AF' }]}>Cards</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem} onPress={() => setActiveTab('scan')}>
          <MaterialIcons name="qr-code-scanner" size={24} color={activeTab === 'scan' ? '#3B82F6' : '#9CA3AF'} />
          <Text style={[styles.navText, { color: activeTab === 'scan' ? '#3B82F6' : '#9CA3AF' }]}>scan</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={[styles.navItem, styles.activeNavItem]} onPress={() => setActiveTab('Groups')}>
          <View style={styles.activeNavBackground}>
            <Ionicons name="people" size={24} color="#3B82F6" />
          </View>
          <Text style={[styles.navText, { color: '#3B82F6' }]}>Groups</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem} onPress={() => setActiveTab('Events')}>
          <View style={styles.eventsIconContainer}>
            <MaterialIcons name="event" size={24} color={activeTab === 'Events' ? '#3B82F6' : '#9CA3AF'} />
            <View style={styles.eventsBadge}>
              <Text style={styles.eventsBadgeText}>3</Text>
            </View>
          </View>
          <Text style={[styles.navText, { color: activeTab === 'Events' ? '#3B82F6' : '#9CA3AF' }]}>Events</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <GroupsScreen />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#fff',
  },
  menuButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
    flex: 1,
    marginLeft: 16,
  },
  headerRight: {
    width: 32,
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
  searchIcon: {
    marginLeft: 8,
  },
  filterContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  filterTabs: {
    flexDirection: 'row',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    padding: 4,
  },
  filterTab: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeFilterTab: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  filterTabContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  filterTabText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#6B7280',
  },
  activeFilterTabText: {
    color: '#1F2937',
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
  },
  groupItem: {
    marginBottom: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
    paddingBottom: 16,
  },
  groupContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  groupIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  groupInfo: {
    flex: 1,
  },
  groupHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  sectionHeader: {
    paddingVertical: 12,
    marginBottom: 8,
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
  },
  sectionCount: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  sectionCountText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6B7280',
  },
  groupBadge: {
    backgroundColor: '#D1FAE5',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#059669',
  },
  groupBadgeText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#059669',
  },
  communityBadge: {
    backgroundColor: '#EDE9FE',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#7C3AED',
  },
  communityBadgeText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#7C3AED',
  },
  timeText: {
    fontSize: 12,
    color: '#6B7280',
  },
  notificationBadge: {
    backgroundColor: '#3B82F6',
    borderRadius: 12,
    minWidth: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  notificationText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  groupTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
    marginBottom: 8,
    lineHeight: 20,
  },
  memberInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  memberAvatars: {
    flexDirection: 'row',
    marginRight: 8,
  },
  avatar: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#D1D5DB',
    borderWidth: 1,
    borderColor: '#fff',
  },
  memberCount: {
    fontSize: 13,
    color: '#000',
    fontWeight: '500',
  },
  memberType: {
    color: '#6B7280',
    fontWeight: '400',
  },
  communityStats: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statSeparator: {
    fontSize: 13,
    color: '#D1D5DB',
    fontWeight: '500',
  },
  fab: {
    position: 'absolute',
    bottom: 100,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: '#374151',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingTop: 8,
    paddingBottom: 24,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
    position: 'relative',
  },
  activeNavItem: {
    // Additional styling for active nav item if needed
  },
  activeNavBackground: {
    backgroundColor: '#EBF4FF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 4,
  },
  navText: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: 4,
  },
  eventsIconContainer: {
    position: 'relative',
  },
  eventsBadge: {
    position: 'absolute',
    top: -6,
    right: -8,
    backgroundColor: '#EF4444',
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  eventsBadgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '600',
  },
  // Group Detail Styles
  groupDetailHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  backButton: {
    padding: 8,
    marginRight: 8,
  },
  groupDetailInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  groupDetailIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  groupDetailText: {
    flex: 1,
  },
  groupDetailTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  groupDetailSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
  groupDetailActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerAction: {
    padding: 8,
  },
  groupDetailContent: {
    flex: 1,
    backgroundColor: '#fff',
  },
  sectionDivider: {
    alignItems: 'center',
    paddingVertical: 16,
    backgroundColor: '#F9FAFB',
  },
  sectionDividerText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
  post: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  postAuthor: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  authorAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  authorAvatarText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  authorInfo: {
    flex: 1,
  },
  authorName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 2,
  },
  authorTitle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  postTimestamp: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  postMenu: {
    padding: 4,
  },
  postTags: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  postTag: {
    backgroundColor: '#DBEAFE',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
    marginRight: 8,
  },
  postTagText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#1D4ED8',
  },
  postContent: {
    fontSize: 16,
    lineHeight: 24,
    color: '#000',
    marginBottom: 16,
  },
  postImage: {
    backgroundColor: '#E5E7EB',
    borderRadius: 12,
    height: 200,
    marginBottom: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  shapesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  shape: {
    backgroundColor: '#9CA3AF',
  },
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 25,
    borderRightWidth: 25,
    borderBottomWidth: 43,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#9CA3AF',
  },
  square: {
    width: 50,
    height: 50,
    borderRadius: 8,
  },
  circle: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  poll: {
    gap: 12,
  },
  pollOption: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#fff',
  },
  selectedPollOption: {
    borderColor: '#3B82F6',
    backgroundColor: '#F8FAFC',
  },
  pollOptionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  pollOptionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  pollOptionText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
  },
  pollPercentage: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  pollProgress: {
    height: 4,
    backgroundColor: '#E5E7EB',
    borderRadius: 2,
    overflow: 'hidden',
  },
  pollProgressBar: {
    height: '100%',
    backgroundColor: '#3B82F6',
    borderRadius: 2,
  },
  // Group Info Styles
  groupInfoHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 16,
    backgroundColor: 'transparent',
  },
  groupInfoHeaderCenter: {
    flex: 1,
    alignItems: 'center',
  },
  groupInfoIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  groupHeaderImage: {
    height: 200,
    backgroundColor: '#1F2937',
    justifyContent: 'center',
    alignItems: 'center',
  },
  meetingRoomImage: {
    width: '80%',
    height: 120,
    backgroundColor: '#374151',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  presentationScreen: {
    width: '70%',
    height: '60%',
    backgroundColor: '#F3F4F6',
    borderRadius: 4,
  },
  groupInfoContent: {
    flex: 1,
    backgroundColor: '#fff',
  },
  groupInfoTitleSection: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  groupInfoTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000',
    lineHeight: 32,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  actionButton: {
    alignItems: 'center',
    gap: 8,
  },
  actionButtonIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#3B82F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionButtonText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#6B7280',
  },
  createdBySection: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  createdByText: {
    fontSize: 14,
    color: '#6B7280',
  },
  descriptionSection: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    marginBottom: 8,
  },
  descriptionText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#6B7280',
  },
  seeMoreText: {
    color: '#3B82F6',
    fontWeight: '500',
  },
  statsSection: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 16,
  },
  statItem: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  statLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
  membersSection: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  membersHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  membersCount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  memberItem: {
    paddingVertical: 12,
  },
  memberInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  memberAvatarContainer: {
    marginRight: 12,
  },
  memberAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
  },
  memberAvatarPlaceholder: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
  memberDetails: {
    flex: 1,
  },
  memberName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
    marginBottom: 2,
  },
  memberTitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  menuOptions: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  menuOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    gap: 12,
  },
  menuOptionText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: '#374151',
  },
  toggle: {
    width: 44,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#E5E7EB',
    justifyContent: 'center',
    paddingHorizontal: 2,
  },
  toggleActive: {
    backgroundColor: '#3B82F6',
  },
  toggleThumb: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
    alignSelf: 'flex-start',
  },
  toggleThumbActive: {
    alignSelf: 'flex-end',
  },
  // Profile Page Styles
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    minHeight: 56,
  },
  navButton: {
    padding: 8,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    textAlign: 'center',
    flex: 1,
  },
  nextButton: {
    paddingHorizontal: 8,
    paddingVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2563eb',
  },
  profileSection: {
    alignItems: 'center',
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  profileImageContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 16,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  profileImagePlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  profileName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000',
    marginBottom: 8,
  },
  profileTitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 24,
  },
  socialIcons: {
    flexDirection: 'row',
    gap: 12,
  },
  socialIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  section: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  rightActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
  },
  seekingContainer: {
    flexDirection: 'row',
  },
  seekingCard: {
    backgroundColor: '#f8f9ff',
    borderRadius: 12,
    padding: 16,
    width: width * 0.7,
    borderWidth: 1,
    borderColor: '#e8eaff',
  },
  seekingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 8,
    lineHeight: 22,
  },
  seekingDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
    lineHeight: 20,
  },
  labelButton: {
    backgroundColor: '#2563eb',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  labelButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  websiteLink: {
    fontSize: 16,
    color: '#2563eb',
    textDecorationLine: 'underline',
  },
  bioText: {
    fontSize: 16,
    color: '#000',
    lineHeight: 24,
  },
  videoContainer: {
    position: 'relative',
    borderRadius: 12,
    overflow: 'hidden',
  },
  videoThumbnailPlaceholder: {
    width: '100%',
    height: 200,
    backgroundColor: '#f0f0f0',
  },
  playButton: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -25 }, { translateY: -25 }],
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 4,
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 6,
  },
  activeTab: {
    backgroundColor: '#2563eb',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  activeTabText: {
    color: '#fff',
  },
  servicesContainer: {
    gap: 16,
  },
  serviceCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  serviceImagePlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
    backgroundColor: '#f0f0f0',
  },
  serviceContent: {
    flex: 1,
  },
  serviceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  serviceTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  serviceDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  // Member Profile Slider Styles
  memberProfileContainer: {
    width: width,
  },
  horizontalScrollView: {
    flex: 1,
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  indicators: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#e5e7eb',
    marginHorizontal: 4,
  },
  activeIndicator: {
    backgroundColor: '#2563eb',
    width: 24,
  },
  navArrow: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  leftArrow: {
    marginRight: 16,
  },
  rightArrow: {
    marginLeft: 16,
  },
  disabledArrow: {
    opacity: 0.3,
  },
  disabledButton: {
    opacity: 0.5,
  },
  disabledButtonText: {
    color: '#ccc',
  },
});
