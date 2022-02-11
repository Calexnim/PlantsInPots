import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import { Button } from "react-native-elements/dist/buttons/Button";
import FastImage from "react-native-fast-image";
import externalStyle from "../style/style";
import Toast from 'react-native-toast-message';
import { Divider } from "react-native-elements/dist/divider/Divider";
import RadioForm from "react-native-simple-radio-button";
import axios from "axios";
import constants from "../modules/constants";
const Product = (props) => {
    const [pots, setPots] = useState([]);
    const [potID, setPotID] = useState(1); //1 because plastic id = 1 & default is plastic
    useEffect(() => {
        async function fetchPot(){
            try{
                await axios({
                    method: 'get',
                    url: constants.URL+'/api/pot'
                }).then((response) => {
                    var pot = [];
                    for (let i in response.data){
                        pot.push({label: response.data[i].name+" RM "+response.data[i].price, value: response.data[i].id});
                    }
                    setPots(pot);
                });
            } catch(error){
                console.log(error);
            }
        }
        fetchPot();
    }, []);

    //Console log potID on state changed
    useEffect(() => {
        console.log(potID)
    }, [potID]);

    //Call when pot radio button is selected
    isPotSelected = (value) => {
        //Set Pot ID based on selected radio button
        setPotID(value)
    }

    //Add to cart
    addToCart = () => {
        console.log("Plant ID: "+props.route.params?.id+" "+"Pot ID: "+ potID);
        Toast.show({ 
            type: 'success', 
            position: 'top', 
            text1: 'Added to Cart!', 
            visibilityTime: 3000,
        });
    }
    return (
        <ScrollView style={styles.container}>
            <FastImage
                style={styles.image}
                source={{uri: props.route.params?.image}}
            />
            <Divider style={{marginTop: 10, marginLeft: 10, marginRight: 10, color: 'black',}}/>
            <Text style={styles.textTitle}>
                {props.route.params?.name}
            </Text>
            <Text style={styles.textPrice}>
                RM {props.route.params?.price}
            </Text>
            <Text style={styles.textTitle}>
                Pick a Pot:
            </Text>
            <RadioForm 
                radio_props={pots}
                initial={2}
                buttonColor={'#6ea8a1'}
                labelColor={'black'}
                labelStyle={{
                    fontSize: 18,
                }}
                selectedButtonColor={'#6ea8a1'}
                buttonInnerColor={'#6ea8a1'}
                animation={false}
                buttonSize={12}
                onPress={(value) => isPotSelected(value)}
                style={{marginLeft: 10, marginRight: 10,}}
            />
            <Divider style={{marginLeft: 10, marginRight: 10, marginTop: 10}}/>
            <Text style={styles.textDescriptionTitle}>
                Description:
            </Text>
            <Text style={styles.textDescription}>
                {props.route.params?.description}
            </Text>
            <Button
                buttonStyle={externalStyle.button}
                type='solid'
                title='Add to Cart'
                onPress={() => {addToCart();}}
            />
        </ScrollView>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white',
    },
    image: {
        width: 190,
        height: 230,
        alignSelf: 'center',
        borderRadius: 20,
        marginTop: 20,
    },
    textTitle: {
        margin: 10,
        textAlign: 'left',
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
    },
    textPrice: {
        margin: 10,
        textAlign: 'left',
        fontSize: 18,
        color: 'black',
        marginRight: 30,
    },
    textDescriptionTitle: {
        margin: 10,
        textAlign: 'justify',
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
    },
    textDescription: {
        margin: 10,
        textAlign: 'justify',
        fontSize: 16,
        color: 'black',
    }
})
export default Product; 