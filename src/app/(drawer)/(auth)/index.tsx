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

        data.map((item: PurposeDatabaseProps) => {
            const dateFinal = new Date(item.finalDate);
            const verify = hasTimePassed(dateFinal);
            if (verify && item.isActive) {
                updateIsActive(item.id);
            }
        })

    }, [])

    useEffect(() => {
        createPurpose();
    }, [])

    useMemo(async () => {
        const { status } = await Notifications.getPermissionsAsync();

        if (status !== 'granted') {
            await Notifications.requestPermissionsAsync();
        }
    }, [])

    useEffect(() => {
        data?.map((item: PurposeDatabaseProps) => {
            const dateInitial = new Date(item.initialData)

            if (item.withAlert && item.isActive && hasTimePassed(dateInitial)) {
                const dateInitial = new Date(item.initialData)
                const hour = dateInitial.getHours() + 3
                const minute = dateInitial.getMinutes()

                Notifications.scheduleNotificationAsync({
                    content: {
                        title: `Alerta de do seu proposito: ${item.name}`,
                        body: `Seu pedido de alerta para seu proposito ${item.name} chegou, não se esqueça, faça tudo como se fosse para Jesus.`,
                    },
                    trigger: {
                        hour: hour,
                        minute: minute,
                        repeats: true,
                        channelId: `${item.id}-${item.name}`,
                    }
                })
            }
        })
    }, [data])

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

