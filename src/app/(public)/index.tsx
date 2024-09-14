import { useEffect, useState } from "react";
import { ImageBackground } from "react-native";
import { useOAuth } from "@clerk/clerk-expo";
import * as Linking from 'expo-linking'

import * as WebBrowser from "expo-web-browser"
import { styles } from './styles'

import imgBg from "@/images/bg-signIn.jpg";
import { ButtonSignIn } from "@/components/ButtonSignIn";


WebBrowser.maybeCompleteAuthSession();


export default function SignIn() {

    const [isLoadingGoogle, setIsLoadingGoogle] = useState(false)
    const [isLoadingApple, setIsLoadingApple] = useState(false)

    const redirectUrl = Linking.createURL("(auth)")

    const googleOAuth = useOAuth({
        strategy: 'oauth_google',
    })

    const appleOAuth = useOAuth({
        strategy: 'oauth_apple',
    })

    const handleGoogle = async () => {
        try {
            setIsLoadingGoogle(true)
            const oAuthFlowGoogle = await googleOAuth.startOAuthFlow({ redirectUrl })

            if (oAuthFlowGoogle.authSessionResult?.type === 'success' && oAuthFlowGoogle.setActive) {
                return await oAuthFlowGoogle.setActive({ session: oAuthFlowGoogle.createdSessionId })
            }

            return setIsLoadingGoogle(false)
        } catch (error) {
            setIsLoadingGoogle(false)
        }
    }

    const handleApple = async () => {
        try {
            setIsLoadingApple(true)
            const oAuthFlowApple = await appleOAuth.startOAuthFlow({ redirectUrl })

            if (oAuthFlowApple.authSessionResult?.type === 'success' && oAuthFlowApple.setActive) {
                return await oAuthFlowApple.setActive({ session: oAuthFlowApple.createdSessionId })
            }

            return setIsLoadingApple(false)
        } catch (error) {
            setIsLoadingApple(false)
        }
    }

    useEffect(() => {
        WebBrowser.warmUpAsync();

        return () => {
            WebBrowser.coolDownAsync()
        }
    }, [])
    return (
        <ImageBackground source={imgBg} style={styles.container}>
            <ButtonSignIn title="Entrar com Google" icon="logo-google" onPress={handleGoogle} isLoading={isLoadingGoogle} />
            <ButtonSignIn title="Entrar com Apple" icon="logo-apple" onPress={handleApple} isLoading={isLoadingApple} />
        </ImageBackground>
    );
};

