import { TouchableOpacity, Text } from "react-native"
import { Ionicons } from "@expo/vector-icons"

import { styles } from "./styles"
import { SafeAreaView, View } from "react-native"
import { DrawerActions } from "@react-navigation/native"
import { useNavigation } from "expo-router"

type Props = {
    handlePresentModalPress: () => void
}

const Header = ({ handlePresentModalPress }: Props) => {
    const navigation = useNavigation()

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity style={styles.buttonNew} activeOpacity={0.8} onPress={handlePresentModalPress}>
                <Ionicons name="add" color={"#FFF"} size={42} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonMenu} activeOpacity={0.5} onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
                <Ionicons name="menu" color={"#000"} size={42} />
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export { Header }