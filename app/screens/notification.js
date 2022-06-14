import React, { Component, useEffect, useState, } from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import globals from '../modules/globals.js';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator } from 'react-native';
import { Divider } from 'react-native-elements/dist/divider/Divider';
const PlantTips = (props) => {
    const [plantTips, setPlantTips] = useState([])
    useFocusEffect(
        useCallback(() => {
            let isActive = true;
            async function fetchPlantTips(){
                try{
                    let plant_tips = JSON.parse(await AsyncStorage.getItem('plant_tips'))
                    setPlantTips(plant_tips);
                } catch(error){
                    console.log("gnn")
                }
            }
            fetchPlantTips()
            return () => {
                isActive = false;
            };
        }, [])
    )

    // useEffect(() => {
    //     // if (plantTips){
    //     //     plantTips.forEach(function (element) {
    //     //         console.log(element.name)
    //     //     });
    //     // }
    //     // console.log(plantTips[0])
    //     console.log(plantTips[0].name)
    // }, [plantTips])
    
    renderPlantTips = () => {
        return plantTips.map((item, index) => {
            return (
                <View style={styles.itemContainer} key={index}>
                    <View style={{ margin: 10, marginLeft: 20, alignSelf: 'stretch', flex: 1}}>
                        <Text style={{ color: 'grey', fontSize: 14 }}>
                            Plant Name:
                        </Text>
                        <View style={{ flexDirection: 'row'}}>
                            <Text style={styles.text}>
                                {item.name}
                            </Text>
                        </View>
                        <Text style={{ color: 'grey', fontSize: 14 }}>
                            Humidity:
                        </Text>
                        <Text style={styles.text}>
                            {item.humidity}
                        </Text>
                        <Text style={{ color: 'grey', fontSize: 14 }}>
                            Sunlight:
                        </Text>
                        <Text style={styles.text}>
                            {item.sunlight}
                        </Text>
                        <Text style={{ color: 'grey', fontSize: 14 }}>
                            Water:
                        </Text>
                        <Text style={styles.text}>
                            {item.water}
                        </Text>
                    </View>
                    <Divider />
                </View>
            )
        });
    }
    return(
        <ScrollView>
            <View>
                {plantTips ? renderPlantTips() : <View></View>}
            </View>
        </ScrollView>
    );
}
const styles = StyleSheet.create({
    itemContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'white',
        margin: 10,
        borderRadius: 10,
        flexWrap: 'wrap',
        borderWidth: 1,
        borderColor: '#6ea8a1',
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
export default PlantTips