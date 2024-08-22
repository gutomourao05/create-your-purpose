import { Header } from "@/components/Header"
import { StyleSheet, ImageBackground, FlatList, View } from "react-native"

import imageBg from "@/images/bg2.jpg"
import { usePurposeDatabase } from "@/database/hooks/usePurposeDatabase";
import { useEffect, useState } from "react";
import { Card } from "@/components/Card";
export default function Home() {

    const [data, setData] = useState<any>([])
    const { getAll } = usePurposeDatabase();

    const createPurpose = async () => {
        const returnData = await getAll();
        setData(returnData)
    }

    useEffect(() => {
        createPurpose()
    }, [getAll])

    return (
        <ImageBackground style={styles.container} source={imageBg} imageStyle={{ opacity: 0.5 }}>
            <Header />
            <FlatList showsVerticalScrollIndicator={false} data={data} renderItem={({ item }) => <Card purpose={item} />} keyExtractor={item => item.id} />
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 12,
    },
})