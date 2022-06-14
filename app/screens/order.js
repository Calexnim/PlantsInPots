import React, { useEffect, useState, useCallback } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView, ActivityIndicator, Alert} from 'react-native';
import axios from 'axios';
import constants from '../modules/constants';
import FastImage from 'react-native-fast-image';
import { Divider } from 'react-native-elements/dist/divider/Divider';
import { StackActions, useNavigation } from '@react-navigation/native';


const Order = (props) => {
    const [responseData, setResponseData] = useState();
    const [orderItem, setOrderItem] = useState([]);
    const navigation = useNavigation();
    var hasUnsavedChanges = true;
    useEffect(() => {
        async function fetchOrder() {
            try {
                await axios({
                    method: 'get',
                    url: constants.URL + '/api/order/' + props.route.params?.order_id
                }).then((response) => {
                    setResponseData(response.data)
                    setOrderItem(response.data.order_item)
                });
            } catch (error) {
                console.log(error)
            }
        }
        fetchOrder();
    }, []);

    

    useEffect(
        () =>
          navigation.addListener('beforeRemove', (e) => {
            if (hasUnsavedChanges) {
                // Prevent default behavior of leaving the screen
                e.preventDefault();
        
                // Prompt the user before leaving the screen
                Alert.alert(
                  'Do you want to leave?',
                  'Confirm go back?',
                  [
                    { text: "Cancel", style: 'cancel', onPress: () => {} },
                    {
                      text: 'Go Back',
                      style: 'destructive',
                      // If the user confirmed, then we dispatch the action we blocked earlier
                      // This will continue the action that had triggered the removal of the screen
                      onPress: () => [
                        hasUnsavedChanges = false,
                        navigation.dispatch(StackActions.popToTop()),
                      ] 
                    },
                  ]
                );
            }
          }),
        [hasUnsavedChanges]
      );

    renderOrderItems = () => {
        return orderItem.map((item, index) => {
            return (
                <View style={styles.itemContainer} key={index}>
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
                            RM {item.sub_total}
                        </Text>
                    </View>
                    <Divider />
                </View>
            );
        });
    }
    return(
        <ScrollView>
            <View style={{borderWidth: 1, margin: 10, borderRadius: 10, backgroundColor: 'white', borderColor: '#6ea8a1'}}>
                { responseData ? 
                    <View style={styles.orderView}>
                        <Text style={styles.textTitle}>
                            Order ID: {responseData.id}
                        </Text>
                        <Text style={styles.textDetail}>
                            Name: {responseData.name}
                        </Text>
                        <Text style={styles.textDetail}>
                            Email: {responseData.email}
                        </Text>
                        <Text style={styles.textDetail}>
                            Order Status: {responseData.order_status}
                        </Text>
                        <Text style={styles.textDetail}>
                            Payment Option: {responseData.payment_option}
                        </Text>
                        <Text style={styles.textDetail}>
                            Delivery Option: {responseData.delivery_option}
                        </Text>
                        <Text style={styles.textDetail}>
                            Order Date: {responseData.order_date}
                        </Text>
                    </View> :
                    <ActivityIndicator />
                }
                <Divider style={{marginVertical: 5, marginHorizontal: 10, color: 'black'}}/>
                {renderOrderItems()}
                <View style={styles.totalView}>
                    <View style={{marginRight: 10, marginLeft: 10, marginTop: 10, alignContent: 'center',}}>
                        <Text style={{ color: 'grey', fontSize: 14, textAlign: 'left'}}>
                            Total
                        </Text>
                        { responseData ? 
                            <Text style={styles.textTotal}>
                            RM {responseData.total}
                            </Text> :
                            <ActivityIndicator/>
                        }
                    </View>
                </View>
            </View>
            </ScrollView>
    )
}
const styles = StyleSheet.create({
    itemContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'white',
        margin: 10,
        borderRadius: 10,
        flexWrap: 'wrap',
    },
    textDetail: {
        margin: 10,
        marginVertical: 5,
        textAlign: 'left',
        fontSize: 16,
        color: 'black',
    },
    textTitle: {
        margin: 10,
        textAlign: 'left',
        fontSize: 24,
        fontWeight: 'bold',
        color: 'black',
    },
    image: {
        width: 130,
        height: 170,
        alignSelf: 'flex-start',
        borderRadius: 20,
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
    orderView: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white',
        margin: 10,
        borderRadius: 10,
        justifyContent: 'space-between'
    },
    totalView: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#8CD0C7',
        margin: 10,
        borderRadius: 10,
        justifyContent: 'space-between'
    },
    text: {
        color: 'black',
        fontSize: 18,
        flexWrap: 'wrap',
        flex: 1,
        flexDirection: 'column',
        width: '100%',
    },
})
export default Order;