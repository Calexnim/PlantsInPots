import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { Component } from 'react';
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
import Register from './register';
import globals from '../modules/globals.js';


const Stack = createNativeStackNavigator();
// export function Account() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator>
//         <Stack.Screen name="Register" component={Register} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   )
// }
export default class Login extends Component {
  state = {
    email: '', password: ''
  }
  onChangeText = (key, val) => {
    this.setState({[key]: val})
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

