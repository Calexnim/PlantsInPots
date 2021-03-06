import React, { Component, useEffect } from 'react';
import Toast from 'react-native-toast-message';
import axios from 'axios';
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
import globals from '../modules/globals.js';
import constants from '../modules/constants.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class Login extends Component {
    constructor() {
        super();
        this.state = { email: '', password: '' }
    }
    // state = {
    //   email: '', password: ''
    // }
    onChangeText = (key, val) => {
        this.setState({ [key]: val })
    }
    login = async () => {
        const {
            email,
            password,
        } = this.state
        // Post email & password get token
        await axios({
            method: 'post',
            url: constants.URL + '/api/account/login',
            data: {
                username: email,
                password: password,
                firebase_token: globals.firebaseToken
            }
        }).then(function (response) {
            //console.log(response.data.token);
            // Store token using AsyncStorage
            const token = JSON.stringify(response.data.token)
            const user_id = JSON.stringify(response.data.user_id)
            try {
                AsyncStorage.setItem('user_id', user_id)
                AsyncStorage.setItem('token', token)
                globals.setLogin();
            } catch (e) {
                console.log(e)
            }
        }).then(async function (){
            globals.user_id = await AsyncStorage.getItem('user_id')
        }).catch((error) => {
            Toast.show({
                type: 'error',
                position: 'bottom',
                text1: error.response.data["non_field_errors"][0],
            })
        });
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
                        this.login();
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

