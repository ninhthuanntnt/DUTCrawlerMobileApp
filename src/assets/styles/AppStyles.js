import { StyleSheet } from "react-native";

const AppStyles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 5,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    formContainer:{
        paddingHorizontal: 10
    },
    formHeader: {
        fontSize: 30,
        paddingVertical: 50,
    },
    formControl: {
        width: '100%',
        alignItems: 'stretch',
        marginVertical: 10
    },
    formTitle: {
        fontSize: 20,
    },
    formInput: {
        borderWidth: 1,
        borderRadius: 5,
        padding: 5
    },
    formButton: {
        marginVertical: 20
    },

    headerBar: {
        textAlign: "center"
    },
    
    rowContainer:{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    padding5: {
        marginTop: 5
    },
    flatList: {
        width: "100%"
    },
    flatList_item: {
        padding: 5,
        margin: 10,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "#ccc",
        borderRadius: 10,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    flatList_title: {
        fontSize: 20,
        fontWeight: "700",
        color: "#0377fc",
        textAlign: "center",
    }
});
export default AppStyles;