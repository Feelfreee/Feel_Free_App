import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { View, Text, Button, Dimensions, FlatList, RefreshControl } from 'react-native';
import MyPosts from '../Components/MyPosts';
import { Colors } from '../Constants'

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
                                          posts(order_by: {created_at: desc}) {
                                            created_at
                                            description
                                            id
                                            picture
                                            posted_by
                                            random_name
                                            posts_helpers {
                                              id
                                            }
                                          }
                                        }`
                            }
                        }
                        axios(config).then(value => {
                            setPosts(value.data.data.posts);
                            setRefresh(false);
                        }).catch(e => console.log(e));
                    })
            })
    }

    useEffect(() => {
        fetchPosts();
    }, [])

    return <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        {
            posts && posts.length != 0 ?
                <FlatList
                    refreshing
                    refreshControl={
                        <RefreshControl refreshing={refresh} onRefresh={() => fetchPosts()} />
                    }
                    keyExtractor={(item) => JSON.stringify(item)}
                    data={posts}
                    renderItem={({ item }) => <MyPosts {...item} helperCount={item.posts_helpers.length} navigation={navigation} />}
                /> :
                <View style={{ height: 50 }}>
                    <Text style={{
                        fontSize: 30,
                        color: Colors.theme,
                        textAlign: 'center'
                    }}>No Post is available</Text>
                </View>
        }
    </View>
}

export default MyPostsScreen;