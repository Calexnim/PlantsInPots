import React, { Component, useEffect, useState, useCallback } from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    ActivityIndicator,
} from 'react-native';
import { Button, Divider } from 'react-native-elements';
import externalStyle from '../style/style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import globals from '../modules/globals'
import axios from 'axios';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import constants from '../modules/constants';
const OrderHistory = (props) => {
    const [orderHistoryItem, setOrderHistoryItem] = useState([]);
    const navigation = useNavigation();
    useFocusEffect(
        useCallback(() => {
            let isActive = true;
            async function fetchOrderHistory() {
                user_id = props.route.params?.user_id
                if (user_id) {
                    try {
                        await axios({
                            method: 'get',
                            url: constants.URL + '/api/order/user/' + user_id
                        }).then((response) => {
                            setOrderHistoryItem(response.data)
                        });
                    } catch (error) {
                        // Set Order History item empty if 404 error
                        setOrderHistoryItem([])
                    }
                }
                else {
                    setOrderHistoryItem([])
                }
            }
            fetchOrderHistory();
            return () => {
                isActive = false;
            };
        }, [])
    );
    openSingleItem = (order_id) => {
        navigation.navigate('SingleOrder', {
            order_id: order_id
        })
    }
    renderOrderHistory = () => {
        return orderHistoryItem.map((item, index) => {
            return (
                <TouchableOpacity key={item.id} onPress={() => openSingleItem(item.id)}>
                    <View style={styles.container}>
                        <Text style={{ color: 'black', fontSize: 25, marginHorizontal: 10, }}>
                            #ID: {item.id}
                        </Text>
                        <View style={{ flexDirection: 'row', marginHorizontal: 10 }}>
                            <Text>
                                Order Date:
                            </Text>
                            <Text style={styles.text}>
                                {item.order_date}
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row', marginHorizontal: 10}}>
                            <Text>
                                Total:
                            </Text>
                            <Text style={styles.text}>
                               RM {item.total}
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row', marginHorizontal: 10}}>
                            <Text>
                                Status:
                            </Text>
                            <Text style={styles.text}>
                                {item.order_status}
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
            );
        });
    }
    return (
        <ScrollView>
            {orderHistoryItem ?
                renderOrderHistory() :
                <ActivityIndicator />
            }
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#6ea8a1',
        margin: 10,
        borderRadius: 10,
        flexWrap: 'wrap',
        borderWidth: 1,
        borderColor: '#6ea8a1',
    },
    button: {
        backgroundColor: '#6ea8a1',
        textAlign: 'center',
        borderRadius: 14,
        margin: 15,
        flex: 1
    },
    checkoutButton: {
        backgroundColor: '#6ea8a1',
        textAlign: 'center',
        borderRadius: 14,
        margin: 15,
        flex: 1,
    },
    itemContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'white',
        margin: 10,
    },
    image: {
        width: 130,
        height: 170,
        alignSelf: 'flex-start',
        borderRadius: 20,
    },
    text: {
        marginHorizontal: 5, 
        color: 'black', 
        fontSize: 18
    },
    textTotal: {
        color: 'black',
        flex: 1,
        fontSize: 24,
        flexWrap: 'wrap',
        flexDirection: 'column',
        width: '100%',
        fontWeight: 'bold',
        textAlign: 'left',
    },
})
export default OrderHistory;