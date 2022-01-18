import React from 'react';
import { StyleSheet, View, Text} from 'react-native';

const AddGroup = () => {
    return(
        <View style={style.container}>
            <Text style={style.text}>Tela de Notificação</Text>
        </View>
    );
}

export default AddGroup

const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text:{
        color: '#191970'
    },
})