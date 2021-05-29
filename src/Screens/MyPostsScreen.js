import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { View, Text, Button, Dimensions, FlatList, RefreshControl } from 'react-native';
import MyPosts from '../Components/MyPosts';

const posts = [
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

const MyPostsScreen = ({ navigation }) => {

    const [posts, setPosts] = useState([]);
    const [refresh, setRefresh] = useState(true);

    const fetchPosts = () => {
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
                                            posts(order_by: {created_at: desc}) {
                                              created_at
                                              description
                                              id
                                              picture
                                              posted_by
                                              random_name
                                              updated_at
                                              posts_helper {
                                                helper_id
                                              }
                                            }
                                          }
                                        }`
                            }
                        }
                        axios(config).then(value => {
                            setPosts(value.data.data.users_by_pk.posts);
                            setRefresh(false);
                        });
                    })
            })
    }

    useEffect(() => {
        fetchPosts();
    }, [])

    return <View style={{ flex: 1, alignItems: 'center' }}>
        <FlatList
            refreshing
            refreshControl={
                <RefreshControl refreshing={refresh} onRefresh={() => fetchPosts()} />
            }
            keyExtractor={(item) => JSON.stringify(item)}
            data={posts}
            renderItem={({ item }) => <MyPosts {...item} navigation={navigation} />}
        />
    </View>
}

export default MyPostsScreen;