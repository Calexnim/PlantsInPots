import { StyleSheet } from "react-native"

const externalStyle=StyleSheet.create({
    button: {
        backgroundColor: '#6ea8a1',
        margin: 15,
        borderRadius: 14,
        paddingLeft: 50,
        paddingRight: 50,
        // width: "60%",
        textAlign: "center",
    },
    input: {
        width: 350,
        height: 55,
        backgroundColor: 'white',
        margin: 10,
        padding: 8,
        color: 'black',
        borderRadius: 14,
        borderColor: 'black',
        fontSize: 18,
        fontWeight: '500',
        
      },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
})

export default externalStyle