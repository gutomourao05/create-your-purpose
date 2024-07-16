import { View, Text, TouchableOpacity, Button } from "react-native"
import { useUser } from "@clerk/clerk-expo"
import { Ionicons } from "@expo/vector-icons"

import { styles } from "./styles"
import { SafeAreaView } from "react-native-safe-area-context"
import { DrawerActions } from "@react-navigation/native"
import { useNavigation } from "expo-router"

const Header = () => {
    const navigation = useNavigation()

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity style={styles.buttonNew} activeOpacity={0.8}>
                <Ionicons name="add" color={"#FFF"} size={42} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonMenu} activeOpacity={0.5} onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
                <Ionicons name="menu" color={"#000"} size={42} />
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export { Header }