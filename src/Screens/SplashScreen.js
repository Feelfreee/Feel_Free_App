import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { useEffect } from 'react';
import { View, Image, Dimensions, StatusBar, Text, ActivityIndicator } from 'react-native';
import { Colors } from '../Constants';

const { width, height } = Dimensions.get('window');

const SplashScreen = (props) => {

    useEffect(() => {
        AsyncStorage
            .getItem('API_ACCESS_TOKEN')
            .then((token) => {
                console.log('auth', token);
                const config = {
                    url: 'https://feelfree12.herokuapp.com/v1/graphql',
                    method: 'post',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    data: {
                        query: `query MyQuery {
                                  users {
                                    first_name
                                  }
                                }`
                    }
                }

                axios(config)
                    .then((userData) => {
                        console.log(userData.data.data.users[0].first_name)
                        if (token && (userData.data.data.users[0].first_name))
                            props.navigation.navigate('Main')
                        else
                            props.navigation.navigate('Auth')
                    }).catch(e => {
                        console.log(e);
                        props.navigation.navigate('Auth')
                    })
            })
            .catch((value) => {
                console.log('outer catch', value);
                props.navigation.navigate('Auth')
            });
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
            <ActivityIndicator size='large' color={Colors.theme} />
        </View>
        <StatusBar backgroundColor='white' />
    </View >
}

export default SplashScreen;