import React, { useEffect, useState } from 'react';
import { FlatList, View, Text, Dimensions } from 'react-native';
import Header from '../Components/Header';
import ChatRequest from '../Components/ChatRequest';
import Styles from '../Styles';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors } from '../Constants';

const { width, height } = Dimensions.get('screen');

const helpersData = [
    {
        name: 'asdfghjkl',
        time: 'time-date',
        description: 'qwertyuioplkmnbvcxzsasdfghjk',
        helperCount: 10,
    },
    {
        name: 'qwertyuiop',
        time: 'time-date',
        description: 'qwertyuioplkmnbvcxzsasdfghjk',
        helperCount: 10,
    },
    {
        name: 'zxcvbnm',
        time: 'time-date',
        description: 'qwertyuioplkmnbvcxzsasdfghjk',
        helperCount: 10,
    },
    {
        name: 'azxsdc',
        time: 'time-date',
        description: 'qwertyuioplkmnbvcxzsasdfghjk',
        helperCount: 10,
    },
    {
        name: 'mlkjhnbh',
        time: 'time-date',
        description: 'qwertyuioplkmnbvcxzsasdfghjk',
        helperCount: 10,
    }
]

const ChatRequestsScreen = (props) => {

    console.log(props.route.params.id);

    const [helperList, setHelperList] = useState([]);

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
                                            users_by_pk(uid: "${uid}") {
                                            posts(where: { id: { _eq: "${props.route.params.id}" } }) {
                                                posts_helpers {
                                                    helper_id
                                                    text
                                                    created_at
                                                    post_id
                                                }
                                            }
                                        }
                                    }`
                            }
                        }
                        axios(config).then((value) => {
                            setHelperList(value.data.data.users_by_pk.posts.posts_helpers)
                        });
                    })
            })
    }, [])

    return <View
        style={{
            flex: 1,
            paddingTop: 75,
            alignItems: 'center',
            justifyContent: 'center'
        }}
    >
        <Header name="Helpers" backRequired backHandler={() => props.navigation.goBack()} />
        {helperList ? helperList.length > 0 ? <FlatList
            data={helperList}
            keyExtractor={(item) => { JSON.stringify(item) }}
            renderItem={
                ({ item }) => <ChatRequest {...item} navigation={props.navigation} />
            }
            style={{ flex: 1 }}
        /> : null :
            < View style={{}}>
                <Text style={{ fontSize: 25, fontWeight: 'bold', color: Colors.theme }}> No helpers available </Text>
            </View>
        }
    </View>
}

export default ChatRequestsScreen;

