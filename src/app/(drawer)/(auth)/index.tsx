import { Header } from "@/components/Header"
import { ImageBackground, FlatList } from "react-native"

import imageBg from "@/images/bg2.jpg"
import { usePurposeDatabase } from "@/database/hooks/usePurposeDatabase";
import { useCallback, useEffect, useRef, useState } from "react";
import { Card } from "@/components/Card";
import BottomSheet from "@gorhom/bottom-sheet";
import { ModalContent } from "@/components/ModalRegisterPurpose";

import { styles } from "./styles"
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

    return (
        <ImageBackground style={styles.container} source={imageBg} imageStyle={{ opacity: 0.5 }}>
            <Header handlePresentModalPress={() => handlePresentModalPress()} />
            <FlatList
                showsVerticalScrollIndicator={false}
                data={data}
                renderItem={({ item }) => <Card purpose={item} />}
                contentContainerStyle={{ gap: 12 }}
                keyExtractor={item => item.id}
                style={{ marginBottom: 44 }}
                onEndReached={() => createPurpose()}
                onEndReachedThreshold={0.1}
            />
            <BottomSheet
                ref={bottomSheetRef}
                index={-1}
                snapPoints={['85%']}
                enablePanDownToClose={true}
                backgroundStyle={{ opacity: 0.7, backgroundColor: "#000" }}
                handleIndicatorStyle={{ backgroundColor: "#FFF", elevation: 1, zIndex: 99 }}
            >
                <ModalContent />
            </BottomSheet>
        </ImageBackground>
    )
}

