import { router, Slot } from "expo-router"
import { ClerkProvider, ClerkLoaded, useAuth } from "@clerk/clerk-expo"
import { useEffect } from "react";
import { ActivityIndicator } from "react-native";
import { tokenCache } from "@/functions/tokenCache";
import Entypo from '@expo/vector-icons/Entypo';
import * as Font from 'expo-font';
import { preventAutoHideAsync, hideAsync } from 'expo-splash-screen';

const PUBLIC_CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY as string;

preventAutoHideAsync();

const InitialLayout = () => {
    const { isSignedIn, isLoaded } = useAuth()

    useEffect(() => {
        if (!isLoaded) return
        if (isSignedIn) {
            router.replace("(auth)")
        } else {
            router.replace("(public)")
        }
    }, [isSignedIn])

    useEffect(() => {
        async function prepare() {
            try {
                await Font.loadAsync(Entypo.font);
                await new Promise(resolve => setTimeout(resolve, 1000));
            } catch (e) {
            } finally {
                hideAsync();
            }
        }
        prepare();
    }, []);

    return isLoaded ? <Slot /> : <ActivityIndicator style={{ flex: 1, justifyContent: "center", alignItems: "center" }} />
}

export default function Layout() {

    return (
        <ClerkProvider publishableKey={PUBLIC_CLERK_PUBLISHABLE_KEY} tokenCache={tokenCache}>
            <ClerkLoaded>
                <InitialLayout />
            </ClerkLoaded>
        </ClerkProvider>
    )
}