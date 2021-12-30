import React from 'react';
import { Text, Image, View, StyleSheet, TouchableOpacity } from 'react-native';
import constants from './constants';
import FastImage from 'react-native-fast-image';
const Item = ({id, image, name, price}) => {
    const pressHandler = (id) => {
        console.log(id)
    }
  return (
    <View style={styles.item}>
        <TouchableOpacity onPress={() => pressHandler(id)}>
            <FastImage
                style={styles.image}
                source={{uri: constants.URL+image}}
            />
            <Text style={styles.text}>{name}</Text>
            <Text style={styles.text}>{price}</Text>
        </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
    item: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        margin: 5,
        flex: 1,
        justifyContent: 'center',
    },
    image: {
        width: 160,
        height: 200,
        alignSelf: 'center',
        borderRadius: 20,
    },
    text: {
        marginTop: 10,
        alignSelf: 'center',
    },
})
export default Item;
