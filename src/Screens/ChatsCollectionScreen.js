import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import Header from '../Components/Header';
import axios from 'axios';

const ChatsCollectionScreen = (props) => {

    const [refresh, setRefresh] = useState(true);
    const [chatsList, setChatsList] = useState([]);

    const fetchChat = () => {
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
  room_candidates(where: {created_by: {_neq: "${uid}"}}) {
    created_at
    created_by
    id
    room_id
    user_id
    user {
      posts {
        random_name
      }
    }
  }
}`
                            }
                        }
                        axios(config).then(value => {
                            console.log(value.data)
                            setChatsList(value.data.data.room_candidates);
                            setRefresh(false)
                        }).catch(e => console.log(e));
                    })
            })
    }

    const fetchFirstName = () => {
        axios({ method: 'post', })
    }

    useEffect(() => {
        fetchChat();
    }, [])

    return <View style={{
        flex: 1,
        paddingTop: 75,
        alignItems: 'center',
        justifyContent: 'center'
    }}>
        <Header name='Chats' />
        {chatsList ? chatsList.length > 0 ?
            <FlatList
                refreshing
                refreshControl={
                    <RefreshControl refreshing={refresh} onRefresh={() => fetchChat()} />
                }
                data={chatsList}
                keyExtractor={(item) => { JSON.stringify(item) }}
                renderItem={
                    ({ item }) => <ChatRequest {...item} navigation={props.navigation} />
                }
                style={{ flex: 1 }}

            /> : null :
            < View style={{}}>
                <Text style={{ fontSize: 25, fontWeight: 'bold', color: Colors.theme }}> You are not helping to any one </Text>
            </View>
        }
    </View>
}

export default ChatsCollectionScreen;