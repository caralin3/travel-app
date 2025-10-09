import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

export default function TabLayout() {
  // const status = useAuth.use.status();
  // const [isFirstTime] = useIsFirstTime();
  // const hideSplash = useCallback(async () => {
  //   await SplashScreen.hideAsync();
  // }, []);
  // useEffect(() => {
  //   if (status !== 'idle') {
  //     setTimeout(() => {
  //       hideSplash();
  //     }, 1000);
  //   }
  // }, [hideSplash, status]);

  // if (isFirstTime) {
  //   return <Redirect href="/onboarding" />;
  // }
  // if (status === 'signOut') {
  //   return <Redirect href="/login" />;
  // }
  return (
    <Tabs
      screenOptions={{
        // headerShown: false,
        tabBarButton: HapticTab,
        tabBarShowLabel: false,
        tabBarIconStyle: Platform.select({
          ios: {
            padding: 0,
          },
        }),
        tabBarStyle: Platform.select({
          ios: {
            // borderTopWidth: 0,
            paddingTop: 10,
          },
          default: {
            // borderTopWidth: 0,
            height: 95,
            paddingTop: 5,
          },
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="house.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="itinerary"
        options={{
          title: 'Itinerary',
          tabBarIcon: ({ color }) => (
            <IconSymbol size={24} name="calendar" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="map-view"
        options={{
          title: 'Map View',
          tabBarIcon: ({ color }) => (
            <IconSymbol size={24} name="map" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="expenses"
        options={{
          title: 'Expenses',
          tabBarIcon: ({ color }) => (
            <IconSymbol size={24} name="dollarsign" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => (
            <IconSymbol size={24} name="gearshape" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="style"
        options={{
          href: null,
          title: 'Style',
        }}
      />
    </Tabs>
  );
}
