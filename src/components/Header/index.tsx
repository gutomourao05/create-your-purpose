import { TouchableOpacity, Text } from "react-native"
import { Ionicons } from "@expo/vector-icons"

import { styles } from "./styles"
import { SafeAreaView } from "react-native-safe-area-context"
import { DrawerActions } from "@react-navigation/native"
import { useNavigation } from "expo-router"
import BottomSheet from '@gorhom/bottom-sheet';
import { useCallback, useRef } from "react"
import { ModalContent } from "../ModalRegisterPurpose"

const Header = () => {
    const bottomSheetRef = useRef<BottomSheet>(null);
    const navigation = useNavigation()

    const handlePresentModalPress = useCallback(() => {
        bottomSheetRef.current?.expand();
    }, []);

    return (
        <>
            <SafeAreaView style={styles.container}>
                <TouchableOpacity style={styles.buttonNew} activeOpacity={0.8} onPress={handlePresentModalPress}>
                    <Ionicons name="add" color={"#FFF"} size={42} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonMenu} activeOpacity={0.5} onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
                    <Ionicons name="menu" color={"#000"} size={42} />
                </TouchableOpacity>
            </SafeAreaView>
            <BottomSheet
                ref={bottomSheetRef}
                index={-1}
                snapPoints={['95%']}
                enablePanDownToClose={true}
                backgroundStyle={{ opacity: 0.7, backgroundColor: "#000" }}
                handleIndicatorStyle={{ backgroundColor: "#FFF" }}
            >
                <ModalContent />
            </BottomSheet>
        </>
    )
}

export { Header }