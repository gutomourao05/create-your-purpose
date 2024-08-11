import { DrawerContent } from "@/components/DrawerContent"
import { initializeDatabase } from "@/database/initializeDatabase"
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet"
import { Drawer } from "expo-router/drawer"
import { SQLiteProvider } from "expo-sqlite"
import { GestureHandlerRootView } from "react-native-gesture-handler"

export default function Layout() {
    return (
        <SQLiteProvider databaseName="myDatabase.db" onInit={initializeDatabase}>
            <BottomSheetModalProvider>
                <GestureHandlerRootView>
                    <Drawer screenOptions={{ headerShown: false }} drawerContent={(props) => <DrawerContent {...props} />} />
                </GestureHandlerRootView>
            </BottomSheetModalProvider>
        </SQLiteProvider>
    )
}