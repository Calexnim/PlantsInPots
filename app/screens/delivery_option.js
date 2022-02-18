import React, { useEffect, useState, useCallback } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import axios from 'axios';
import constants from '../modules/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const DeliveryOption = (props) => {
    const [orderItems, setOrderItems] = useState([])
    var temp_products = []
    const navigation = useNavigation();
    useEffect(() => {
        props.route.params?.items.map((item, index) => {
            var single_item = {
                'product': item.product.id,
                'pot': item.pot.id,
                'fertilizer': item.fertilizer.id,
                'sub_total': (parseFloat(item.product.price) + parseFloat(item.pot.price) + parseFloat(item.fertilizer.price)).toFixed(2)
            }
            temp_products.push(single_item)
        })
        setOrderItems(temp_products)
    }, [])

    deliveryForService = () => {
        console.log("delivery for service")
    }
    onSitePickup = async () => {
        try{
            user_id = await AsyncStorage.getItem('user_id');
            try{
                await axios({
                    method: 'post',
                    url: constants.URL + '/api/order/',
                    data: {
                        "order_item": orderItems,
                        "name": props.route.params?.name,
                        "email": props.route.params?.email,
                        "phone": props.route.params?.phone,
                        "total": props.route.params?.total,
                        "payment_option": props.route.params?.payment_option,
                        "delivery_option": "pickup",
                        "user": user_id
                    }
                }).then((response) => {
                    navigation.navigate('Order', {
                        order_id: response.data.id
                    })
                });
                // Delete Cart if order is created
                try{
                    await axios({
                        method: 'delete',
                        url: constants.URL + '/api/cart/' + user_id + '/',
                    }).then((response) => {
                        console.log(response.data)
                    });
                } catch(error) {
                    console.log(error.response)
                }
            } catch(error){
                console.log(error.response)
            }
        } catch(error){
            console.log(error.response)
        }
        
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