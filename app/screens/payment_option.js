import React, { useEffect, useState, useCallback } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Divider } from 'react-native-elements';
import externalStyle from '../style/style';
import FastImage from 'react-native-fast-image';
import { useNavigation, StackActions } from '@react-navigation/native';
const PaymentOption = (props) => {
    const navigation = useNavigation()

    emailPaymentReceipt = () => {
        navigation.navigate('Payment', {
            payment_option: 'online',
            items: props.route.params?.cart_item,
            total: props.route.params?.total,
            user_id: props.route.params?.user_id,    
        })
    }
    cashOnDelivery = () => {
        navigation.navigate('Payment', {
            payment_option: 'cod',
            items: props.route.params?.cart_item,
            total: props.route.params?.total,
        })
    }
    calculateSubtotal = (product_price, pot_price, fertilizer_price) => {
        product_price = parseFloat(product_price);
        pot_price = parseFloat(pot_price);
        fertilizer_price = parseFloat(fertilizer_price);
        subtotal = (product_price + pot_price + fertilizer_price).toFixed(2);
        return subtotal;
    }
    renderCartItems = () => {
        return props.route.params?.cart_item.map((item, index) => {
            return (
                <View style={styles.cart_item_container} key={item.id}>
                    <View style={{ margin: 10}}>
                        <FastImage
                            style={styles.image}
                            source={{ uri: item.product.image }}
                        />
                    </View>
                    <View style={{ margin: 10, marginLeft: 20, alignSelf: 'stretch', flex: 1}}>
                        <Text style={{ color: 'grey', fontSize: 12 }}>
                            Name:
                        </Text>
                        <View style={{ flexDirection: 'row'}}>
                            <Text style={styles.text}>
                                {item.product.name}
                            </Text>
                        </View>
                        <Text style={{ color: 'grey', fontSize: 12 }}>
                            Pot:
                        </Text>
                        <Text style={styles.text}>
                            {item.pot.name}
                        </Text>
                        <Text style={{ color: 'grey', fontSize: 12 }}>
                            Fertilizer:
                        </Text>
                        <Text style={styles.text}>
                            {item.fertilizer.name}
                        </Text>
                        <Text style={{ color: 'grey', fontSize: 12 }}>
                            Subtotal:
                        </Text>
                        <Text style={styles.text}>
                            RM {calculateSubtotal(item.product.price, item.pot.price, item.fertilizer.price)}
                        </Text>
                    </View>
                    <Divider />
                </View>
            );
        });
    }
    return(
        <ScrollView>
            {renderCartItems()}
            <View style={styles.totalView}>
                    <View style={{marginRight: 10, marginLeft: 10, marginTop: 10, alignContent: 'center'}}>
                        <Text style={{ color: 'grey', fontSize: 14, textAlign: 'left'}}>
                            Total:
                        </Text>
                        <Text style={styles.textTotal}>
                            RM {props.route.params?.total}
                        </Text>
                        
                    </View>
            </View>
            <View>
                <Text style={styles.textTitle}>
                    Payment Option:
                </Text>
                <View style={styles.touchableView}>
                    <TouchableOpacity onPress={() => emailPaymentReceipt()}>
                        <Text style={styles.touchableText}>
                            Email Payment Receipt
                        </Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <Text style={{alignSelf: 'center', color: 'black'}}>
                        OR
                    </Text>
                </View>
                <View style={styles.touchableView}>
                    <TouchableOpacity onPress={() => cashOnDelivery()}>
                        <Text style={styles.touchableText}>
                            Cash on Delivery
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white',
        margin: 10,
        borderRadius: 14,
    },
    cart_item_container: {
        flexDirection: 'row',
        backgroundColor: 'white',
        margin: 10,
        borderRadius: 14,
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
    textTitle: {
        margin: 10,
        textAlign: 'left',
        fontSize: 24,
        fontWeight: 'bold',
        color: 'black',
    },
    totalView: {
        flexDirection: 'row',
        backgroundColor: 'white',
        margin: 10,
        borderRadius: 10,
        justifyContent: 'space-between'
    },
    text: {
        color: 'black',
        fontSize: 16,
        flexWrap: 'wrap',
        flex: 1,
        flexDirection: 'column',
        width: '100%',
    },
    image: {
        width: 120,
        height: 150,
        alignSelf: 'flex-start',
        borderRadius: 20,
    },
    textTotal: {
        color: 'black',
        fontSize: 24,
        flexWrap: 'wrap',
        flexDirection: 'column',
        width: '100%',
        fontWeight: 'bold',
        textAlign: 'left',
    },
})
export default PaymentOption;