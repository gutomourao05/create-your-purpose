import { DrawerContentComponentProps } from "@react-navigation/drawer"
import { Text, Image } from "react-native"

import { styles } from "./styles"
import { useUser } from "@clerk/clerk-expo"
import { SafeAreaView } from "react-native-safe-area-context"

const DrawerContent = (drawerProps: DrawerContentComponentProps) => {
    const { user } = useUser()
    return (
        <SafeAreaView style={styles.container}>
            <Image source={{ uri: user?.imageUrl }} style={styles.image} />
            <Text style={styles.text}>{user?.fullName}</Text>
        </SafeAreaView>
    )
}

export { DrawerContent }