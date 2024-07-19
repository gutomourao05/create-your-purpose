import { DrawerContent } from "@/components/DrawerContent"
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet"
import { Drawer } from "expo-router/drawer"
import { GestureHandlerRootView } from "react-native-gesture-handler"

export default function Layout() {
    return (
        <BottomSheetModalProvider>
            <GestureHandlerRootView>
                <Drawer screenOptions={{ headerShown: false }} drawerContent={(props) => <DrawerContent {...props} />} />
            </GestureHandlerRootView>
        </BottomSheetModalProvider>
    )
}