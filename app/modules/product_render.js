import React, { useEffect } from 'react';
import {SafeAreaView, FlatList, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';
// import Item from './product_item';
const Item = ({id, image, name, price}) => {
    const pressHandler = (id) => {
        console.log(id)
    }
  return (
    <View style={styles.item}>
        <TouchableOpacity onPress={() => pressHandler(id)}>
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
    renderItem = ({ item }) => (
    <Item 
      id={item.id}
      image={item.image}
      name={item.name}
      price={item.price}
      // onPress={() => setSelectedId(item.id)}
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