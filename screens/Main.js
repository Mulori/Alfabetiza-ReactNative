import { StyleSheet, Text, View, StatusBar, Button, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Icon } from 'react-native-elements';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import Activity from './Activity';
import Notification from './Notification';
import Home from './Home'; 
import DrawerContent from './DrawerContent';
import Group from './Group';
import Configuration from './Configuration';

const Drawer = createDrawerNavigator();

function MyDrawer(){
  return(
    <Drawer.Navigator initialRouteName="Principal"  drawerContent={props => <DrawerContent {...props} />}>
      <Drawer.Screen 
      name="Principal"
      options={{
        title: 'Página Principal',
        headerStyle: {
          backgroundColor: '#4B0082', //Set Header color
        },
        headerTintColor: '#fff', //Set Header text color
        headerTitleStyle: {
          fontWeight: 'bold', //Set Header text style
        },
      }}
      component={Home}/>      

      <Drawer.Screen 
      name="Grupos" 
      options={{
        title: 'Grupos',
        headerStyle: {
          backgroundColor: '#4B0082', //Set Header color
        },
        headerTintColor: '#fff', //Set Header text color
        headerTitleStyle: {
          fontWeight: 'bold', //Set Header text style
        },
      }}
      component={Group}/>

      <Drawer.Screen 
      name="Notificações" 
      options={{
        title: 'Notificações',
        headerStyle: {
          backgroundColor: '#4B0082', //Set Header color
        },
        headerTintColor: '#fff', //Set Header text color
        headerTitleStyle: {
          fontWeight: 'bold', //Set Header text style
        },
      }}
      component={Notification} /> 
      <Drawer.Screen 
      name="Configuração" 
      options={{
        title: 'Configurações',
        headerStyle: {
          backgroundColor: '#4B0082', //Set Header color
        },
        headerTintColor: '#fff', //Set Header text color
        headerTitleStyle: {
          fontWeight: 'bold', //Set Header text style
        },
      }}
      component={Configuration} /> 

    </Drawer.Navigator>
  );
}

export default function Main() {

  const [idUserLogin, setIdUserLogin] = useState(null);
  const [nameUserEmail, setNameUserEmail] = useState(null);
  const [emailUserLogin, setEmailUserLogin] = useState(null);

  const getUserLogin = async () => {
    const value = await AsyncStorage.getItem('@user');
    const json = JSON.parse(value);

    setIdUserLogin(json.id)
    setNameUserEmail(json.name)
    setEmailUserLogin(json.email)
  }

  getUserLogin(); 
  
  return (
      <NavigationContainer independent={true}>
        <StatusBar backgroundColor='#4B0082' />
        <MyDrawer />
      </NavigationContainer>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4B0082',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tab:{
    backgroundColor: '#4B0082'
  }
});