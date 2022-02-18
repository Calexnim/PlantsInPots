import React, { Component, useEffect, useState } from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { Button, Divider } from 'react-native-elements';
import externalStyle from '../style/style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import globals from '../modules/globals'
import axios from 'axios';
import constants from '../modules/constants';
import { useNavigation } from '@react-navigation/native';
const Profile = (props) => {
    const [username, setUsername] = useState();
    const navigation = useNavigation();
    const [user_id, setUserId] = useState();
    useEffect(() => {
        async function fetchUser(){
            try{
                userId = await AsyncStorage.getItem('user_id')
            } catch(error){
                console.log(error)
            }
            try{
                await axios({
                    method: 'get',
                    url: constants.URL + '/api/account/' + userId
                }).then((response) => {
                    setUserId(userId)
                    setUsername(response.data.username)
                })
            } catch(error){
                console.log(error)
            }
        }
        fetchUser();
    }, [])
    logout = async () => {
        try {
            AsyncStorage.clear()
            //console.log('token removed');
            globals.setLogout();

        } catch (e) {
            //console.log(e)
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.innerContainer}>
                {
                    username ?     
                    <View>
                        <Text style={styles.textTitle}>
                            {username}
                        </Text> 
                        <Divider style={{marginHorizontal: 10}}/>
                    </View> :
                    null
                }
                <View style={styles.touchableView}>
                    {
                        user_id ?
                        <TouchableOpacity onPress={() => navigation.navigate('OrderHistory', {user_id: user_id})}>
                            <Text style={styles.touchableText}>
                                Order History
                            </Text>
                        </TouchableOpacity> :
                        null
                    }
                </View>
                <View style={styles.touchableView}>
                    <TouchableOpacity onPress={() => logout()}>
                        <Text style={styles.touchableText}>
                            Logout
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
    </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    textTitle: {
        margin: 10,
        textAlign: 'left',
        fontSize: 24,
        fontWeight: 'bold',
        color: 'black',
    },
    innerContainer: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white',
        margin: 10,
        borderRadius: 10,
        // justifyContent: 'space-between',
    },
    button: {
        backgroundColor: '#6ea8a1',
        marginHorizontal: 10,
        marginVertical: 5,
        borderRadius: 14,
        marginTop: 30,
        paddingLeft: 50,
        paddingRight: 50,
        // width: "60%",
        textAlign: "center",
    },
    touchableView: {
        justifyContent: 'center', 
        backgroundColor: '#6ea8a1',
        borderRadius: 14,
        margin: 10,
    },
    touchableText: {
        alignSelf: 'center',
        margin: 20,
        fontSize: 18,
        fontWeight: '600',
        color: 'black',
    },
})
export default Profile