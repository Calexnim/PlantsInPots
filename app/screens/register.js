// SignUp.js
import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import {
  View,
  TextInput,
  StyleSheet
} from 'react-native'
import {
  Button,
} from 'react-native-elements'

export default class SignUp extends React.Component {
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
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder='Username'
          autoCapitalize="none"
          placeholderTextColor='grey'
          onChangeText={val => this.onChangeText('username', val)}
        />
        <TextInput
          style={styles.input}
          placeholder='Password'
          secureTextEntry={true}
          autoCapitalize="none"
          placeholderTextColor='grey'
          onChangeText={val => this.onChangeText('password', val)}
        />
        <TextInput
          style={styles.input}
          placeholder='Email'
          autoCapitalize="none"
          placeholderTextColor='grey'
          keyboardType='email-address'
          onChangeText={val => this.onChangeText('email', val)}
        />
        <TextInput
          style={styles.input}
          placeholder='Phone Number'
          autoCapitalize="none"
          placeholderTextColor='grey'
          keyboardType="phone-pad"
          onChangeText={val => this.onChangeText('phone_number', val)}
        />
        <Button
          buttonStyle={
              {
                  backgroundColor: '#6ea8a1',
                  margin: 10,
                  borderRadius: 14,
                  paddingLeft: 20,
                  paddingRight: 20,
              }
          }
          type="solid"
          title='Sign Up'
          onPress={this.signUp}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  input: {
    width: 350,
    height: 55,
    backgroundColor: 'white',
    margin: 10,
    padding: 8,
    color: 'black',
    borderRadius: 14,
    borderColor: 'black',
    fontSize: 18,
    fontWeight: '500',
    
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
})