import React, { useEffect, useState, useCallback } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import axios from 'axios';
import constants from '../modules/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import globals from '../modules/globals.js';
import Geolocation from '@react-native-community/geolocation';
import { Alert } from 'react-native';

const DeliveryOption = (props) => {
    const [orderItems, setOrderItems] = useState([])
    var temp_products = []
    const [coordinates, setCoordinates] = useState([])
    const navigation = useNavigation();
    useEffect(() => {
        props.route.params?.items.map((item, index) => {
            var single_item = {
                'product': item.product.id,
                'pot': item.pot.id,
                'fertilizer': item.fertilizer.id,
                'sub_total': ((parseFloat(item.product.price) + parseFloat(item.pot.price) + parseFloat(item.fertilizer.price)).toFixed(2))
            }
            temp_products.push(single_item)
        })
        setOrderItems(temp_products)
        Geolocation.getCurrentPosition(info => setCoordinates(info))
    }, [])

    saveOrder = async (delivery) => {
        var data = {};
        if (delivery) {
            Alert.alert(
                "Pin location",
                "Pin your current location?",
                [
                  {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                  },
                  { text: "Pin", onPress: async () => {
                        data = {
                            "order_item": orderItems,
                            "name": props.route.params?.name,
                            "email": props.route.params?.email,
                            "phone": props.route.params?.phone,
                            "total": props.route.params?.total,
                            "payment_option": props.route.params?.payment_option,
                            "delivery_option": "delivery",
                            "user": globals.user_id,
                            'latitude': coordinates.coords.latitude,
                            'longtitude': coordinates.coords.longitude
                        }
                        try{
                            await axios({
                                method: 'post',
                                url: constants.URL + '/api/order/',
                                data: data
                            }).then((response) => {
                                navigation.navigate('Order', {
                                    order_id: response.data.id
                                })
                            });
                            // Delete Cart if order is created
                            try{
                                await axios({
                                    method: 'delete',
                                    url: constants.URL + '/api/cart/' + globals.user_id + '/',
                                }).then((response) => {
                                    console.log(response.data)
                                });
                            } catch(error) {
                                console.log(error.response)
                            }
                        } catch(error){
                            console.log(error.response.data)
                        }  
                  }}
                ]
              );      
        }
        else{
            data = {
                "order_item": orderItems,
                "name": props.route.params?.name,
                "email": props.route.params?.email,
                "phone": props.route.params?.phone,
                "total": props.route.params?.total,
                "payment_option": props.route.params?.payment_option,
                "delivery_option": "pickup",
                "user": globals.user_id
            }
            try{
                await axios({
                    method: 'post',
                    url: constants.URL + '/api/order/',
                    data: data
                }).then((response) => {
                    navigation.navigate('Order', {
                        order_id: response.data.id
                    })
                });
                // Delete Cart if order is created
                try{
                    await axios({
                        method: 'delete',
                        url: constants.URL + '/api/cart/' + globals.user_id + '/',
                    }).then((response) => {
                        console.log(response.data)
                    });
                } catch(error) {
                    console.log(error.response)
                }
            } catch(error){
                console.log(error.response.data)
            }  
        }
    }

    deliveryForService = async () => {
        saveOrder(delivery=true)
    }
    onSitePickup = async () => {
        saveOrder(delivery=false)
    }
    return(
        <View>
            <Text style={styles.textTitle}>
                Delivery Option:
            </Text>
            <View style={styles.touchableView}>
                <TouchableOpacity onPress={() => deliveryForService()}>
                    <Text style={styles.touchableText}>
                        Delivery for Service
                    </Text>
                </TouchableOpacity>
            </View>
            <View>
                <Text style={{alignSelf: 'center', color: 'black'}}>
                    OR
                </Text>
            </View>
            <View style={styles.touchableView}>
                <TouchableOpacity onPress={() => onSitePickup()}>
                    <Text style={styles.touchableText}>
                        Onsite Pick-up 
                    </Text>
                </TouchableOpacity>
            </View>
        </View> 
    )
}

const styles = StyleSheet.create({
    textTitle: {
        margin: 10,
        textAlign: 'left',
        fontSize: 24,
        fontWeight: 'bold',
        color: 'black',
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
export default DeliveryOption;