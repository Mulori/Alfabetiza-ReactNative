import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { Drawer,Text, Avatar,Title, Caption } from 'react-native-paper'
import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import RNExitApp from 'react-native-exit-app';
import Icon from 'react-native-vector-icons/FontAwesome';

const DrawerContent = (props) => {

    const [userNome, setUserNome] = useState(null);
    const [userEmail, setUserEmail] = useState(null);
    const [userType, setUserType] = useState(null);
    const [userTypeString, setUserTypeString] = useState(null);   

    const removeData = async () => {
        try {
            await AsyncStorage.removeItem('@user');
            RNExitApp.exitApp();
        }
        catch{
            
        }        
    }    

    const getInfoUser = async () => {
        const value = await AsyncStorage.getItem('@user');
        const json = JSON.parse(value);

        setUserNome(json.name)
        setUserEmail(json.email)
        setUserType(json.user_type_account)

        if(userType === 1){
            setUserTypeString('Aluno(a)')
        }else{
            setUserTypeString('Professor(a)')
        }
    }

    getInfoUser(); 

    return(
        <View style={{flex: 1, backgroundColor: '#FFF'}}>
            <DrawerContentScrollView {...props}>
                <Drawer.Section style={style.drawerSection}> 
                    <View style={style.headerContainer}>
                        <View style={{flexDirection:'row'}}>
                            <Avatar.Image 
                                source={{
                                    uri: 'https://5287aa00874a313e299d-1850966fc307ff23e1e789aeafd2476b.ssl.cf5.rackcdn.com/PostImagem/42240/foto-branca-download-wallpapers-e-onde-usar_o1fehfmjl21c8m8h7lg41muu6dge.jpg'
                                }}
                                size={70}
                                marginTop={25}
                            />
                            <View style={{marginTop: 25, marginLeft:15, flexDirection:'column'}}>
                                <View style={{flexDirection:'row'}}>
                                    <Icon name='graduation-cap' style={style.icon} />
                                    <Title style={style.caption}>{userTypeString}</Title>
                                </View>
                                <View style={{flexDirection:'row'}}>
                                    <Icon name='envelope' style={style.icon} />
                                    <Title style={style.caption}>{userEmail}</Title>
                                </View>
                            </View>
                        </View>
                    </View>
                </Drawer.Section>
                    
                <Drawer.Section style={style.drawerSection}>
                        <DrawerItem 
                            icon={() => (
                                <Icon 
                                name="home"
                                style={style.listIcon}
                                />
                            )}
                            label={() => (
                                <Text style={style.textIcon}>
                                    Principal
                                </Text>  
                            )}
                            style={style.item}
                            onPress={() => {props.navigation.navigate('Principal')}}
                        />
                        <DrawerItem 
                            icon={() => (
                                <Icon 
                                name="users" 
                                style={style.listIcon}
                                />
                            )}
                            label={() => (
                                <Text style={style.textIcon}>
                                    Grupos
                                </Text>  
                            )}
                            style={style.item}
                            onPress={() => {props.navigation.navigate('Grupos', { ...props })}}
                        />
                        <DrawerItem 
                            icon={() => (
                                <Icon 
                                name="bell" 
                                style={style.listIcon}
                                />
                            )}
                            label={() => (
                                <Text style={style.textIcon}>
                                    Notificações
                                </Text>  
                            )}
                            style={style.item}
                            onPress={() => {props.navigation.navigate('Notificações')}}
                        />
                        <DrawerItem 
                            icon={() => (
                                <Icon 
                                name="gear" 
                                style={style.listIcon}
                                />
                            )}
                            label={() => (
                                <Text style={style.textIcon}>
                                    Configurações
                                </Text>  
                            )}
                            style={style.item}
                            onPress={() => {props.navigation.navigate('Configuração')}}
                        />
                         <DrawerItem 
                            icon={() => (
                                <Icon 
                                name='share-square-o' 
                                style={style.listIcon}                               
                                />
                            )}
                            label={() => (
                                <Text style={style.textIcon}>
                                    Sair
                                </Text>  
                            )}
                            style={style.item}
                            onPress={removeData}
                        />
                </Drawer.Section>                
            </DrawerContentScrollView>       
        </View>
    );
}

export default DrawerContent

const style = StyleSheet.create({
    headerContainer:{
        flex: 1,
        paddingLeft: 10,

        marginLeft: 5,
        marginRight: 5,
        borderRadius: 20,
        backgroundColor: '#FFF',
    },
    title: {
        fontFamily: 'calibri',
        fontSize: 13,
        fontWeight: 'bold',
        color: '#4B0082',
    },
    caption: {
        fontFamily: 'calibri',
        fontSize: 11,
        color: '#4B0082', 
    },
    icon:{
        marginTop: 1,
        fontSize: 15,
        marginRight: 10, 
        lineHeight: 30,   
        color: '#4B0082',   
    },
    listIcon:{
        marginTop: 5,
        fontSize: 30,
        marginRight: 5,  
        color: '#4B0082',
    },
    item:{
        backgroundColor: '#FFF',
        color: '#4B0082',
        borderRadius: 10,
    },
    textIcon:{
        color: '#4B0082',
        fontWeight: 'bold',
    },
    drawerSection: {
        marginTop: 5,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
})