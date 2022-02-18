import React, { useState, useCallback, useEffect } from 'react';
import { Text, View, StyleSheet, ScrollView, Alert } from 'react-native';
import axios from 'axios';
import constants from '../modules/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FastImage from 'react-native-fast-image';
import { Divider } from 'react-native-elements/dist/divider/Divider';
import { Button } from 'react-native-elements/dist/buttons/Button';
import externalStyle from '../style/style';
import { useFocusEffect } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';

const Cart = (props) => {
    const navigation = useNavigation()
    const [cartItem, setCartItem] = useState([]);
    var total = [];
    var user_id;
    useFocusEffect(
        useCallback(() => {
            let isActive = true;
            async function fetchCart() {
                try{
                    user_id = await AsyncStorage.getItem('user_id');
                } catch(error){
                    console.log(error)
                }
                // Check if user is login
                if (user_id){
                    try {
                        await axios({
                            method: 'get',
                            url: constants.URL + '/api/cart/' + user_id
                        }).then((response) => {
                            // console.log(response.data.cart_item[0].product)
                            setCartItem(response.data.cart_item)
                        });
                    } catch (error) {
                        // Set cartItem empty if 404
                        setCartItem([])
                    }
                }
                // update cart state to empty array if not login
                else{
                    setCartItem([])
                }
            }
            fetchCart();
            return () => {
                isActive = false;
            };
        }, [])
    );

    // Delete an item from cart
    deleteItem = async (item_id) => {
        try{
            await axios({
                method: 'delete',
                url: constants.URL + '/api/cart-item/' + item_id + '/'
            }).then((response) => {
                const new_cart_item = cartItem.filter((cart_item) => cart_item.id !== item_id);
                setCartItem(new_cart_item)
            });
        } catch(error){
            console.log(error)
        }
    }

    calculateSubtotal = (product_price, pot_price, fertilizer_price) => {
        product_price = parseFloat(product_price);
        pot_price = parseFloat(pot_price);
        fertilizer_price = parseFloat(fertilizer_price);
        subtotal = (product_price + pot_price + fertilizer_price).toFixed(2);
        total.push(parseFloat(subtotal));
        return subtotal;
    }

    renderCartItems = () => {
        return cartItem.map((item, index) => {
            return (
                <View style={styles.container} key={item.id}>
                    <View style={{ margin: 10}}>
                        <FastImage
                            style={styles.image}
                            source={{ uri: item.product.image }}
                        />
                    </View>
                    <View style={{ margin: 10, marginLeft: 20, alignSelf: 'stretch', flex: 1}}>
                        <Text style={{ color: 'grey', fontSize: 14 }}>
                            Name:
                        </Text>
                        <View style={{ flexDirection: 'row'}}>
                            <Text style={styles.text}>
                                {item.product.name}
                            </Text>
                        </View>
                        <Text style={{ color: 'grey', fontSize: 14 }}>
                            Pot:
                        </Text>
                        <Text style={styles.text}>
                            {item.pot.name}
                        </Text>
                        <Text style={{ color: 'grey', fontSize: 14 }}>
                            Fertilizer:
                        </Text>
                        <Text style={styles.text}>
                            {item.fertilizer.name}
                        </Text>
                        <Text style={{ color: 'grey', fontSize: 14 }}>
                            Subtotal:
                        </Text>
                        <Text style={styles.text}>
                            RM {calculateSubtotal(item.product.price, item.pot.price, item.fertilizer.price)}
                        </Text>
                        <View>
                            <Button
                                buttonStyle={styles.button}
                                type="solid"
                                title="Remove"
                                onPress={() => deleteItem(item.id)}
                            />
                        </View>
                    </View>
                    <Divider />
                </View>
            );
        });
    }
    checkoutCart = () => {
        Alert.alert(
            "Proceed to Checkout",
            "Confirm your cart before proceed",
            [
              {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
              },
              { text: "OK", onPress: () => navigation.navigate('PaymentOption', {
                  total: total.reduce((previousValue, currentValue) => previousValue + currentValue, 0).toFixed(2),
                  cart_item: cartItem,
              })}
            ]
          );
    }
    displayCart = () => {
        if (cartItem.length == 0) {
            return (
                <View style={{backgroundColor: 'white', margin: 10, alignSelf: 'center', borderRadius: 20,}}>
                    <Text style={{textAlign: 'center', fontSize: 30, color: 'black', margin: 10}}>
                        Cart is empty
                    </Text>
                </View>
            )
        }
        else {
            return (
                <ScrollView>
                    {renderCartItems()}
                    <View style={styles.totalView}>
                        <View style={{marginRight: 10, marginLeft: 10, marginTop: 10, alignContent: 'center'}}>
                            <Text style={{ color: 'grey', fontSize: 14, textAlign: 'left'}}>
                                Total
                            </Text>
                            <Text style={styles.textTotal}>
                            RM {total.reduce((previousValue, currentValue) => previousValue + currentValue, 0).toFixed(2)}
                            </Text>
                            
                        </View>
                        <View style={{margin: 10}}>
                            <Button 
                                    buttonStyle={styles.checkoutButton}
                                    type="solid"
                                    title="Checkout "
                                    icon={{
                                        name: 'arrow-right',
                                        type: 'font-awesome',
                                        size: 15,
                                        color: 'white',
                                    }}
                                    iconRight
                                    onPress={() => {
                                        checkoutCart()
                                    }}
                                />
                        </View>
                    </View>
                </ScrollView>
            )
        }
    }
    return (
        <View>
            {displayCart()}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'white',
        margin: 10,
        borderRadius: 10,
        flexWrap: 'wrap',
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
        color: 'black',
        fontSize: 18,
        flexWrap: 'wrap',
        flex: 1,
        flexDirection: 'column',
        width: '100%',
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
    textSubtotal: {
        color: 'black',
        fontSize: 17,
        fontWeight: 'bold',
    },
    totalView: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'white',
        margin: 10,
        borderRadius: 10,
        justifyContent: 'space-between'
    }
})
export default Cart;