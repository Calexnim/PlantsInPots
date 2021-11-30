// SignUp.js
import React from 'react'
import {
  View,
  TextInput,
} from 'react-native'
import {
  Button,
} from 'react-native-elements'
import externalStyle from '../style/style'
import axios from 'axios';
import constants from '../modules/constants';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import globals from '../modules/globals.js';

export default class Register extends React.Component {
  state = {
    email: '', username: '', password: '', password1: ''
  }
  onChangeText = (key, val) => {
    this.setState({ [key]: val })
  }
  signUp = async () => {
    const { 
      email, 
      username, 
      password, 
      password1,
    } = this.state
    if (email && username && password && password1){
      await axios({
        method: 'post',
        url: constants.URL+'/api/account/register',
        data: {
          email: email,
          username: username,
          password: password,
          password1: password1,
        }
      }).then(function (response) {
        console.log(response.data);
        // Check if the account is created and token is return
        if (response.data.token) {
          Toast.show({
            type: 'success',
            position: 'bottom',
            text1: "Account Created!",
          })
          globals.setLogin();
        }
        else if (response.data.email || response.data.username) {
          Toast.show({
            type: 'error',
            position: 'bottom',
            text1: response.data.email? response.data.email : response.data.username,
          })
        }
      }).catch((error) => {
        console.log(error.response.data.password);
        // Display Error for different password
        Toast.show({
          type: 'error',
          position: 'bottom',
          text1: error.response.data.password,
        })
      })
    }
    // check if fields are empty
    else {
      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: 'Please insert all the fields',
      })
    }
  }
 
  render() {
    return (
      <View style={externalStyle.container}>
        <TextInput
          style={externalStyle.input}
          placeholder='Email'
          autoCapitalize="none"
          placeholderTextColor='grey'
          keyboardType='email-address'
          onChangeText={val => this.onChangeText('email', val)}
        />
        <TextInput
          style={externalStyle.input}
          placeholder='Username'
          autoCapitalize="none"
          placeholderTextColor='grey'
          onChangeText={val => this.onChangeText('username', val)}
        />
        <TextInput
          style={externalStyle.input}
          placeholder='Password'
          secureTextEntry={true}
          autoCapitalize="none"
          placeholderTextColor='grey'
          onChangeText={val => this.onChangeText('password', val)}
        />
        <TextInput
          style={externalStyle.input}
          placeholder='Re-enter password'
          secureTextEntry={true}
          autoCapitalize="none"
          placeholderTextColor='grey'
          onChangeText={val => this.onChangeText('password1', val)}
        />
        <Button
          buttonStyle={externalStyle.button}
          type="solid"
          title='Sign Up'
          onPress={ 
            this.signUp
          }
        />
      </View>
    )
  }
}

