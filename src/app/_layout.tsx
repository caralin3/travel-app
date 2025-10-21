// Import  global CSS file
import '../../global.css';

import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { ThemeProvider } from '@react-navigation/native';
import { Stack, useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import FlashMessage from 'react-native-flash-message';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { KeyboardProvider } from 'react-native-keyboard-controller';

import { loadSelectedTheme, useAuth } from '@/lib';
import { firebaseAuth } from '@/lib/firebase/config';
import { onAuthStateChanged, Unsubscribe } from '@firebase/auth';
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

function Providers({ children }: { children: React.ReactNode }) {
  const theme = useThemeConfig();
  const router = useRouter();

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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
