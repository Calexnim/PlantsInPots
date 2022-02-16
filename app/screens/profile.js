import React, { Component } from 'react';
import { 
  Text,
  View, 
} from 'react-native';
import { Button } from 'react-native-elements';
import externalStyle from '../style/style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import globals from '../modules/globals'
export default class Profile extends Component {
componentWillUnmount(){
    console.log("Profile");
}
logout = async() => {
 try{
  //  const token = AsyncStorage.removeItem('token')
  AsyncStorage.clear()
  console.log('token removed');
  globals.setLogout();
   
 }catch(e){
   console.log(e)
 }
}
  render() {
    return (
      <View style = {externalStyle.container}>
        <Button
          buttonStyle={externalStyle.button}
          type="solid"
          title="Logout"     
          onPress={this.logout}    
        />
      </View>

    );
  }
}
