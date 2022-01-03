import React, { useEffect } from 'react';
import {SafeAreaView, FlatList } from 'react-native';
import Item from './product_item';
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
export default ProductList;