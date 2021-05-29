import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect } from 'react';
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
                                          users_by_pk(uid: "${uid}") {
                                            chats {
                                              content_url
                                              created_at
                                              id
                                              room_id
                                              text
                                              user_id
                                            }
                                          }
                                        }`
                            }
                        }
                        axios(config).then(value => {
                            setChatsList(value.data.data.users_by_pk.chats);
                            setRefresh(false)
                        }).catch(e => console.log(e));
                    })
            })
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
        {helperList ? helperList.length > 0 ?
            <FlatList
                refreshing
                refreshControl={
                    <RefreshControl refreshing={refresh} onRefresh={() => fetchChat()} />
                }
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

export default ChatsCollectionScreen;