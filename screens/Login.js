import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TextInput, TouchableOpacity, Image, Alert,  StatusBar  } from 'react-native';
import usuarioService from '../services/UsuarioService';
import AsyncStorage from '@react-native-async-storage/async-storage'

import Logo from '../assets/Logo.png';

export default function Login({navigation}) {

    const [email, setEmail] = useState(null);
    const [senha, setSenha] = useState(null);

    useEffect( () => {
      checkLogin();
    }, [])

    const checkLogin = async () => {
      const user = await AsyncStorage.getItem('@user');
      if(user){
        navigation.reset({index: 0, routes: [{ name: 'Main'}]})
      }
    }
    
    const saveLogin = (key, value) => {
     AsyncStorage.setItem(key, value);
    }

    const entrar = async () => {

        if(!email){
            Alert.alert('Atenção', 'Informe o e-mail.', [{text: 'Ok',style: 'destructive', }]);
            return;
        }

        if(!senha){
            Alert.alert('Atenção', 'Informe a senha.', [{text: 'Ok',style: 'destructive', }]);
            return;
        }

        let data = {
            email: email,
            password: senha
        }        
        
        usuarioService.userLogin(data)
        .then((response) => {   
            saveLogin('@user', JSON.stringify(response.data))

            navigation.reset({
                index: 0,
                routes: [{ name: 'Main'}]
            })
        })
        .catch((error) => {
            Alert.alert('Erro', 'E-mail ou senha incorretos.', [
            {
                text: 'Ok',
                style: 'destructive',
            },
            ]);
        })
    }

    const register = async () => {
        navigation.push('Register')       
    }

  return (  
    <SafeAreaView style={styles.container} >
      <StatusBar backgroundColor='#4B0082' barStyle='ligth-content' hidden={false} />
      <View style={styles.containerText}>
        <Image style={styles.imageLogo} source={Logo}/>
      </View>      
      <TextInput 
        style={styles.textInput}
        placeholder='E-mail'
        keyboardType='email-address'
        autoCapitalize='none'
        onChangeText={ (value) => setEmail(value)}
      />
      <TextInput 
        style={styles.textInput}
        placeholder='Senha'
        secureTextEntry={true}
        onChangeText={ (value) => setSenha(value)}
      />
  

      <TouchableOpacity style={styles.button} onPress={ () => entrar()}>
        <Text style={styles.textButton}>Entrar</Text>
      </TouchableOpacity>

      <View style={styles.containerText}>
        {/* <Text style={styles.textOldPass} onPress={() => Linking.openURL('http://google.com')}>
          Esqueci minha senha
        </Text> */}
        <Text style={styles.textQuestion}>Ainda não possui uma conta?</Text>
        <Text style={styles.textLink} onPress={register}>
          REGISTRE-SE
        </Text>
      </View>
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4B0082',    
  },
  containerText: {
    alignItems: 'center'   
  },
  textInput: {
    margin: 15,
    fontSize: 20,
    backgroundColor: '#FFF',
    borderRadius: 20,    

    marginTop: 5,
    marginLeft: 15,
    marginRight: 15,

    padding: 10
  },
  button:{
    backgroundColor: '#FF8C00', 
    alignItems: 'center',

    padding: 10,
    marginTop: 10,
    marginLeft: 15,
    marginRight: 15,

    borderRadius: 15
  },
  textButton:{
    fontSize: 20,
    color: '#FFF'
  },
  textQuestion:{
    marginTop: 20,
    fontWeight: 'bold',
    color: '#FFF',
    fontSize: 15
  },
  textLink:{
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
    textDecorationLine: 'underline'
  },
  imageLogo:{
    marginTop: 30,
    transform: [{scale: 0.70}]
  },
  textOldPass:{
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    marginTop: 15,
    color: '#FFF'
  }
});