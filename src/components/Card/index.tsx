import { View, Text } from "react-native"

import { styles } from "./styles"
import { PurposeDatabaseProps, usePurposeDatabase } from "@/database/hooks/usePurposeDatabase"
import { Ionicons } from "@expo/vector-icons"
import { TouchableOpacity } from "react-native-gesture-handler"

type Props = {
    purpose: PurposeDatabaseProps
}

const Card = (props: Props) => {

    const { deleteById } = usePurposeDatabase();

    const deletePurpose = async (id: any) => {
        await deleteById(id);
    }

    return (
        <View style={styles.container} >
            <View style={styles.cardHeader}>
                <Text>{props.purpose?.name}</Text>
                <TouchableOpacity activeOpacity={0.8} onPress={() => deletePurpose(props.purpose?.id)}>
                    <Ionicons size={24} name="trash-outline" />
                </TouchableOpacity>
            </View>
            <Text>{props.purpose?.id}</Text>
        </View>
    )
}

export { Card }