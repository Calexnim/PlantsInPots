import React, { Component } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import globals from '../modules/globals.js';
import externalStyle from '../style/style.js';
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cde: "testtestest"
        }
    }
 componentWillUnmount(){
    console.log("Will Unmount");
 }
 componentDidUpdate(){
    console.log("Did Update");
 }
 componentDidMount = async() => {
  try {
    const value = await AsyncStorage.getItem('token')
    if (value !== null){
      console.log(value != null ? JSON.parse(value): null)
      globals.setLogin();
    }
  } catch (e){
    console.log(e);
  }
}

  render() {
    return (
      <View style={externalStyle.container}>
        <View>
          <Text>{this.state.cde}</Text>
        </View>
      </View>  
    );
  }
}

export default Home;
