import React, { Component } from 'react';
import { SafeAreaView, Text, TextInput, View, FlatList, StyleSheet } from 'react-native';
import { Button, SearchBar } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import globals from '../modules/globals.js';
import RNPickerSelect from 'react-native-picker-select';
import axios from 'axios';
import constants from '../modules/constants.js';
import ProductList from '../modules/product_render.js';

export default class Home extends Component {
  constructor(props) {
      super(props);
      this.state = {
        search_value: "",
        category: [],
        products: [],
      }
  }
  // Render Product Item
  // renderItem = ({ item }) => (
  //   <Item 
  //     id={item.id}
  //     image={item.image}
  //     name={item.name}
  //     price={item.price}
  //     // onPress={() => setSelectedId(item.id)}
  //   />
  // );
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
        // store name: id object into category array
        for (let i in response.data){
          category.push({label : response.data[i].name, value : response.data[i].id});
        }
        // set state for category 
        this.setState({
          category : category
        })
    })
  } catch (error){
    console.log(error);
  }
  // GET all product request
  try{
    await axios({
      method: 'get',
      url: constants.URL+'/api/product'
    }).then((response) => {
      this.setState({products: response.data});
      console.log(this.state.products)
    })
  } catch (error){
    console.log(error);
  }
}
searchProduct = async(search_value) => {
  this.setState({ search_value });
  console.log(search_value)
  try{
    await axios({
      method: 'get',
      url: constants.URL+'/api/product/?search='+search_value
    }).then((response) => {
      this.setState({products: response.data});
      console.log(this.state.products)
    })
  } catch(error){
    console.log(error.response.data);
  }
};

searchCategory = async(value) => {
  if (value == 'all'){
    try{
      await axios({
        method: 'get',
        url: constants.URL+'/api/product'
      }).then((response) => {
        this.setState({products: response.data});
        console.log(this.state.products)
      })
    } catch (error){
      console.log(error);
    }
  }
  else{
    try{
      await axios({
        method: 'get',
        url: constants.URL+'/api/product/?category='+value
      }).then((response) => {
        this.setState({products: response.data});
        console.log(this.state.products)
      })
    } catch (error){
      console.log(error.response.data)
      this.setState({products: []});
    }
  }
  console.log(value);
}
  render() {
    const { search_value } = this.state;
    const getHeader = () => {
      return (
        <View style={styles.topContainer}>
          <SearchBar
            placeholder="Search.."
            onChangeText={this.searchProduct}
            value={search_value}
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
              {
                label: 'All',
                value: 'all',
              }
            }
            // Populate category in items
            items = {this.state.category}
            />
        </View>
      );
    };
    // return (
    //   <SafeAreaView style={{flex: 1 }}>
    //     <FlatList
    //       style = {styles.productItem}
    //       data={this.state.products}
    //       renderItem={item => this.renderItem(item)}
    //       horizontal={false}
    //       numColumns={2}
    //       ListHeaderComponent={getHeader}
    //     />
    //   </SafeAreaView>  
    // );
    return(
      <ProductList 
        products={this.state.products}
        header={getHeader()}
      />
    )
  }
}

const styles = StyleSheet.create({
  topContainer: {
    backgroundColor: 'white',
    color: 'black',
    margin: 10,
    borderRadius: 15,
  },
  productContainer: {
    backgroundColor: 'white',
    margin: 10,
    flex: 1,
    flexDirection: 'row'
  },
});