import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, RefreshControl } from 'react-native';
import OthersPost from '../Components/OthersPost';

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
}`}

                        }
                        axios(config).then(value => {
                            console.log(value);
                            setPosts(value.data.data.get_dashoard_posts.posts);
                            setRefresh(false);
                        })
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
            renderItem={({ item }) => <OthersPost {...item} helperCount={item.helpers.helper_id.length} navigation={navigation} />}
            initialNumToRender={10}
        />
    </View>
}

export default OtherPostsScreen;