
import { UsersView } from "@/moduls/users/presentation/UsersView";
import { useRouter } from "expo-router";
import { Button, View } from "react-native";

export default function HomeScreen() {

    const router = useRouter();

    return (
        <View style={{ flex: 1 }}>

            <UsersView />

            <Button
                title="Mis notas"
                onPress={() => router.push("/notes")}
            />

        </View>
    );
}
