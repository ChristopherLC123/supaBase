
import {
  TabList,
  TabSlot,
  TabTrigger,
  Tabs
} from "expo-router/ui";

import {
  Pressable,
  StyleSheet,
  Text,
  useColorScheme
} from "react-native";

import { Colors, Spacing } from "@/constants/theme";

// Componente principal de navegación
export default function AppTabs() {

    const scheme = useColorScheme();

    const colors = Colors[scheme === "dark" ? "dark" : "light"];

    return (
        <Tabs>

            {/* Aquí se muestran las pantallas */}
            <TabSlot style={styles.content} />

            {/* Barra inferior de navegación */}
            <TabList
                style={[
                    styles.tabList,
                    { backgroundColor: colors.background }
                ]}
            >

                {/* Pestaña Home */}
                <TabTrigger name="home" href="/" asChild>
                    <TabButton label="Home" />
                </TabTrigger>

                {/* Pestaña Explore */}
                <TabTrigger name="explore" href="/explore" asChild>
                    <TabButton label="Explore" />
                </TabTrigger>

                {/* Pestaña Galería */}
                <TabTrigger name="gallery" href="/gallery" asChild>
                    <TabButton label="Galería" />
                </TabTrigger>

                {/* Pestaña Notas */}
                <TabTrigger name="notes" href="/notes" asChild>
                    <TabButton label="Mis notas" />
                </TabTrigger>

            </TabList>

        </Tabs>
    );
}

// Botón individual de cada pestaña
function TabButton({ label, isFocused, ...props }: any) {

    const scheme = useColorScheme();

    const colors = Colors[scheme === "dark" ? "dark" : "light"];

    return (
        <Pressable
            {...props}
            style={({ pressed }) => [
                styles.tabButton,
                {
                    backgroundColor: isFocused
                        ? colors.backgroundSelected
                        : "transparent"
                },
                pressed && styles.pressed
            ]}
        >

            <Text
                style={{
                    color: isFocused
                        ? colors.text
                        : colors.textSecondary,
                    fontWeight: isFocused ? "700" : "500"
                }}
            >
                {label}
            </Text>

        </Pressable>
    );
}

// Estilos de navegación
const styles = StyleSheet.create({

    content: {
        flex: 1
    },

    tabList: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: Spacing.two,
    paddingTop: 10,
    paddingBottom: 50,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "#88888855"
},

    tabButton: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 3,
        paddingVertical: 11,
        borderRadius: 12
    },

    pressed: {
        opacity: 0.7
    }

});
