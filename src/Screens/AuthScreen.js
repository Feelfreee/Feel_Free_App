import React, { useState } from 'react';
import { Text, Dimensions, View, Image, TouchableOpacity } from 'react-native';
import Auth0 from 'react-native-auth0';
import '../Components/FirebaseConfig'
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth';
import '@react-native-firebase/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors } from '../Constants';
const auth0 = new Auth0({ domain: "dev-d8qbyqhd.jp.auth0.com", clientId: 'PaZ7SVIRfOeXoDWJzogXmnRyRwAJeaxH' });
import Styles from '../Styles';

const { width, height } = Dimensions.get('window');

const AuthScreen = (props) => {

    const [error, setError] = useState();

    const onLogin = () => {
        try {
            auth0
                .webAuth
                .authorize({ scope: 'openid profile email' })
                .then(data => {
                    AsyncStorage.setItem('API_ACCESS_TOKEN', data.idToken);
                    auth0
                        .auth
                        .userInfo({ token: data.accessToken })
                        .then(value => {
                            const token = value['https://feelfree.com/fct_claims'].token;
                            firebase
                                .auth()
                                .signInWithCustomToken(token)
                                .then(async user => {
                                    await AsyncStorage.setItem('USER_UID', user.user.uid);
                                    console.log(user)
                                    props.navigation.navigate('Main');
                                });
                        })
                        .catch(e => console.log('firebase login error', e));
                })
                .catch(e => console.log('auth0 error', error));
        }
        catch (e) {
            console.log('login error', e);
        }
    }

    return <View style={{ flex: 1, alignItems: 'center' }}>
        <Image
            source={require('../Assets/Logo.png')}
            style={{
                height: 205,
                width: 238,
                backgroundColor: Colors.theme,
                borderRadius: 20,
                marginTop: 50
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
        <TouchableOpacity
            onPress={onLogin}
            style={{ ...Styles.Button, borderRadius: 20 }}
        >
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>Login / Signup</Text>
        </TouchableOpacity>
    </View>
}

export default AuthScreen;