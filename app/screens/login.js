import React, { Component, useEffect } from 'react';
import axios from 'axios';
import { 
  View,
  TextInput,
  StyleSheet,
  Text,
 } from 'react-native';

import {
  Button,
} from 'react-native-elements'
import externalStyle from '../style/style';
import globals from '../modules/globals.js';


export default class Login extends Component {
  constructor(){
    super();
    this.state = {email:'', password:''}
  }
  // state = {
  //   email: '', password: ''
  // }
  onChangeText = (key, val) => {
    this.setState({[key]: val})
  }
  login = async () => {
    const {
      email,
      password,
    } = this.state
    console.log("Login")
  //Post email & password get token
  await axios({
      method: 'post',
      url: 'http://192.168.0.148:8000/api/account/login',
      data: {
        username: email,
        password: password,
      }
    }).then(function (response) {
      console.log(response.data);
    }).catch((error) => {
      console.error('error', error);
    });
  }


  render() {
    return (
      <View style={externalStyle.container}>
        <TextInput
          style={externalStyle.input}
          placeholder='Email'
          autoCapitalize='none'
          keyboardType='email-address'
          onChangeText={val => this.onChangeText('email', val)}        
        />
        <TextInput 
          style={externalStyle.input}
          placeholder='Password'
          secureTextEntry={true}
          autoCapitalize='none'
          onChangeText={val => this.onChangeText('password', val)}
        />
        <Button
          buttonStyle={externalStyle.button}
          type="solid"
          title='Login'
          onPress={() => {
            this.login();
            globals.setLogin();
          }}
        />
        <Text>No Account? Register here</Text>
        <Button
          buttonStyle={externalStyle.button}
          type="solid"
          title="Register"
          onPress={() => this.props.navigation.navigate('Register')}         
        />
      </View>
    );
  }
}

