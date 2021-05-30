import React, { useEffect, useState } from 'react';
import { FlatList, View, Text, Dimensions, RefreshControl } from 'react-native';
import Header from '../Components/Header';
import ChatRequest from '../Components/ChatRequest';
import Styles from '../Styles';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors } from '../Constants';
import { NIL } from 'uuid';

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
    let helperData = [];

    const [helperList, setHelperList] = useState([]);
    const [refresh, setRefresh] = useState(true);
    const [showList, setShowList] = useState(false);

    const fetchHelpersList = () => {
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
                                                }
                                            }
                                        }
                                    }`
                            }
                        }
                        axios(config).then((value) => {
                            value.data.data.users_by_pk.posts[0].posts_helpers.map((helper) => {
                                const nameConfig = {
                                    data: {
                                        query:
                                            `query MyQuery {
                                                users(where: { uid: { _eq: "${helper.helper_id}" } }) {
                                                    first_name
                                                    rating
                                                }
                                            }`
                                    },
                                    method: 'post',
                                    url: 'https://feelfree12.herokuapp.com/v1/graphql',
                                };
                                axios(nameConfig).then((name) => {
                                    helperData.push({
                                        name: name.data.data.users[0].first_name,
                                        rating: name.data.data.users[0].rating, ...helper
                                    });
                                    if (value.data.data.users_by_pk.posts[0].posts_helpers.length === helperData.length) {
                                        setShowList(true);
                                        setHelperList(helperData);
                                        setRefresh(false);
                                    }
                                }).catch(err => console.log('error', err));
                            })
                        }).catch(err => console.log('error', err));
                    })
            })
    }

    useEffect(() => {
        fetchHelpersList();
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
        {showList ?
                <FlatList
                    refreshing
                    refreshControl={
                        <RefreshControl refreshing={refresh} onRefresh={() => fetchHelpersList()} />
                }
                    data={helperList}
                    keyExtractor={(item) => { JSON.stringify(item) }}
                    renderItem={
                        ({ item }) => <ChatRequest {...item} post_id={props.route.params.id} navigation={props.navigation} />
                    }
                    style={{ flex: 1 }}
            />
            : null}
    </View>
}

export default ChatRequestsScreen;

