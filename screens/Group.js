import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const Group = () => {
    return(
        <View style={style.container}>
            <Text style={style.text}>Tela de Grupo</Text>
        </View>
    );
}

export default Group

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