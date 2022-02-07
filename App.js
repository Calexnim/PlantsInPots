import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './app/screens/home.js';
import Login from './app/screens/login.js';
import SignUp from './app/screens/register.js';
import Notification from './app/screens/notification.js';
import Cart from './app/screens/cart.js';
import Register from './app/screens/register.js';
import Product from './app/screens/single_product.js';
import { renderNode } from 'react-native-elements/dist/helpers';
import globals from './app/modules/globals.js';
import { Text } from 'react-native';
import Profile from './app/screens/profile.js';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { Icon } from 'react-native-elements/dist/icons/Icon';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
// export function Account() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator>
//         <Stack.Screen 
//           name="App"
//           component={App}
//           options={{ headerShown: false}}
//         />
//         <Stack.Screen name="Register" component={Register} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   )
// }

// export default function App() {
//   return (
//     <NavigationContainer>
//       <Tab.Navigator>
//         <Tab.Screen name="Home" component={Home} />
//         <Tab.Screen name="Notification" component={Notification} />
//         <Tab.Screen name="Cart" component={Cart} />
//         <Tab.Screen name="Login" component={Login}/>
//       </Tab.Navigator>
//     </NavigationContainer>
//   );
// }

export default class App extends Component{
  state = {
    isLogin: false,
  }
  componentDidMount(){
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
    return(
      <NavigationContainer>
        <Tab.Navigator 
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === 'HomeStack') {
                iconName = 'home'
              } else if (route.name === 'Notification') {
                iconName = 'bell'
              } else if (route.name === 'Cart') {
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
        <Tab.Screen name="HomeStack" component={HomeStack} options={{title: "Home", headerShown: false}}/>
        <Tab.Screen name="Notification" component={Notification} />
        <Tab.Screen name="Cart" component={Cart} />
        {
          !this.state.isLogin? 
          <Tab.Screen name="LoginStack" component={LoginStack} options={{title: "Login", headerShown: false }}/>:
          <Tab.Screen name="ProfileStack" component={ProfileStack} options={{title: "Profile", headerShown: false }}/>
        }
      </Tab.Navigator>
      <Toast />
    </NavigationContainer>
    );
  }
}
function HomeStack(){
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home}/>
      <Stack.Screen name="Product" component={Product} />
    </Stack.Navigator>
  )
}

function LoginStack(){
  return (
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/>
        <Stack.Screen name="Register" component={Register} />
      </Stack.Navigator>
  )
}

function ProfileStack(){
  return(
    <Stack.Navigator>
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  )
}