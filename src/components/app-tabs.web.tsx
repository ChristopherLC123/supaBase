
import {
  Tabs,
  TabList,
  TabTrigger,
  TabSlot,
  TabTriggerSlotProps,
  TabListProps,
} from 'expo-router/ui';

import { SymbolView } from 'expo-symbols';

import {
  Pressable,
  useColorScheme,
  View,
  StyleSheet,
} from 'react-native';



import {
  Colors,
  MaxContentWidth,
  Spacing,
} from '@/constants/theme';

import { ExternalLink } from './external-link';
import { ThemedText } from './themed-text';
import { ThemedView } from './themed-view';
import { PlatformPressable } from 'expo-router/build/react-navigation/index.js';

export default function AppTabs() {
  return (
    <Tabs>
      <TabSlot style={{ height: '100%' }} />

      <TabList asChild>
        <CustomTabList>

          {/* Pestaña Home */}
          <TabTrigger name="home" href="/" asChild>
            <TabButton>Home</TabButton>
          </TabTrigger>

          {/* Pestaña Explore */}
          <TabTrigger name="explore" href="/explore" asChild>
            <TabButton>Explore</TabButton>
          </TabTrigger>

          {/* Pestaña Galería */}
          <TabTrigger name="gallery" href="/gallery" asChild>
            <TabButton>Galería</TabButton>
          </TabTrigger>

        </CustomTabList>
      </TabList>
    </Tabs>
  );
}

// Botón de cada pestaña
export function TabButton({
  children,
  isFocused,
  ...props
}: TabTriggerSlotProps) {

  // Separamos ref para evitar el conflicto de tipos
  const { ref: _ref, ...pressableProps } = props;
  void _ref;

  return (
    <PlatformPressable
      {...pressableProps}
      style={({ pressed }) => [
        pressed && styles.pressed,
      ]}
    >
      <ThemedView
        type={isFocused ? 'backgroundSelected' : 'backgroundElement'}
        style={styles.tabButtonView}
      >
        <ThemedText
          type="small"
          themeColor={isFocused ? 'text' : 'textSecondary'}
        >
          {children}
        </ThemedText>
      </ThemedView>
    </PlatformPressable>
  );
}

// Contenedor de las pestañas
export function CustomTabList(props: TabListProps) {
  const scheme = useColorScheme();
  const colors = Colors[scheme === 'dark' ? 'dark' : 'light'];

  return (
    <View {...props} style={styles.tabListContainer}>
      <ThemedView
        type="backgroundElement"
        style={styles.innerContainer}
      >
        <ThemedText type="smallBold" style={styles.brandText}>
          Expo Starter
        </ThemedText>

        {props.children}

        <ExternalLink href="https://docs.expo.dev" asChild>
          <Pressable style={styles.externalPressable}>
            <ThemedText type="link">Docs</ThemedText>

            <SymbolView
              tintColor={colors.text}
              name={{ ios: 'arrow.up.right.square', web: 'link' }}
              size={12}
            />
          </Pressable>
        </ExternalLink>
      </ThemedView>
    </View>
  );
}

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.7,
  },

  tabButtonView: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },

  tabListContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    alignItems: 'center',
    paddingBottom: 10,
  },

  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
    maxWidth: MaxContentWidth,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 8,
    borderRadius: 16,
  },

  brandText: {
    display: 'none',
  },

  externalPressable: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
});
