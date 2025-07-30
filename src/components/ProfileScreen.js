import React, { useState } from 'react';
import { View, ScrollView, Image, Pressable, Linking } from 'react-native';
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

const ServiceCard = ({ image, title, description, onPress }) => (
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
      onPress={onPress}
      style={({ pressed }) => ({
        flexDirection: 'row',
        padding: 12,
        backgroundColor: pressed ? '#F5F7FA' : 'white',
      })}
    >
      <Image
        source={image}
        style={{
          width: 60,
          height: 60,
          borderRadius: 8,
          marginRight: 12,
        }}
      />
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

export const ProfileScreen = ({ onBack }) => {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState('Profile');

  return (
    <View style={{ 
      flex: 1, 
      backgroundColor: '#F5F7FA',
      paddingTop: insets.top,
    }}>
      {/* Header */}
      <View style={{ 
        flexDirection: 'row', 
        alignItems: 'center',
        paddingHorizontal: 4,
        height: 56,
      }}>
        <IconButton
          icon="arrow-left"
          size={24}
          onPress={onBack}
        />
      </View>

      <ScrollView>
        {/* Profile Info */}
        <View style={{ alignItems: 'center', paddingHorizontal: 16 }}>
          <Avatar.Image
            size={80}
            source={{ uri: 'https://example.com/jane-cooper.jpg' }}
          />
          <Text 
            variant="headlineSmall" 
            style={{ marginTop: 16, marginBottom: 4 }}
          >
            Jane Cooper
          </Text>
          <Text
            variant="bodyMedium"
            style={{ 
              color: theme.colors.onSurfaceVariant,
              textAlign: 'center',
              marginBottom: 16,
            }}
          >
            Senior manager - Production and finance at Papaya private limited
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

          {/* Action Buttons */}
          <View style={{ 
            flexDirection: 'row', 
            gap: 12,
            marginBottom: 24,
          }}>
            <Button
              mode="outlined"
              icon="phone"
              onPress={() => {}}
              style={{ flex: 1 }}
              contentStyle={{ height: 40 }}
            >
              Call
            </Button>
            <Button
              mode="outlined"
              icon="message-text"
              onPress={() => {}}
              style={{ flex: 1 }}
              contentStyle={{ height: 40 }}
            >
              Message
            </Button>
          </View>
        </View>

        {/* Tabs */}
        <View style={{ 
          flexDirection: 'row', 
          paddingHorizontal: 16,
          marginBottom: 24,
        }}>
          {['Signal', 'Profile', 'Cards'].map((tab) => (
            <Pressable
              key={tab}
              onPress={() => setActiveTab(tab)}
              style={{ flex: 1, alignItems: 'center', paddingVertical: 12 }}
            >
              <Text
                variant="titleMedium"
                style={{ 
                  color: activeTab === tab ? theme.colors.primary : theme.colors.onSurfaceVariant 
                }}
              >
                {tab}
              </Text>
              {activeTab === tab && (
                <View
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    width: '100%',
                    height: 2,
                    backgroundColor: theme.colors.primary,
                  }}
                />
              )}
            </Pressable>
          ))}
        </View>

        {/* Profile Content */}
        <View style={{ paddingHorizontal: 16 }}>
          {/* Website */}
          <View style={{ marginBottom: 24 }}>
            <Text variant="titleMedium" style={{ marginBottom: 8 }}>Website</Text>
            <Text
              variant="bodyLarge"
              style={{ color: theme.colors.primary }}
              onPress={() => Linking.openURL('http://www.website.com')}
            >
              www.website.com
            </Text>
          </View>

          {/* Bio */}
          <View style={{ marginBottom: 24 }}>
            <Text variant="titleMedium" style={{ marginBottom: 8 }}>Bio</Text>
            <Text variant="bodyMedium">
              Former frontend dev for Linear, Coinbase, and Postscript.
            </Text>
          </View>

          {/* Video Preview */}
          <View style={{ 
            height: 200, 
            backgroundColor: '#E0E0E0',
            borderRadius: 12,
            marginBottom: 24,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <Surface
              style={{
                width: 56,
                height: 56,
                borderRadius: 28,
                backgroundColor: 'rgba(0,0,0,0.5)',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              elevation={0}
            >
              <MaterialCommunityIcons name="play" size={32} color="white" />
            </Surface>
          </View>

          {/* Offerings */}
          <View style={{ marginBottom: 24 }}>
            <Text variant="titleMedium" style={{ marginBottom: 16 }}>Offerings</Text>
            
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
              image={require('../assets/financial.jpg')}
              title="Financial advising"
              description="A financial advisor provides financial advice or guidance to customers for compensation..."
            />
            <ServiceCard
              image={require('../assets/accounting.jpg')}
              title="Accounting"
              description="Accounting is the process of recording financial transactions pertaining to"
            />
            <ServiceCard
              image={require('../assets/event.jpg')}
              title="Event"
              description="Book tickets for best upcoming events in Jaipur. Explore music, comedy..."
            />
            <ServiceCard
              image={require('../assets/coaching.jpg')}
              title="Coaching & mentoring"
              description="development approaches based on the use of one-to-one conversations to..."
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}; 