import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        padding: 18,
    },
    header: {
        width: "100%",
        alignItems: "center",
        marginBottom: 24,
        gap: 4,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#FFF",
    },
    titleSmall: {
        fontSize: 14,
        color: "#FFF",
    },
    body: {
        flex: 1,
    },
    input: {
        width: "100%",
        height: 60,
        fontSize: 16,
        backgroundColor: "#FFF",
        borderRadius: 6,
        padding: 12,
    },
    boxInput: {
        width: "100%",
        flexDirection: "row",
    },
    formControl: {
        width: "50%",
        backgroundColor: "yell"

    },
    inputDateTime: {
        width: "49%",
        height: 60,
        fontSize: 16,
        backgroundColor: "#FFF",
        borderRadius: 6,
        padding: 12,
    },
    error: {
        color: "#F00",
        fontSize: 16,
    },
    button: {
        width: "100%",
        height: 60,
        backgroundColor: "#000",
        borderRadius: 6,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 24,
    },
    buttonText: {
        fontSize: 16,
        color: "#FFF",
        fontWeight: "bold",
    },

})