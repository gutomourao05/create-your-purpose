import { Header } from "@/components/Header"
import { StyleSheet, ImageBackground } from "react-native"

import imageBg from "@/images/bg2.jpg"
export default function Home() {
    return (
        <ImageBackground style={styles.container} source={imageBg} imageStyle={{ opacity: 0.5 }}>
            <Header />
        </ImageBackground>

    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})