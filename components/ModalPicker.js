import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, ScrollView} from 'react-native'

const OPTIONS = ['Aluno(a)', 'Professor(a)']
const WIDTH = Dimensions.get('window').width;
const HEIGTH = Dimensions.get('window').height;

const ModalPickerRegister = (props) => {

    const onPressItem = (option) => {
        props.setTipoSelecionado(option);
        props.changeModalVisible(false);        
    }

    const option = OPTIONS.map((item, index) => {
        return (
            <TouchableOpacity
                style={styles.option}
                key={index}
                onPress={ () => onPressItem(item)}
            >
                <Text style={styles.text}>
                    {item}
                </Text>
            </TouchableOpacity>
        )
    })

    return (
        <TouchableOpacity
            onPress={ () => props.changeModalVisible(false)}
            style={styles.container}
        >
            <View style={[styles.modal, {width: WIDTH - 20, height: 135}]}>
                <ScrollView>
                    {option}
                </ScrollView>
            </View>

        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    modal: {
        backgroundColor: '#ff5722',
        borderRadius: 12,
    },
    option: {
        alignItems: 'flex-start',
    },
    text: {
        margin: 20,
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
    }
})
    

export {ModalPickerRegister}