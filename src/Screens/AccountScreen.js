import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import { View, Text, Button, TouchableOpacity, Dimensions } from 'react-native';
import Header from '../Components/Header';
import Auth0 from 'react-native-auth0';
import '../Components/FirebaseConfig'
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth';
const auth0 = new Auth0({ domain: "dev-d8qbyqhd.jp.auth0.com", clientId: 'PaZ7SVIRfOeXoDWJzogXmnRyRwAJeaxH' });
import Styles from '../Styles';
import { useEffect } from 'react';
import axios from 'axios';
import { Card, Paragraph } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width, height } = Dimensions.get('window');

const AccountScreen = (props) => {

    const [details, setDetails] = useState();

    useEffect(() => {
        AsyncStorage.getItem('API_ACCESS_TOKEN')
            .then(token => {
                AsyncStorage.getItem('USER_UID')
                    .then(uid => {
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
    email
    picture
    last_name
    rating
  }
}`
                            }
                        };
                        axios(config).then(value => {
                            setDetails(value.data.data.users[0]);
                        });
                    })
            })
    }, [])

    const logout = () => {
        auth0
            .webAuth
            .clearSession()
            .then(() => {
                console.log('Log out');
                firebase.auth().signOut().then((value) =>
                AsyncStorage.removeItem('API_ACCESS_TOKEN').then(() => {
                    AsyncStorage.removeItem("USER_UID").then(() =>
                        props.navigation.navigate('Auth')
                    )
                })).catch(e => console.log(e));
            })
            .catch((e) => setError(e));
    }

    return <View style={{ flex: 1, paddingTop: 75, alignItems: 'center' }}>
        <Header name='Account' />

        {/* {details ? <View>
            <Text style={{ fontSize: 20 }}>Name: {details.first_name} {details.last_name}</Text>
            <Text style={{ fontSize: 20 }}></Text>
            <Text style={{ fontSize: 20 }}>Rating: {details.rating} / 5</Text>
        </View> : null */}

        {
            details ? <View style={{ height: 150, width: width * 0.9, marginVertical: 30 }}>
                <Card style={{ borderRadius: 20, padding: 30, paddingStart: 10 }} elevation={20}>
                    <Text style={{ fontWeight: '900', fontSize: 20, height: 40, marginStart: 20 }}>{`${details.first_name} ${details.last_name}`}</Text>
                    <Text style={{ fontWeight: '900', fontSize: 20, height: 40, marginStart: 20 }}>{`${details.email}`}</Text>
                    <View style={{ height: 40, marginStart: 20, flexDirection: 'row', width: width * 0.5 }}>
                        <Text style={{ fontWeight: '900', fontSize: 20 }}>{`Rating: ${details.rating}/5`}</Text>
                        <Icon name='star' size={30} color='#FFD700' style={{ paddingStart: 5 }} />
                    </View>
                </Card>
            </View> : null
        }

        <TouchableOpacity
            onPress={logout}
            style={Styles.Button}>
            <Text style={{ fontSize: width * 0.040, color: 'white' }}>Logout</Text>
        </TouchableOpacity>
    </View>
}

export default AccountScreen;