import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, ScrollView} from "react-native";
import { Button } from "react-native-elements/dist/buttons/Button";
import FastImage from "react-native-fast-image";
import externalStyle from "../style/style";
import Toast from 'react-native-toast-message';
import { Divider } from "react-native-elements/dist/divider/Divider";
import RadioForm from "react-native-simple-radio-button";
import axios from "axios";
import constants from "../modules/constants";
import AsyncStorage from '@react-native-async-storage/async-storage'; 
const Product = (props) => {
    const [pots, setPots] = useState([]);
    const [potID, setPotID] = useState(1); //1 because plastic id = 1 & default is plastic
    const [fertilizers, setFertilizers] = useState([]);
    const [fertilizerID, setFertilizerID] = useState(1); //1 because none = 1 & default is no fertilizer
    useEffect(() => {
        async function fetchAccessories(){
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
            try{
                await axios({
                    method: 'get',
                    url: constants.URL+'/api/fertilizer'
                }).then((response) => {
                    var fertilizer = [];
                    for (let i in response.data){
                        fertilizer.push({label: response.data[i].name + " RM "+ response.data[i].price, value: response.data[i].id});
                    }
                    setFertilizers(fertilizer);
                });
            } catch(error){
                console.log(error);
            }
        }
        fetchAccessories();
    }, []);

    //Call when pot radio button is selected
    isPotSelected = (value) => {
        //Set Pot ID based on selected radio button
        setPotID(value)
    }

    //Call when fertilizer radio button is selected
    isFertilizerSelected = (value) => {
        setFertilizerID(value)
    }

    //Add to cart
    addToCart = async() => {
        var hasCartItem = false
        try{
            var user_id = await AsyncStorage.getItem('user_id')
        } catch(error){
            console.log(error)
        }
        try{
            try{
                await axios({
                    method: 'get',
                    url: constants.URL+'/api/cart/'+ user_id
                }).then((response) => {
                    
                    if (response.data.cart_item){
                        hasCartItem = true
                    }
                });
            } catch (error){
                console.log(error.response.data)
            }
            // Send different request method according to having pre-existing cart items
            var data = {
                "cart_item":[
                    {
                        "product": props.route.params?.id,
                        "pot": potID,
                        "fertilizer": fertilizerID
                    }
                ],
                "user": user_id
            }
            try{
                if (hasCartItem){
                    try{
                        await axios({
                            method: 'put',
                            url: constants.URL+'/api/cart/'+ user_id + "/",
                            data: data
                        }).then((response) => {
                            Toast.show({
                                type: 'success', 
                                position: 'top', 
                                text1: 'Added to Cart!', 
                                visibilityTime: 3000,
                            });
                        });
                    } catch(error){
                        console.log(error)
                    }
                }
                else {
                    try{
                        await axios({
                            method: 'post',
                            url: constants.URL+'/api/cart/',
                            data: data
                        }).then((response) => {
                            Toast.show({ 
                                type: 'success', 
                                position: 'top', 
                                text1: 'Added to Cart!', 
                                visibilityTime: 3000,
                            });
                            console.log("Plant ID: "+props.route.params?.id+" "+"Pot ID: "+ potID + " Fertilizer ID: "+ fertilizerID);
                            console.log(response)
                        });
                    } catch (error){
                        console.log(error.response.data)
                    }
                }
            } catch(error){
                console.log(error)
            }
        } catch(error){
            Toast.show({
                type: 'error',
                position: 'top',
                text1: 'Please login to proceed',
                visibilityTime: 3000,
            });
            console.log(error.response.data)
        }
        
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
            <Text style={styles.textTitle}>
                Add fertilizer:
            </Text>
            <RadioForm 
                radio_props={fertilizers}
                initial={0}
                buttonColor={'#6ea8a1'}
                labelColor={'black'}
                labelStyle={{
                    fontSize: 18,
                }}
                selectedButtonColor={'#6ea8a1'}
                buttonInnerColor={'#6ea8a1'}
                animation={false}
                buttonSize={12}
                onPress={(value) => isFertilizerSelected(value)}
                style={{marginLeft: 10, marginRight: 10,}}
            
            />
            <Divider style={{marginLeft: 10, marginRight: 10, marginTop: 10, color: 'black'}}/>
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