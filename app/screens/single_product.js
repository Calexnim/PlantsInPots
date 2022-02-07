import React from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import { Button } from "react-native-elements/dist/buttons/Button";
import FastImage from "react-native-fast-image";
import externalStyle from "../style/style";
import Toast from 'react-native-toast-message';
import { Divider } from "react-native-elements/dist/divider/Divider";

const Product = (props) => {
    return (
        <ScrollView style={styles.container}>
            <FastImage
                style={styles.image}
                source={{uri: props.route.params?.image}}
            />
            <Divider style={{marginTop: 10, marginLeft: 10, marginRight: 10, color: 'black',}}/>
            <Text style={styles.textTitle}>
                {props.route.params?.name}
            </Text>
            <Text style={styles.textPrice}>
                RM {props.route.params?.price}
            </Text>
            <Text style={styles.textDescriptionTitle}>
                Description:
            </Text>
            <Text style={styles.textDescription}>
                {props.route.params?.description}
            </Text>
            <Button
                buttonStyle={externalStyle.button}
                type='solid'
                title='Add to Cart'
                onPress={() => Toast.show({ type: 'success', position: 'top', text1: 'Added to Cart!'})}
            />
        </ScrollView>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white',
    },
    image: {
        width: 190,
        height: 230,
        alignSelf: 'center',
        borderRadius: 20,
        marginTop: 20,
    },
    textTitle: {
        margin: 10,
        textAlign: 'left',
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
    },
    textPrice: {
        margin: 10,
        textAlign: 'left',
        fontSize: 18,
        color: 'black',
        marginRight: 30,
    },
    textDescriptionTitle: {
        margin: 10,
        textAlign: 'justify',
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
    },
    textDescription: {
        margin: 10,
        textAlign: 'justify',
        fontSize: 16,
        color: 'black',
    }
})
export default Product; 