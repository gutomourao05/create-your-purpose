import { TouchableOpacity, TouchableOpacityProps, Text, ActivityIndicator } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { styles } from "./styles"

type ButtonProps = TouchableOpacityProps & {
    title: string
    isLoading?: boolean
    icon: keyof typeof Ionicons.glyphMap
}

const ButtonSignIn = ({ title, isLoading = false, icon, ...rest }: ButtonProps) => {
    return (
        <TouchableOpacity style={styles.container} disabled={isLoading} {...rest} activeOpacity={0.8}>
            {isLoading ? (
                <ActivityIndicator color={"#000"} />
            ) : (
                <>
                    <Ionicons name={icon} size={24} />
                    <Text style={styles.text}>{title}</Text>
                </>
            )}
        </TouchableOpacity>
    )
}

export { ButtonSignIn } 