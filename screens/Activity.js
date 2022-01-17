import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const Activity = () => {
    return(
        <View style={style.container}>
            <Text style={style.text}>Tela de Atividade</Text>
        </View>
    );
}

export default Activity

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