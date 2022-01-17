import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Configuration = () => {

    return(
        <View style={style.container}>
            <Text style={style.text}>Tela de Configuração</Text>
        </View>
    );
}

export default Configuration

const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text:{
        color: '#2E8B57',
    },
})