import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { View, FlatList, RefreshControl } from 'react-native';
import ChatRequest from '../Components/ChatRequest';

const IamHelpingScreen = ({ navigation }) => {

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
  room_candidates(where: {_not: {created_by: {_eq: "${uid}"}}}) {
    created_by
    post {
      random_name
    }
    room_id
  }
}
`
                            }
                        }
                        axios(config).then(value => {
                            setPosts(value.data.data.room_candidates);
                            setRefresh(false);
                        }).catch(e => console.log(e));
                    })
            })
    }

    useEffect(() => {
        fetchPosts();
    }, [])

    console.log(posts)

    return <View style={{ flex: 1, alignItems: 'center' }}>
        <FlatList
            refreshing
            refreshControl={
                <RefreshControl refreshing={refresh} onRefresh={() => fetchPosts()} />
            }
            keyExtractor={(item) => JSON.stringify(item)}
            data={posts}
            renderItem={({ item }) => <ChatRequest {...item} navigation={navigation} />}
        />
    </View>
}

export default IamHelpingScreen;