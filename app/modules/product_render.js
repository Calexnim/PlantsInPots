import React, { useEffect } from 'react';
import {SafeAreaView, FlatList, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useNavigation } from '@react-navigation/native';
// import Item from './product_item';
const Item = ({id, image, name, price}) => {
    const navigation = useNavigation()
    const pressHandler = (id) => {
        console.log(id)
    }
  return (
    <View style={styles.item}>
        <TouchableOpacity onPress={() => navigation.navigate('Product', { something: 'josh' })}>
            <FastImage
                style={styles.image}
                source={{uri: image}}
            />
            <Text style={styles.text}>{name}</Text>
            <Text style={styles.text}>RM {price}</Text>
        </TouchableOpacity>
    </View>
  );
}

const ProductList = (props) => {
    if (props.products.length % 2 != 0){
        props.products.push({empty: true})
    }
    renderItem = ({ item }) => item.empty == true? <View style={styles.emptyItem}/> :(
    <Item 
      id={item.id}
      image={item.image}
      name={item.name}
      price={item.price}
    />
    );
    if (props.products) {
        return (
            <FlatList
            //   style = {styles.productItem}
                data={props.products}
                renderItem={item => this.renderItem(item)}
                horizontal={false}
                numColumns={2}
                ListHeaderComponent={props.header}
            />
        );
    }
    else{
        return(
            <Text styles={{color: 'black'}}>
                No products available
            </Text>
        );
    }
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
    emptyItem: {
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
export default ProductList;