import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PaperProvider } from 'react-native-paper';
import { theme } from './src/theme';
import { GroupsScreen } from './src/components/GroupsScreen';

export default function App() {
  return (
    <SafeAreaProvider>
      <PaperProvider theme={theme}>
        <GroupsScreen />
      </PaperProvider>
    </SafeAreaProvider>
  );
}
