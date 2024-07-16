import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        padding: 24,
    },
    imageContainer: {
        width: "100%",
        alignItems: "center",
        marginBottom: 24,
    },
    image: {
        width: 150,
        height: 150,
        borderRadius: 100,
    },
    bodyContent: {
        width: "100%",
        alignItems: "center",
    },
    box: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 3,
        marginBottom: 12,
    },
    text: {
        fontSize: 20,
    },
    buttonLogout: {
        backgroundColor: "#000",
        width: "50%",
        height: 50,
        borderRadius: 6,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        position: "absolute",
        bottom: 34,
    },
    buttonLogoutText: {
        color: "#FFF",
        fontSize: 18,
        fontWeight: "700",
    }
})