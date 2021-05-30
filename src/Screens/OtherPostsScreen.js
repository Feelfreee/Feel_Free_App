import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, RefreshControl } from 'react-native';
import OthersPost from '../Components/OthersPost';
import { Colors } from '../Constants';

const OtherPostsScreen = ({ navigation }) => {

    const [posts, setPosts] = useState([]);
    const [refresh, setRefresh] = useState(true);

    const fetchPosts = () => {
        AsyncStorage.getItem('API_ACCESS_TOKEN')
            .then(token => {
                AsyncStorage.getItem('USER_UID')
                    .then(uid => {
                        console.log(token);
                        const config = {
                            url: 'https://feelfree12.herokuapp.com/v1/graphql',
                            method: 'post',
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                            data: {
                                query: `mutation {
                                            get_dashoard_posts(limit: 10, offset: 0, polarity: "asc", updated_at: "desc") {
                                                posts
                                            }
                                        }`
                            }
                        }
                        axios(config).then(value => {
                            console.log(value.data.data.get_dashoard_posts.posts[0]);
                            setPosts(value.data.data.get_dashoard_posts.posts);
                            setRefresh(false);
                        })
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
                    renderItem={({ item }) => <OthersPost {...item} helperCount={item.helpers.helper_id.length} navigation={navigation} />}
                    initialNumToRender={10}
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

export default OtherPostsScreen;