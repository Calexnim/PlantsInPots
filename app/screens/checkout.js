import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Divider } from 'react-native-elements';
import externalStyle from '../style/style';

const Checkout = () => {
    uploadPaymentReceipt = () => {
        console.log("payment receipt")
    }
    cashOnDelivery = () => {
        console.log("cash on delivery")
    }
    deliveryForService = () => {
        console.log("delivery for service")
    }
    onSitePickup = () => {
        console.log("Onsite Pick up")
    }
    return(
        <View style={styles.container}>
            <View>
                <Text style={styles.textTitle}>
                    Payment Option:
                </Text>
                <View style={styles.touchableView}>
                    <TouchableOpacity onPress={() => uploadPaymentReceipt()}>
                        <Text style={styles.touchableText}>
                            Upload Payment Receipt
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
            <Divider style={{margin: 20, marginLeft: 15, marginRight: 15, color: 'black'}}/>
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
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white',
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
})
export default Checkout;