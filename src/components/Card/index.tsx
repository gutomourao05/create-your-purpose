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
        <View style={props.purpose?.isActive ? styles.containerActive : styles.containerInactive} >
            <View style={styles.cardHeader}>
                <Text>Nome: {props.purpose?.name}</Text>
                <TouchableOpacity activeOpacity={0.8} onPress={() => deletePurpose(props.purpose?.id)}>
                    <Ionicons size={24} name="trash-outline" />
                </TouchableOpacity>
            </View>

            <View style={styles.cardBody}>
            </View>

            <View style={styles.cardFooter}>
                <View>
                    <Text>Data Final: {props.purpose?.finalDate}</Text>
                    <Text>Horário Alerta: {props.purpose?.timeAlert}</Text>
                </View>
                <TouchableOpacity activeOpacity={0.8} style={props.purpose?.isActive ? styles.activeButton : styles.inactiveButton}>
                    <Text>{props.purpose?.isActive ? "Inativar" : "Ativar"}</Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}

export { Card }