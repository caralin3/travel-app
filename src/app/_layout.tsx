import '../../global.css';

import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import NetInfo from '@react-native-community/netinfo';
import { ThemeProvider } from '@react-navigation/native';
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister';
import { onlineManager, QueryClient } from '@tanstack/react-query';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { Stack, useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import FlashMessage from 'react-native-flash-message';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { KeyboardProvider } from 'react-native-keyboard-controller';

import { loadSelectedTheme, useAuth } from '@/lib';
import { firebaseAuth } from '@/lib/firebase/config';
import { onAuthStateChanged, Unsubscribe } from '@firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useThemeConfig } from '../lib/use-theme-config';

export { ErrorBoundary } from 'expo-router';

export const unstable_settings = {
  initialRouteName: '(app)',
};

loadSelectedTheme();
// Prevent the splash screen from auto-hiding before asset loading is complete.
// SplashScreen.preventAutoHideAsync();
// // Set the animation options. This is optional.
// SplashScreen.setOptions({
//   duration: 500,
//   fade: true,
// });

export default function RootLayout() {
  return (
    <Providers>
      <Stack>
        <Stack.Screen name="(app)" options={{ headerShown: false }} />
        {/* <Stack.Screen name="onboarding" options={{ headerShown: false }} /> */}
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="register" options={{ headerShown: false }} />
      </Stack>
    </Providers>
  );
}
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: Infinity, // Keep data in cache forever
      // staleTime: Infinity, // Optional: if you never want to refetch data automatically
    },
  },
});

const asyncPersist = createAsyncStoragePersister({
  storage: AsyncStorage,
  throttleTime: 3000,
});

function Providers({ children }: { children: React.ReactNode }) {
  const theme = useThemeConfig();
  const router = useRouter();

  useEffect(() => {
    return NetInfo.addEventListener((state) => {
      const status =
        state.isConnected != null &&
        state.isConnected &&
        Boolean(state.isInternetReachable);
      console.log('Network status changed:', status ? 'online' : 'offline');
      onlineManager.setOnline(status);
    });
  }, []);

  useEffect(() => {
    let authListener: Unsubscribe;

    authListener = onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        console.log('User is signed in with uid:', uid);
        useAuth.setState({
          status: 'signIn',
          user: {
            ...user,
            id: user.uid,
          },
        });
        router.replace('/(app)/(home)');
      } else {
        // User is signed out
        console.log('User is signed out');
        useAuth.setState({ status: 'signOut', user: null });
        router.replace('/login');
      }
    });

    return () => {
      authListener?.();
    };
  }, []);

  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister: asyncPersist, maxAge: Infinity }}
      // onSuccess will be called when the initial restore is finished
      // resumePausedMutations will trigger any paused mutations
      // that was initially triggered when the device was offline
      onSuccess={() => queryClient.resumePausedMutations()}
    >
      <GestureHandlerRootView
        style={styles.container}
        className={theme.dark ? `dark` : undefined}
      >
        <KeyboardProvider>
          <ThemeProvider value={theme}>
            <BottomSheetModalProvider>
              {children}
              <FlashMessage position="top" />
            </BottomSheetModalProvider>
          </ThemeProvider>
        </KeyboardProvider>
      </GestureHandlerRootView>
    </PersistQueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
