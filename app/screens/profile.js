import React, { Component } from 'react';
import { Text } from 'react-native';

export default class Profile extends Component {
componentWillUnmount(){
    console.log("Profile");
}
  render() {
    return (
      <Text>Profile page</Text>
    );
  }
}
