import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect } from 'react';
import { View, Image, Dimensions, StatusBar, Text } from 'react-native';
import { Colors } from '../Constants';

const { width, height } = Dimensions.get('screen');

const SplashScreen = (props) => {

    useEffect(() => {
        AsyncStorage
            .getItem('API_ACCESS_TOKEN')
            .then((value) => {
                console.log('auth', value);
                if (value)
                    props.navigation.navigate('Main')
                else
                    props.navigation.navigate('Auth')
            })
            .catch((value) => props.navigation.navigate('Auth'));
    }, [])

    return <View
        style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white' }}
    >
        <Image
            source={require('../Assets/Logo.png')}
            style={{
                height: 205,
                width: 238,
                backgroundColor: Colors.theme,
                borderRadius: 20,
            }}
        />
        <View style={{
            marginTop: 20,

        }}>
            <Text style={{
                fontSize: 40,
                fontWeight: 'bold',
                color: Colors.theme,
            }}>
                Feel Free
        </Text>
        </View>
        <StatusBar backgroundColor='white' />
    </View >
}

export default SplashScreen;