import React, { useState} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

function MeusGrupos() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Meus Grupos</Text>
      </View>
    );
  }
  
  function Explorar() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Explorar</Text>
      </View>
    );
  }

  function CriarGrupo() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Criar Grupo</Text>
      </View>
    );
  }

  const Tab = createBottomTabNavigator();

const Group = (props) => {

    const [tipoConta, setTipoConta] = useState('0');

    const getInfoUser = async () => {
        const value = await AsyncStorage.getItem('@user');
        const json = JSON.parse(value);
        setTipoConta(json.type_account.toString())
    }

    getInfoUser(); 

    return(
        <NavigationContainer independent={true}>
            <Tab.Navigator
                screenOptions={{
                  showLabel: false,
                  tabBarStyle: {
                      height: 60,
                      position: 'absolute',
                      bottom: 16,
                      right: 16,
                      left: 16,
                      borderRadius: 16,
                  }
              }}
            >
                <Tab.Screen 
                name="Meus grupos" 
                options={{ 
                    headerShown: false,
                    tabBarIcon: ({}) => (
                        <MaterialCommunityIcons name='account-group' size={30} />
                    )
                 }} 
                component={MeusGrupos}                 
                />
                <Tab.Screen 
                name="Explorar" 
                options={{
                    headerShown: false,
                    tabBarIcon: ({}) => (
                        <MaterialCommunityIcons name='access-point' size={30} />
                    )
                }} 
                component={Explorar} />
                { tipoConta === '2' ? 
                <Tab.Screen 
                name="Novo Grupo" 
                options={{
                    headerShown: false,
                    tabBarIcon: ({}) => (
                        <MaterialCommunityIcons name='account-multiple-plus' size={30} />
                    )
                }} 
                component={CriarGrupo} />
                : null    
                }
            </Tab.Navigator>
        </NavigationContainer>
        
    );
}

export default Group

const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonBottomGroup:{
        borderRadius: 12, 
        alignItems: 'center',
        position: 'absolute',                                          
        bottom: 20,
        right: 20,
    },
    text:{
        color: '#2E8B57',
    },
})