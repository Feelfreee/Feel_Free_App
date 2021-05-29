import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { View, Text, Button, TouchableOpacity, Dimensions } from 'react-native';
import Header from '../Components/Header';
import Auth0 from 'react-native-auth0';
const auth0 = new Auth0({ domain: "dev-d8qbyqhd.jp.auth0.com", clientId: 'PaZ7SVIRfOeXoDWJzogXmnRyRwAJeaxH' });
import Styles from '../Styles';

const { width, height } = Dimensions.get('window');

const AccountScreen = (props) => {

    const logout = () => {
        auth0
            .webAuth
            .clearSession()
            .then(() => {
                console.log('Log out');
                AsyncStorage.removeItem('API_ACCESS_TOKEN').then(() => {
                    AsyncStorage.removeItem("USER_UID").then(() =>
                        props.navigation.navigate('Auth')
                    )
                });
            })
            .catch((e) => setError(e));
    }

    return <View style={{ flex: 1, paddingTop: 75, alignItems: 'center' }}>
        <Header name='Account' />
        <TouchableOpacity
            onPress={logout}
            style={Styles.Button}>
            <Text style={{ fontSize: width * 0.040, color: 'white' }}>Logout</Text>
        </TouchableOpacity>
    </View>
}

export default AccountScreen;