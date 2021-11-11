import React, { Component } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { Button } from 'react-native-elements';

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
 componentDidMount(){
    console.log("Mount");
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
