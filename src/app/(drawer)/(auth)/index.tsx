import { Header } from "@/components/Header"
import { ImageBackground, FlatList, Text } from "react-native"

import imageBg from "@/images/bg2.jpg"
import { PurposeDatabaseProps, usePurposeDatabase } from "@/database/hooks/usePurposeDatabase";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Card } from "@/components/Card";
import BottomSheet from "@gorhom/bottom-sheet";
import { ModalContent } from "@/components/ModalRegisterPurpose";
import { styles } from "./styles";
import * as Notifications from 'expo-notifications';


Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
    }),
});
export default function Home() {

    const bottomSheetRef = useRef<BottomSheet>(null);

    const handlePresentModalPress = useCallback(() => {
        bottomSheetRef.current?.expand({ duration: 500 });
    }, []);

    const [data, setData] = useState<any>([])
    const { getAll } = usePurposeDatabase();

    const createPurpose = async () => {
        const returnData = await getAll();
        setData(returnData)
    }

    useEffect(() => {
        createPurpose();
    }, [])

    useMemo(async () => {
        const { status } = await Notifications.getPermissionsAsync();

        if (status !== 'granted') {
            await Notifications.requestPermissionsAsync();
        }

        await Notifications.scheduleNotificationAsync({
            content: {
                title: 'Cronograma',
                body: 'Cronograma criado',
            },
            trigger: { seconds: 5 },
        })
    }, [])

    setInterval(() => {
        const currentData = new Date();
        const yearCurrent = currentData.getFullYear();
        const monthCurrent = currentData.getMonth();
        const dayCurrent = currentData.getDate();
        data?.map((item: PurposeDatabaseProps) => {
            if (item.isActive && item.withAlert) {
                const initialData = new Date(item.initialData);
                const yearInitial = initialData.getFullYear();
                const monthInitial = initialData.getMonth();
                const dayInitial = initialData.getDate();

                const finalDate = new Date(item.finalDate);
                const yearFinal = finalDate.getFullYear();
                const monthFinal = finalDate.getMonth();
                const dayFinal = finalDate.getDate();



            }
        })
    }, 1000)

    return (
        <ImageBackground style={styles.container} source={imageBg} imageStyle={{ opacity: 0.5 }}>
            <Header handlePresentModalPress={() => handlePresentModalPress()} />
            <FlatList
                showsVerticalScrollIndicator={false}
                data={data?.length > 0 ? data.sort((a: any, b: any) => b.isActive - a.isActive) : []}
                renderItem={({ item }) => <Card purpose={item} update={() => createPurpose()} />}
                contentContainerStyle={{ gap: 12 }}
                keyExtractor={item => item.id}
                style={{ marginBottom: 44 }}
                onEndReached={() => createPurpose()}
                onEndReachedThreshold={0.1}
                onAccessibilityAction={() => createPurpose()}
            />
            <BottomSheet
                ref={bottomSheetRef}
                index={-1}
                snapPoints={['85%']}
                enablePanDownToClose={true}
                backgroundStyle={{ opacity: 0.7, backgroundColor: "#000" }}
                handleIndicatorStyle={{ backgroundColor: "#FFF", elevation: 1, zIndex: 99 }}
            >
                <ModalContent handleSavePress={() => {
                    createPurpose();
                    bottomSheetRef.current?.close();
                }} />
            </BottomSheet>
        </ImageBackground>
    )
}

