import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: 80,
        marginTop: 16,
        marginBottom: 24,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    buttonNew: {
        width: 60,
        height: 60,
        borderRadius: 50,
        backgroundColor: "#000",
        alignItems: "center",
        justifyContent: "center",
        shadowRadius: 2,
        shadowColor: "#000",
        shadowOpacity: 0.1,
    },
    buttonMenu: {
        width: 60,
        height: 60,
        borderRadius: 50,
        alignItems: "center",
        justifyContent: "center",
    }
})
