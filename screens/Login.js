import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TextInput, TouchableOpacity, Image, Alert,  StatusBar  } from 'react-native';
import usuarioService from '../services/UsuarioService';
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import Logo from '../assets/Logo.png';

export default function Login({navigation}) {

    const [email, setEmail] = useState(null);
    const [senha, setSenha] = useState(null);
    const [emailErro, setEmailErro] = useState(false);
    const [senhaErro, setSenhaErro] = useState(false);
    const [loginErro, setloginErro] = useState(false);

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
          setEmailErro(true);
          return;
        }
        else{
          setEmailErro(false);
        }

        if(!senha){
          setSenhaErro(true);
          return;
        }
        else{
          setSenhaErro(false);
        }

        let data = {
            email: email,
            password: senha
        }        
        
        usuarioService.userLogin(data)
        .then((response) => {   
            saveLogin('@user', JSON.stringify(response.data))
            setloginErro(false);
            navigation.reset({
                index: 0,
                routes: [{ name: 'Main'}]
            })
        })
        .catch((error) => {
          setloginErro(true);
        })
    }

    const register = async () => {
        setSenhaErro(false);
        setEmailErro(false);
        setloginErro(false);
        navigation.push('Register')       
    }

  return (  
    <SafeAreaView style={styles.container} >
      <StatusBar backgroundColor='#4B0082' barStyle='ligth-content' hidden={false} />

        { !loginErro ? null : 
            <Animatable.View 
            animation="fadeInLeft" 
            duration={500}
            style={{
              backgroundColor: '#F54803', 
              borderRadius: 12, 
              alignItems: 'center',
              marginLeft: 15,
              marginRight: 15
            }}>
            
              <Text style={styles.textMsg}>Email e/ou senha incorreto(s)</Text>
            </Animatable.View>
        }

        { !emailErro ? null : 
            <Animatable.View 
            animation="fadeInLeft" 
            duration={500}
            style={{
              backgroundColor: '#32A28C', 
              borderRadius: 12, 
              alignItems: 'center',
              marginLeft: 15,
              marginRight: 15
            }}>
            
              <Text style={styles.textMsg}>Informe o e-mail.</Text>
            </Animatable.View>
        }

        { !senhaErro ? null : 
            <Animatable.View 
            animation="fadeInLeft" 
            duration={500}
            style={{
              backgroundColor: '#90A232', 
              borderRadius: 12, 
              alignItems: 'center',
              marginLeft: 15,
              marginRight: 15
            }}>
            
              <Text style={styles.textMsg}>Informe a senha.</Text>
            </Animatable.View>
        }

        <View style={styles.containerImage} animation="fadeInUpBig">
          <Image style={styles.imageLogo} source={Logo}/>
        </View> 
        <Animatable.View style={styles.containerForms}>    
          <Text style={styles.titleForm}>E-mail</Text> 
          <View style={{ direction: 'row' }}>
            <FontAwesome 
                name="user-o"
                size={20}
                style={{ lineHeight: 45, color: '#05375a', fontWeight: 'bold'}}
                  />
            <TextInput 
              style={styles.textInput}
              placeholder='Seu e-mail'
              keyboardType='email-address'
              autoCapitalize='none'
              placeholderTextColor="#666666"
              onChangeText={ (value) => setEmail(value)}
            />
          </View>
          

          <Text style={styles.titleForm}>Senha</Text>  
          <View style={{ direction: 'row' }}>
            <Feather 
                name="lock"
                size={20}
                style={{ lineHeight: 45, color: '#05375a', fontWeight: 'bold'}}
                  />
            <TextInput 
              style={styles.textInput}
              placeholder='Sua senha'
              secureTextEntry={true}
              autoCapitalize="none"
              placeholderTextColor="#666666"
              onChangeText={ (value) => setSenha(value)}
            />
          </View>
          
      

          <TouchableOpacity style={styles.button} onPress={ () => entrar()}>
            <Text style={styles.textButton}>Entrar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonSingUp} onPress={ () => register()}>
            <Text style={styles.textButtonSingUp}>Cadastre-se</Text>
          </TouchableOpacity>

          
        </Animatable.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  textMsg:{
    fontSize: 16,
    color: '#FFF'
  },
  container: {
    flex: 1,
    backgroundColor: '#4B0082',    
  },
  containerForms: {
    flex: 3,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30
  },
  titleForm:{
    color: '#05375a',
    fontSize: 18,
    fontFamily: 'Georgia',
    fontWeight: 'bold',
  },
  containerImage: {
    alignItems: 'center'   
  },
  containerText: {
    alignItems: 'center'   
  },
  textInput: {
    fontSize: 18,
    color: '#05375a',
    paddingLeft: 30,
    marginTop: -45
  },
  button:{
    backgroundColor: '#4B0082', 
    alignItems: 'center',

    padding: 10,
    marginTop: 10,
    marginLeft: 15,
    marginRight: 15,

    borderRadius: 15
  },
  buttonSingUp:{
    alignItems: 'center',

    borderWidth: 1,
    borderColor: '#4B0082',
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
  textButtonSingUp:{
    fontSize: 20,
    color: '#4B0082'
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
    marginTop: 10,
    height: 180,
    width: 290,
    transform: [{scale: 0.50}]
  },
  textOldPass:{
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    marginTop: 15,
    color: '#FFF'
  }
});