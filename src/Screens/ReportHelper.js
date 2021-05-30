import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ToastAndroid } from 'react-native';
import Header from '../Components/Header';
import { Rating } from 'react-native-ratings';
import Styles from '../Styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const ReportHelperScreen = (props) => {

    const [rating, setRating] = useState(0);

    const onSubmit = () => {
        AsyncStorage.getItem('API_ACCESS_TOKEN')
            .then(token => {
                const config = {
                    url: 'https://feelfree12.herokuapp.com/v1/graphql',
                    method: 'post',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    data: {
                        query: `mutation {
                                    rate_helper(helper_id: "${props.route.params.helper_id}", rating: "${rating}") {
                                        message
                                }
                            }`
                    }
                };
                console.log(config);
                axios(config).then(value => {
                    console.log(value.data)
                    ToastAndroid.showWithGravity('Rating Submitted.', 2000, ToastAndroid.BOTTOM);
                    props.route.params.from === 'end' ? props.navigation.navigate('Main') : null;
                }).catch(e => console.log(e));
            })
    }

    return <View
        style={{
            flex: 1,
            paddingTop: 75,
            alignItems: 'center',
            backgroundColor: 'white'
        }}
    >
        <Rating
            type='star'
            ratingCount={5}
            imageSize={60}
            showRating
            onFinishRating={(num) => setRating(num)}
            style={{ marginTop: 50 }}
            minValue={0}
        />
        <Header name="Helpers" backRequired backHandler={() => props.navigation.goBack()} />
        <TouchableOpacity
            style={Styles.Button}
            onPress={() => onSubmit()}
        >
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>Submit Rating</Text>
        </TouchableOpacity>
    </View>
}

export default ReportHelperScreen;