import React, { Component } from 'react';
import { SafeAreaView, Text, TextInput, View } from 'react-native';
import { Button, SearchBar } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import globals from '../modules/globals.js';
import externalStyle from '../style/style.js';
import { color } from 'react-native-elements/dist/helpers';
import { StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

class Home extends Component {
  constructor(props) {
      super(props);
      this.state = {
        search: "",
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
updateSearch = (search) => {
  this.setState({ search });
};
  render() {
    const { search } = this.state;
    return (
      <View style={{flex: 1 }}>
        <View style={styles.topContainer}>
            {/* <TextInput
              style={{
                width: 350,
                margin: 14,
                padding: 5,
                backgroundColor: 'white',
                borderRadius: 14,
              }}
              placeholder='Search'
              autoCapitalize='none'
              placeholderTextColor='grey'
            /> */}
            <SearchBar
              placeholder="Search.."
              onChangeText={this.updateSearch}
              value={search}
              containerStyle={{
                backgroundColor: 'white',
                borderRadius: 14,
              }}
              inputStyle={{
                backgroundColor: 'white',
                color: 'black',
              }}
              leftIconContainerStyle={{
                backgroundColor: 'white',
              }}
              rightIconContainerStyle={{
                backgroundColor: 'white',
              }}
              inputContainerStyle={{
                backgroundColor: 'white',
              }}
              lightTheme='false'
            />
            <RNPickerSelect
              style={{
                backgroundColor: 'white',
                margin: 10,
                borderColor: 'blue',
                color: 'black',
              }}
              onValueChange={(value) => console.log(value)}
              placeholder={
                {label: 'Filter'}
              }
              items = {[
                { label: 'Football', value: 'football' },
                { label: 'Baseball', value: 'baseball' },
                { label: 'Hockey', value: 'hockey' },
              ]}
            />
        </View>
      </View>  
    );
  }
}
const styles = StyleSheet.create({
  topContainer: {
    backgroundColor: 'white',
    color: 'black',
    margin: 10,
    borderRadius: 15,
  },
});
export default Home;
