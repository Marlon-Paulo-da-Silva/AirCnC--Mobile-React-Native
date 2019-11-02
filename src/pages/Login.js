import React, {useState, useEffect} from 'react';
import {View, AsyncStorage, Platform, Text, TextInput, Image, TouchableOpacity, StyleSheet} from 'react-native';

import api from '../services/api';

import logo from '../assets/logo.png';

export default function Login({ navigation }){
    const [email, setEmail] = useState('');
    const [techs, setTechs] = useState('');

    useEffect(() => {
        AsyncStorage.getItem('user').then(user => {
            if(user){
                console.log(email);
                navigation.navigate('List');
            }
        })
    }, []);

    async function handleSubmit() {
       const response = await api.post('./sessions', {
           email
       })

       const { _id } = response.data;
       console.log( _id );

       await AsyncStorage.setItem('user', _id);
       await AsyncStorage.setItem('techs', techs);

       navigation.navigate('List');

    }

    return <View style={styles.container}>
                <Image source={logo} />

                <View style={styles.form}>
                    <Text style={styles.label}>SEU E-MAIL *</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Seu E-mail"
                        placeholderTextColor="#999"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoCorrect={false}
                        value={email}
                        onChangeText={setEmail}
                    />
                    <Text style={styles.label}>TECNOLOGIAS *</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Tecnologias de Interesse"
                        placeholderTextColor="#999"
                        autoCapitalize="words"
                        autoCorrect={false}
                        value={techs}
                        onChangeText={setTechs}
                    />

                    <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                        <Text style={styles.buttonText}>Encontrar spots</Text>
                    </TouchableOpacity>

                </View>

            </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    form: {
        alignSelf: 'stretch',
        paddingHorizontal: 30,
        marginTop: 30,
    },
    input:{
        borderWidth: 1,
        borderColor: '#ddd',
        paddingHorizontal: 20,
        fontSize: 16,
        color: '#444',
        marginBottom: 20,
        borderRadius: 5,

    },
    label: {
        fontWeight: 'bold',
        color: '#444',
        marginBottom: 8,
    },

    button: {
        height: 42,
        backgroundColor: '#f05a5b',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },

    buttonText: {
        color:'#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});