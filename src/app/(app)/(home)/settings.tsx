import { Env } from '@env';

import { Item } from '@/components/settings/item';
import { ItemsContainer } from '@/components/settings/items-container';
import { ThemeItem } from '@/components/settings/theme-item';
import { FocusAwareStatusBar, ScrollView, View } from '@/components/ui';
import { useAuth } from '@/lib';
import { useRouter } from 'expo-router';

export default function Settings() {
  const router = useRouter();
  const signOut = useAuth.use.signOut();
  const user = useAuth.use.user();

  return (
    <>
      <FocusAwareStatusBar />

      <ScrollView className="flex-1 px-4 pt-8">
        {!!user && (
          <ItemsContainer title="Profile">
            <Item text="Email" value={user.email ?? 'No email'} />
            <Item text="Display Name" value={user.displayName ?? ''} />
          </ItemsContainer>
        )}

        <ItemsContainer title="General">
          <ThemeItem />
        </ItemsContainer>

        <ItemsContainer title="About">
          <Item text="App Name" value={Env.NAME} />
          <Item text="Version" value={Env.VERSION} />
        </ItemsContainer>

        <ItemsContainer title="Links">
          <Item text="Privacy" onPress={() => {}} />
          <Item text="Terms" onPress={() => {}} />
          <Item
            text="Style"
            onPress={() => router.navigate('/(app)/(home)/style')}
          />
        </ItemsContainer>

        <View className="my-8">
          <ItemsContainer>
            <Item text="Logout" onPress={signOut} />
          </ItemsContainer>
        </View>
      </ScrollView>
    </>
  );
}
