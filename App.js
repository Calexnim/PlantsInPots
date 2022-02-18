import React, { Component } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './app/screens/home.js';
import Login from './app/screens/login.js';
import SignUp from './app/screens/register.js';
import Notification from './app/screens/notification.js';
import Cart from './app/screens/cart.js';
import Register from './app/screens/register.js';
import Product from './app/screens/single_product.js';
import PaymentOption from './app/screens/payment_option.js';
import DeliveryOption from './app/screens/delivery_option.js';
import OrderHistory from './app/screens/order_history.js';
import Order from './app/screens/order.js';
import SingleOrder from './app/screens/single_order.js';
import Payment from './app/screens/payment.js';
import { renderNode } from 'react-native-elements/dist/helpers';
import globals from './app/modules/globals.js';
import { Text } from 'react-native';
import Profile from './app/screens/profile.js';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { StackActions, NavigationActions } from '@react-navigation/native';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

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
                            } else if (route.name === 'Notification') {
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
                    <Tab.Screen name="Notification" component={Notification} />
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
            <Stack.Screen name="OrderHistory" component={OrderHistory} options={{title: 'Order History'}}/>
            <Stack.Screen name="SingleOrder" component={SingleOrder} options={{title: 'Order'}} />
        </Stack.Navigator>
    )
}