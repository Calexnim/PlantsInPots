import React, { Component } from 'react';
import { Text } from 'react-native';

export default class Cart extends Component {
componentWillUnmount(){
    console.log("Cart");
}
  render() {
    return (
      <Text>Cart page</Text>
    );
  }
}
