import React, { Component } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './app/screens/home.js';
import Login from './app/screens/login.js';
import SignUp from './app/screens/register.js';
import PlantTips from './app/screens/notification.js';
import Cart from './app/screens/cart.js';
import Register from './app/screens/register.js';
import Product from './app/screens/single_product.js';
import PaymentOption from './app/screens/payment_option.js';
import DeliveryOption from './app/screens/delivery_option.js';
import OrderHistory from './app/screens/order_history.js';
import Order from './app/screens/order.js';
import EditPassword from './app/screens/edit_password.js';
import SingleOrder from './app/screens/single_order.js';
import Payment from './app/screens/payment.js';
import { renderNode } from 'react-native-elements/dist/helpers';
import globals from './app/modules/globals.js';
import { Text } from 'react-native';
import Profile from './app/screens/profile.js';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { StackActions, NavigationActions } from '@react-navigation/native';
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import PushNotification from "react-native-push-notification";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

PushNotification.createChannel(
    {
        channelId: "specialid", // (required)
        channelName: "Special messasge", // (required)
        channelDescription: "Notification for special message", // (optional) default: undefined.
        importance: 4, // (optional) default: 4. Int value of the Android notification importance
        vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
    },
    (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
);

const storeAndAssignPlantTips = async (data) => {
    var all_plant_tips = [];
    var temp_plant_tips = await AsyncStorage.getItem('plant_tips');

    if (temp_plant_tips) {
        all_plant_tips = JSON.parse(temp_plant_tips);
    }

    data.forEach((item) => {
        var indexPlantTip = all_plant_tips.findIndex((all_plant_tip_item) => all_plant_tip_item.id == item.id);
        if (indexPlantTip > -1) {
            all_plant_tips[indexPlantTip] = item;
        } else {
            all_plant_tips.push(item);
        }
    });


    await AsyncStorage.setItem('plant_tips', JSON.stringify(all_plant_tips))
    // globals.plant_tips = all_plant_tips
    // console.log(globals.plant_tips);

}

// Must be outside of any component LifeCycle (such as `componentDidMount`).
PushNotification.configure({
  // (optional) Called when Token is generated (iOS and Android)
  onRegister: function (token) {
    console.log("TOKEN:", token);
    globals.firebaseToken = token.token
  },

  // (required) Called when a remote is received or opened, or local notification is opened
  onNotification: function (notification) {
    if (notification.channelId != 'specialid') {
        if (notification.data.plant_tips) {
            var plant_tips = JSON.parse(notification.data.plant_tips);
            storeAndAssignPlantTips(plant_tips)
        }
        PushNotification.localNotification({
            /* Android Only Properties */
            channelId: "specialid",
            vibrate: true, // (optional) default: true
            vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
            priority: "high", // (optional) set notification priority, default: high
            ignoreInForeground: false, // (optional) if true, the notification will not be visible when the app is in the foreground (useful for parity with how iOS notifications appear). should be used in combine with `com.dieam.reactnativepushnotification.notification_foreground` setting
            title: notification.title, // (optional)
            message: notification.message, // (required)
        });
    }

    // process the notification

    // (required) Called when a remote is received or opened, or local notification is opened
    notification.finish(PushNotificationIOS.FetchResult.NoData);
  },

  // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
  onAction: function (notification) {
    console.log("ACTION:", notification.action);
    console.log("NOTIFICATION:", notification);

    // process the action
  },

  // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
  onRegistrationError: function(err) {
    console.error(err.message, err);
  },

  // IOS ONLY (optional): default: all - Permissions to register.
  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },

  // Should the initial notification be popped automatically
  // default: true
  popInitialNotification: true,

  /**
   * (optional) default: true
   * - Specified if permissions (ios) and token (android and ios) will requested or not,
   * - if not, you must call PushNotificationsHandler.requestPermissions() later
   * - if you are not using remote notification or do not have Firebase installed, use this:
   *     requestPermissions: Platform.OS === 'ios'
   */
  requestPermissions: true,
});

export default class App extends Component {
    state = {
        isLogin: false,
    }
    componentDidMount() {
        globals.setLogin = () => {
            this.setState({
                isLogin: true
            })
        }
        globals.setLogout = () => {
            this.setState({
                isLogin: false
            })
        }
    }
    render() {
        return (
            <NavigationContainer>
                <Tab.Navigator
                    screenOptions={({ route }) => ({
                        tabBarIcon: ({ focused, color, size }) => {
                            let iconName;

                            if (route.name === 'HomeStack') {
                                iconName = 'home'
                            } else if (route.name === 'PlantTips') {
                                iconName = 'bell'
                            } else if (route.name === 'CartStack' || route.name === "Cart") {
                                iconName = 'shopping-cart'
                            } else if (route.name === 'LoginStack' || route.name === 'ProfileStack') {
                                iconName = 'user'
                            }
                            return <Icon
                                name={iconName}
                                type='font-awesome'
                                color={color}
                                size={size}
                            />;
                        },
                        tabBarActiveTintColor: '#6ea8a1',
                        tabBarInactiveTintColor: 'gray',
                    })}
                >
                    {/* <Tab.Screen name="Home" component={Home}  /> */}
                    <Tab.Screen name="HomeStack" component={HomeStack} options={{ title: "Home", headerShown: false }} />
                    <Tab.Screen name="PlantTips" component={PlantTips} options={{title: "Plant Tips"}}/>
                    {
                        !this.state.isLogin ?
                            <Tab.Screen name="Cart" component={Cart}/> :
                            <Tab.Screen name="CartStack" component={CartStack} options={{title: "Cart", headerShown: false}} />
                    }
                    {
                        !this.state.isLogin ?
                            <Tab.Screen name="LoginStack" component={LoginStack} options={{ title: "Login", headerShown: false }} /> :
                            <Tab.Screen name="ProfileStack" component={ProfileStack} options={{ title: "Profile", headerShown: false }} />
                    }
                </Tab.Navigator>
                <Toast />
            </NavigationContainer>
        );
    }
}
function HomeStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Product" component={Product} />
        </Stack.Navigator>
    )
}

function LoginStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
            <Stack.Screen name="Register" component={Register} />
        </Stack.Navigator>
    )
}

function CartStack() {
    return(
        <Stack.Navigator>
            <Stack.Screen name="Cart" component={Cart}/>
            <Stack.Screen name="PaymentOption" component={PaymentOption} options={{title: 'Confirm Checkout'}}/>
            <Stack.Screen name="DeliveryOption" component={DeliveryOption} options={{title: 'Delivery Option'}}/>
            <Stack.Screen name="Payment" component={Payment} options={{title: 'Payment Details'}}/>
            <Stack.Screen name="Order" component={Order} options={{title: 'Order'}} />
        </Stack.Navigator>
    )
}

function ProfileStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="EditPassword" component={EditPassword} options={{title: 'Edit Password'}}/>
            <Stack.Screen name="OrderHistory" component={OrderHistory} options={{title: 'Order History'}}/>
            <Stack.Screen name="SingleOrder" component={SingleOrder} options={{title: 'Order'}} />
        </Stack.Navigator>
    )
}