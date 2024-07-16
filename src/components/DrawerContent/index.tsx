import { DrawerContentComponentProps } from "@react-navigation/drawer"
import { Text, Image, View, TouchableOpacity } from "react-native"
import { Ionicons } from "@expo/vector-icons"

import { styles } from "./styles"
import { useAuth, useUser } from "@clerk/clerk-expo"
import { SafeAreaView } from "react-native-safe-area-context"

const DrawerContent = (drawerProps: DrawerContentComponentProps) => {
    const { user } = useUser()
    const { signOut } = useAuth()
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.imageContainer}>
                <Image source={{ uri: user?.imageUrl }} style={styles.image} />
            </View>
            <View style={styles.bodyContent}>
                <View style={styles.box}>
                    <Ionicons name="person" size={26} />
                    <Text style={styles.text}>{user?.fullName}</Text>
                </View>
            </View>
            <TouchableOpacity style={styles.buttonLogout} activeOpacity={0.8} onPress={() => signOut()}>
                <Ionicons name="exit" size={28} color={"#FFF"} />
                <Text style={styles.buttonLogoutText}>Sair</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export { DrawerContent }