import React, { Component, useEffect, useState } from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    Alert,
    TextInput,
} from 'react-native';
import { Button, Divider } from 'react-native-elements';
import externalStyle from '../style/style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import globals from '../modules/globals'
import axios from 'axios';
import constants from '../modules/constants';
import { StackActions, useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';

const EditPassword = () => {
    const [old_password, setOldPassword] = useState(null);
    const [new_password, setNewPassword] = useState(null);
    const [token, setToken] = useState(null);
    const navigation = useNavigation();
    useEffect(() => {
        async function fetchToken(){
            user_token = await AsyncStorage.getItem('token')
            setToken(user_token)
        }
        fetchToken()
    }, [])

    editPassword = async () => {
        try{
            const formData = new FormData();
            formData.append('old_password', old_password);
            formData.append('new_password', new_password);
            await axios({
                method: 'put',
                url: constants.URL + '/api/account/change-password',
                headers: {
                    'Authorization': 'Token ' + JSON.parse(token),
                },
                data: formData,
            }).then((response) =>{
                Alert.alert(
                    "Success",
                    "Password has been successfully changed",
                    [
                      {
                        text: "Okay",
                        onPress: () => navigation.dispatch(StackActions.popToTop()),
                        style: "default"
                      }
                    ]
                  );
            })
        }catch(error){
            console.log(error.response.data)
            Alert.alert(
                "Invalid",
                "Invalid Password",
                [
                  {
                    text: "Okay",
                    onPress: () => {},
                    style: "default"
                  }
                ]
              );
        }
    }
    return(
        <View style={externalStyle.container}>
            <TextInput
                style={externalStyle.input}
                placeholder='Old Password'
                secureTextEntry={true}
                autoCapitalize='none'
                onChangeText={setOldPassword}
            />
            <TextInput
                style={externalStyle.input}
                placeholder='New Password'
                secureTextEntry={true}
                autoCapitalize='none'
                onChangeText={setNewPassword}
            />
            <Button
                buttonStyle={externalStyle.button}
                type="solid"
                title='Reset Password'
                onPress={() => {editPassword()}}
            />
        </View>
    )
}

export default EditPassword;