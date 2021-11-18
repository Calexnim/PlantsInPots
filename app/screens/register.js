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

export default class Register extends React.Component {
  state = {
    username: '', password: '', email: '', phone_number: ''
  }
  onChangeText = (key, val) => {
    this.setState({ [key]: val })
  }
  signUp = async () => {
    const { username, password, email, phone_number } = this.state
    // try {
    //   // here place your signup logic
    //   console.log('user successfully signed up!: ', success)
    // } catch (err) {
    //   console.log('error signing up: ', err)
    // }
    navigation.navigate('home')
  }
 
  render() {
    return (
      <View style={externalStyle.container}>
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
          placeholder='Email'
          autoCapitalize="none"
          placeholderTextColor='grey'
          keyboardType='email-address'
          onChangeText={val => this.onChangeText('email', val)}
        />
        <TextInput
          style={externalStyle.input}
          placeholder='Phone Number'
          autoCapitalize="none"
          placeholderTextColor='grey'
          keyboardType="phone-pad"
          onChangeText={val => this.onChangeText('phone_number', val)}
        />
        <Button
          buttonStyle={externalStyle.button}
          type="solid"
          title='Sign Up'
          onPress={this.signUp}
        />
      </View>
    )
  }
}

