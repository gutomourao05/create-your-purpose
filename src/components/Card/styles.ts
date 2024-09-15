import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    containerActive: {
        width: "100%",
        height: 120,
        borderRadius: 5,
        backgroundColor: "#FFF",
        shadowColor: "#545454",
        shadowOpacity: 0.20,
        shadowRadius: 3.84,
        elevation: 1,
        zIndex: 1,
        padding: 10,
    },

    containerInactive: {
        width: "100%",
        height: 120,
        borderRadius: 5,
        backgroundColor: "#646464",
        shadowColor: "#545454",
        shadowOpacity: 0.20,
        shadowRadius: 3.84,
        elevation: 1,
        zIndex: 1,
        padding: 10,
    },

    cardHeader: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    cardBody: {

    },

    cardFooter: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        position: "absolute",
        bottom: 10,
        left: 10,
    },

    activeButton: {
        backgroundColor: "orange",
        alignItems: "center",
        padding: 10,
        justifyContent: "center",
        borderRadius: 5,
    },

    inactiveButton: {
        backgroundColor: "#00FF00",
        padding: 10,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 5,
    }
})

export { styles }