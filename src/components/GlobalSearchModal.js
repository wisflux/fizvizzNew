import React from 'react';
import { View } from 'react-native';
import { Modal, Portal } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SearchBar } from './SearchBar';
import { SearchResults } from './SearchResults';
import { useSearch } from '../hooks/useSearch';
import { theme } from '../theme';

export const GlobalSearchModal = ({ 
  visible, 
  onDismiss, 
  groupsData = [], 
  communitiesData = [] 
}) => {
  const insets = useSafeAreaInsets();
  const { searchQuery, setSearchQuery, results } = useSearch([...groupsData, ...communitiesData]);

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={{
          flex: 1,
          backgroundColor: theme.colors.surface,
        }}
      >
        <View style={{ 
          flex: 1, 
          backgroundColor: theme.colors.surface,
          paddingTop: insets.top 
        }}>
          <SearchBar
            value={searchQuery}
            onChangeText={setSearchQuery}
            onBack={onDismiss}
            placeholder="Search"
            autoFocus={true}
          />
          
          {searchQuery && (
            <SearchResults
              results={results}
              onItemPress={(item) => {
                onDismiss();
                onItemPress?.(item);
              }}
              contentContainerStyle={{
                paddingBottom: insets.bottom,
              }}
            />
          )}
        </View>
      </Modal>
    </Portal>
  );
}; 