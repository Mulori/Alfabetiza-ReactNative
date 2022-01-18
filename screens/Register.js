import React, { useState, Component } from 'react';
import { StyleSheet, Text, View, Modal, TextInput, TouchableOpacity, Image, Alert, ScrollView, StatusBar } from 'react-native';
import usuarioService from '../services/UsuarioService';
import { KeyboardView } from '../components/styled';
import { ModalPickerRegister } from '../components/ModalPicker';
import {Picker} from '@react-native-picker/picker';

import Logo from '../assets/icone_logo_alfabetize.png';


export default function Register({navigation}){

    const [tipos, setTipos] = useState(['Aluno(a)', 'Professor(a)'])
    const [tipoSelecionado, setTipoSelecionado]  = useState('Aluno(a)')

    const [nome, setNome] = useState(null);
    const [email, setEmail] = useState(null);
    const [senha, setSenha] = useState(null);
    const [senhaConfirmada, setSenhaConfirmada] = useState(null);
    const [tipoConta, setTipoConta] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    const changeModalVisible = (bool) => {
        setModalVisible(bool)
    }


    const entrar = async () => {

        if(!nome){
            Alert.alert('Atenção', 'Informe seu nome.', [{text: 'Ok',style: 'destructive', }]);
            return;
        }

        if(!email){
            Alert.alert('Atenção', 'Informe o e-mail.', [{text: 'Ok',style: 'destructive', }]);
            return;
        }

        if(!senha){
            Alert.alert('Atenção', 'Informe a senha.', [{text: 'Ok',style: 'destructive', }]);
            return;
        }

        if(senha.length < 6){
          Alert.alert('Atenção', 'A senha deve conter no minimo 6 caracteres.', [{text: 'Ok',style: 'destructive', }]);
          return;
        }

        if(!senhaConfirmada){
          Alert.alert('Atenção', 'Confirme a senha.', [{text: 'Ok',style: 'destructive', }]);
          return;
        }

        if(senhaConfirmada !== senha){
          Alert.alert('Atenção', 'As senhas digitadas não coincidem.', [{text: 'Ok',style: 'destructive', }]);
          return;
        }

        if(tipoSelecionado === 'Aluno(a)'){
          let data = {
            user_name: nome,
            user_email: email,
            user_password: senha,
            user_type_account: 1
          }   

          usuarioService.userCreate(data)
          .then((response) => {
            Alert.alert('Sucesso', 'Conta criada com sucesso!', [{text: 'Ok',style: 'destructive', }]);
            navigation.pop();
          })
          .catch((error) => {
            Alert.alert('Erro', 'Ocorreu um problema ao criar a conta', [{text: 'Ok',style: 'destructive', }]);
          })
        }else{
          let data = {
            user_name: nome,
            user_email: email,
            user_password: senha,
            user_type_account: 2
          }   

          usuarioService.userCreate(data)
          .then((response) => {
            Alert.alert('Sucesso', 'Conta criada com sucesso!', [{text: 'Ok',style: 'destructive', }]);
            navigation.pop();
          })
          .catch((error) => {
            Alert.alert('Erro', 'Ocorreu um problema ao criar a conta', [{text: 'Ok',style: 'destructive', }]);
          })
        }
    }

  return ( 
    <ScrollView style={styles.scrollView}> 
        <KeyboardView style={styles.container}>            
            <StatusBar backgroundColor='#4B0082' barStyle="light-content"/>    
               
            <View style={styles.containerTitle}>
                <Text style={styles.textTitle}>Cadastre-se</Text>
            </View>        
            <View >                 
              <View style={styles.containerText}>   
                  <TextInput
                      style={styles.textInput}
                      placeholder='Informe seu nome'
                      keyboardType='default'
                      onChangeText={ (value) => setNome(value)}
                  />
                  <TextInput
                      style={styles.textInput}
                      placeholder='Informe seu e-mail'
                      keyboardType='email-address'
                      autoCapitalize='none'
                      onChangeText={ (value) => setEmail(value)}
                  />
                  <TextInput
                      style={styles.textInput}
                      placeholder='Insira sua senha'
                      secureTextEntry={true}
                      autoCapitalize='none'
                      onChangeText={ (value) => setSenha(value)}
                  />
                  <TextInput
                      style={styles.textInput}
                      placeholder='Reinsira sua senha'
                      secureTextEntry={true}
                      autoCapitalize='none'
                      onChangeText={ (value) => setSenhaConfirmada(value)}
                  />
                  
                  <Picker
                    selectedValue={tipoSelecionado}
                    style={styles.picker}
                    onValueChange={(itemValue) => setTipoSelecionado(itemValue)}>
                      {
                        tipos.map(cr => {
                          return <Picker.Item label={cr} value={cr} />
                        })
                      }
                  </Picker>

                  <TouchableOpacity style={styles.button} onPress={ () => entrar()}>
                    <Text style={styles.textButton}>Cadastrar</Text>
                  </TouchableOpacity>
                  <View style={styles.containerText}>
                    <Image style={styles.imageLogo} source={Logo}/>
                  </View> 
                  
              </View> 
            </View>          
        </KeyboardView>    
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { 
  },
  containerMain: {
    alignItems: 'center',
    justifyContent: 'center',   
  },
  picker:{
    padding: 10,
    width: '100%',
    fontSize: 18,
    backgroundColor: '#FFF',
  },
  containerTitle: {
    marginBottom: 15,
    marginTop: 30
  },
  imageLogo:{
    transform: [{scale: 0.40}]
  },
  containerText: {
    alignItems: 'center',
    justifyContent: 'center', 
    borderBottomLeftRadius: 20,
    borderBottomEndRadius: 20,    
  },
  textInput:{     
    padding: 10,
    width: '100%',
    fontSize: 20,
    backgroundColor: '#FFF',
    marginBottom: 15,
    color: '#000000',
  },
  button:{
    backgroundColor: '#4B0082', 
    alignItems: 'center',

    padding: 10,
    marginTop: 10,

    width: '100%',

    borderRadius: 15
  },
  textButton:{
    fontSize: 20,
    color: '#DCDCDC',
    fontWeight: 'bold',
  },
  backgroundPicker: {
    width: '100%',
    backgroundColor: '#FFF',
    marginBottom: 15
  },
  textPicker:{
    width: '100%',
    padding: 10,
    fontSize: 20,
  },
  textTitle: {
      fontSize: 30,
      fontWeight: 'bold',
      color: '#4B0082',
  },
  scrollView: {
    marginHorizontal: 20,   
  },
});