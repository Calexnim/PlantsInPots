import React, { Component } from 'react';
import { Text } from 'react-native';

export default class Notification extends Component {
componentWillUnmount(){
    console.log("Notification");
}
  render() {
    return (
      <Text>Notification page</Text>
    );
  }
}
