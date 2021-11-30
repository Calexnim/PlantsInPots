import React, { Component } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import globals from '../modules/globals.js';
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cde: "testtestest"
        }
    }
 componentWillUnmount(){
    console.log("UnMount");
 }
 componentDidUpdate(){
    console.log("UPdate");
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
      <SafeAreaView>
          <Text>{this.state.cde}</Text>
            <Button title="test" 
                onPress={() => this.props.navigation.navigate('Login')}
            />
            <Button title="test1" 
                onPress={() => this.setState({cde: "after change"})}
            />
      </SafeAreaView>  
    );
  }
}

export default Home;
