/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React from 'react';
 import type {Node} from 'react';
 import {
   SafeAreaView,
   ScrollView,
   StatusBar,
   StyleSheet,
   Text,
   useColorScheme,
   View,
 } from 'react-native';
 
 import {
   Colors,
   DebugInstructions,
   Header,
   LearnMoreLinks,
   ReloadInstructions,
 } from 'react-native/Libraries/NewAppScreen';

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from './screens/Login';
import Main from './screens/Main';
import Register from './screens/Register';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator >
      <Stack.Screen 
        name="Login" 
        options={{
          headerShown: false
          }} 
        component={Login}  
      />

      <Stack.Screen 
        name="Main" 
        options={{
          headerShown: false
          // title: 'Pagina Inicial', 
          // headerStyle: {
          //   backgroundColor: '#4B0082'
          //   }, 
          // headerTintColor: '#fff'
          }} 
          component={Main} 
      />

      <Stack.Screen 
        name="Register" 
        options={{
          title: 'Cadastro', 
          headerStyle: {
            backgroundColor: '#4B0082'
          }, 
          headerTintColor: '#fff'
        }} 
        component={Register} 
      />      
    </Stack.Navigator>
  );
} 

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
   );
}