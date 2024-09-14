import { View, Text } from "react-native"

import { styles } from "./styles"
import { PurposeDatabaseProps, usePurposeDatabase } from "@/database/hooks/usePurposeDatabase"
import { Ionicons } from "@expo/vector-icons"
import { TouchableOpacity } from "react-native-gesture-handler"

type Props = {
    purpose: PurposeDatabaseProps
    update: () => void
}

const Card = (props: Props) => {


    const { deleteById, updateIsActive } = usePurposeDatabase();

    const deletePurpose = async (id: any) => {
        await deleteById(id);
        props.update();
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
                    {props.purpose?.withAlert ? <Text>Alerta: {props.purpose?.timeAlert}</Text> : null}
                </View>
                <TouchableOpacity activeOpacity={0.8} style={props.purpose?.isActive ? styles.activeButton : styles.inactiveButton} onPress={() => {
                    updateIsActive(props.purpose?.id)
                    props.update()
                }}>
                    <Text>{props.purpose?.isActive ? "Inativar" : "Ativar"}</Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}

export { Card }