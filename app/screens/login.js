import React, { Component } from 'react';
import { Text } from 'react-native';

class Login extends Component {
componentWillUnmount(){
    console.log("asdfasdfasdfa");
}
  render() {
    return (
      <Text>Login page</Text>
    );
  }
}

export default Login;