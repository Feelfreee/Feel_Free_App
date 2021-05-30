import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Dimensions, Modal, ToastAndroid } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Styles from '../Styles';
import Header from '../Components/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const { width, height } = Dimensions.get('window');

const ApplyToHelpModel = (props) => {

    const [desc, setDesc] = useState('');

    const onSubmit = () => {
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
                                query: `mutation {
                                    help_in_post(helper_id: "${uid}", post_id: "${props.route.params.id}", text: "${desc}") {
                                      message
                                    }
                                }`
                            }
                        }
                        axios(config)
                            .then(value => {
                                console.log(value.data.data.help_in_post.message);
                                ToastAndroid.showWithGravity(value.data.data.help_in_post.message, 5000, ToastAndroid.BOTTOM);
                                setDesc('');
                            })
                            .catch(e => console.log(e));
                    })
            })
    }

    return <View
            style={{ flex: 1, paddingTop: 75, alignItems: 'center' }}
        >
            <Header backRequired name='Send Request' backHandler={() => props.navigation.goBack()} />

            <View style={{ marginTop: height * 0.1 }}>
                <TextInput
                    style={Styles.InputText}
                onChangeText={text => setDesc(text)}
                    placeholder={'Write a description ...'}
                    placeholderTextColor={'#A9A9A9'}
                    multiline={true}
                value={desc}
                />
                <TouchableOpacity
                    type
                onPress={onSubmit}
                    style={Styles.Button}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>Submit</Text>
                </TouchableOpacity>
            </View>
    </View>
}

export default ApplyToHelpModel;