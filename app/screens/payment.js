import React, { useEffect, useState, useCallback } from 'react';
import { View, StyleSheet, Text, TextInput } from 'react-native';
import externalStyle from '../style/style';
import { useNavigation, StackNavigation, StackActions } from '@react-navigation/native';
import { Button } from 'react-native-elements/dist/buttons/Button';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
const Payment = (props) => {
    const [name, onChangeName] = useState(null);
    const [phone, onChangePhone] = useState(null);
    const [email, onChangeEmail] = useState(null);
    const navigation = useNavigation();

    proceedToCheckout = () => {
        // Check the field is not null or empty
        if (!(!name || name.trim() === "" || !phone || phone.trim() === "" || !email || email.trim() === "")){
            // Check if the email written is valid
            let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
                if (reg.test(email) === false){
                    Toast.show({
                        type: 'error', 
                        position: 'top', 
                        text1: 'Invalid Email', 
                        visibilityTime: 3000,
                    });
                }
                else{
                    navigation.navigate('DeliveryOption', {
                        payment_option: props.route.params?.payment_option,
                        items: props.route.params?.items,
                        total: props.route.params?.total,
                        name: name,
                        phone: phone,
                        email: email,
                    });
                }
        }
    }
    return(
        <View style={styles.container}>
            <View style={styles.innerContainer}>
                <View>
                    <Text style={styles.textTitle}>
                        Please insert all the fields
                    </Text>
                    <TextInput
                        style={[externalStyle.input, !name || name.trim() === "" ? {borderColor: 'red'} : {borderColor: 'black'}]}
                        placeholder='Full Name'
                        autoCapitalize='words'
                        keyboardType='default'
                        onChangeText={onChangeName}
                        value={name}
                    />
                    <TextInput
                        style={[externalStyle.input, !phone || phone.trim() === "" ? {borderColor: 'red'} : {borderColor: 'black'}]}
                        placeholder='Phone Number'
                        autoCapitalize='none'
                        keyboardType='number-pad'
                        onChangeText={onChangePhone}
                        value={phone}
                    />
                    <TextInput
                        style={[externalStyle.input, !email || email.trim() === "" ? {borderColor: 'red'} : {borderColor: 'black'}]}
                        placeholder='Email'
                        keyboardType='email-address'
                        onChangeText={onChangeEmail}
                        value={email}
                    />
                </View>
                {
                    props.route.params?.payment_option == "online" ? 
                        <Text style={{color: 'red', margin: 10, textAlign: 'center'}}>
                            *Email your payment together with Order ID to alexanderchai416@gmail.com within 3 days or the order will be cancel
                        </Text> :
                        <View>
                        </View>
                }
                <View>
                    <Button
                        buttonStyle={externalStyle.button}
                        type="solid"
                        title='Proceed to Delivery Option'
                        onPress={() => {
                            proceedToCheckout();
                        }}
                    />
                </View>
            </View>
    </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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
        justifyContent: 'space-between',
    }
})
export default Payment;