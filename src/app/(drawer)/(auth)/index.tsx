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
    const { getAll, updateIsActive } = usePurposeDatabase();


    const createPurpose = async () => {
        const returnData = await getAll();
        setData(returnData)
    }

    function hasTimePassed(finalDateTime: Date) {
        const currentDate = new Date();
        currentDate.setHours(currentDate.getHours() - 3);
        return currentDate >= finalDateTime;
    }

    useEffect(() => {
        createPurpose();
    }, [])

    useEffect(() => {
        data?.map((item: PurposeDatabaseProps) => {
            const dateFinal = new Date(item.finalDate);
            const verifyDate = hasTimePassed(dateFinal);
            if (verifyDate && item.isActive) {
                updateIsActive(item.id);
            }
        })

    }, [data])

    useMemo(async () => {
        const { status } = await Notifications.getPermissionsAsync();

        if (status !== 'granted') {
            await Notifications.requestPermissionsAsync();
        }
    }, [])

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

