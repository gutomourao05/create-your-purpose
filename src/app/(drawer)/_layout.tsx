import { DrawerContent } from "@/components/DrawerContent"
import { Drawer } from "expo-router/drawer"
import { GestureHandlerRootView } from "react-native-gesture-handler"

export default function Layout() {
    return (
        <GestureHandlerRootView>
            <Drawer screenOptions={{ headerShown: false }} drawerContent={(props) => <DrawerContent {...props} />} />
        </GestureHandlerRootView>
    )
}