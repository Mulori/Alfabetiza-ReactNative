import React, {useState} from 'react';
import { StyleSheet, View, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import Icon from 'react-native-vector-icons/FontAwesome5';

const Home = () => {
    const [userNome, setUserNome] = useState(null);

    const getInfoUser = async () => {
        const value = await AsyncStorage.getItem('@user');
        const json = JSON.parse(value);
        setUserNome(json.name)        
    }

    getInfoUser(); 

    return(
        <View style={style.container}>
            <View style={{flexDirection:'row'}}>
                <Icon name='hand-peace' style={style.icon}/>
                <Text style={style.title}>Olá, Sejá Bem Vindo!</Text>
            </View>            
            <Text style={style.name}>{userNome}</Text>
        </View>
    );
}

export default Home

const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title:{
        fontSize: 30,
        fontWeight: 'bold',
        color: '#FF8C00',
    },
    icon:{
        fontSize: 45,        
        marginRight: 10,
        color: '#FF8C00',
    },
    name:{
        color: '#4B0082', 
        fontSize: 15,
    }
})