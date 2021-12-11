import React, { Component } from 'react';
import { SafeAreaView, Text, TextInput, View } from 'react-native';
import { Button, SearchBar } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import globals from '../modules/globals.js';
import externalStyle from '../style/style.js';
import { color } from 'react-native-elements/dist/helpers';
import { StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import axios from 'axios';
import constants from '../modules/constants.js';

class Home extends Component {
  constructor(props) {
      super(props);
      this.state = {
        search: "",
        category: [],
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
    await axios({
      method: 'get',
      url: constants.URL+'/api/category',
    }).then((response) => {
        var category = [];
        for (let i in response.data){
          // this.element["label"] = response.data[i].name
          // this.element["value"] = response.data[i].id
          category.push({label : response.data[i].name, value : response.data[i].id});
          // console.log(response.data[i].name)
        }
        this.setState({
          category : category
        })
    })
  } catch (e){
    console.log(e);
  }
}
updateSearch = (search) => {
  this.setState({ search });
};

searchCategory = (value) => {
  console.log(value)
}
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
              onValueChange={(value) => this.searchCategory(value)}
              placeholder={
                {label: 'Filter'}
              }
              items = {this.state.category}
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
