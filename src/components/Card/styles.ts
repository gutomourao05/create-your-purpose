import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: 120,
        borderRadius: 20,
        backgroundColor: "#FFF",
        shadowColor: "#545454",
        shadowOpacity: 0.20,
        shadowRadius: 3.84,
        marginBottom: 12,
        elevation: 1,
        zIndex: 1
    },

    cardHeader: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 8,
    }
})

export { styles }