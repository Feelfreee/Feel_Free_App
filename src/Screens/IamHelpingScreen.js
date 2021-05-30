import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { View, FlatList, RefreshControl, Dimensions, TouchableOpacity, Text } from 'react-native';
import ChatRequest from '../Components/ChatRequest';
import { Colors } from '../Constants';
import Styles from '../Styles';
import { Card, Avatar } from 'react-native-paper'

const { width, height } = Dimensions.get('window');

const IamHelpingScreen = ({ navigation }) => {

    const [posts, setPosts] = useState([]);
    const [refresh, setRefresh] = useState(true);

    const [uid, setUid] = useState();

    const fetchPosts = () => {
        AsyncStorage.getItem('API_ACCESS_TOKEN')
            .then(token => {
                AsyncStorage.getItem('USER_UID')
                    .then(uid => {
                        setUid(uid);
                        console.log(uid);
                        const config = {
                            url: 'https://feelfree12.herokuapp.com/v1/graphql',
                            method: 'post',
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                            data: {
                                query: `{
                                      room_candidates(where: {created_by: {_neq: "${uid}"}}, order_by: {created_at: desc}) {
                                        created_by
                                        post_id
                                        room_id
                                        created_at
                                      }
                                    }`
                            }
                        }
                        axios(config).then(value => {
                            console.log(value.data.data.room_candidates);
                            setPosts(value.data.data.room_candidates);
                            setRefresh(false);
                        }).catch(e => console.log(e));
                    })
            })
    }

    useEffect(() => {
        fetchPosts();
    }, [])

    const Items = ({ room_id }) => {
        return <Card
            style={{
                borderRadius: 20,
                margin: 10,
                marginTop: 20,
                width: width * 0.9
            }}
            elevation={10}
        >
            <Card.Title
                title={room_id.substr(0, 20)}
                left={() => <Avatar.Text size={45} />}
                titleStyle={{ color: Colors.theme }}
            />

            <Card.Actions style={{ justifyContent: 'center' }}>
                <TouchableOpacity
                    type
                    onPress={() => navigation.navigate('Chats', { room_id, uid, from: 'helper' })}
                    style={{ ...Styles.Button, width: width * 0.8, marginTop: 0 }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>Chat</Text>
                </TouchableOpacity>
            </Card.Actions>

        </Card>
    }

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
                    renderItem={({ item }) => <Items {...item} />}
                /> :
                <View style={{ height: 50 }}>
                    <Text style={{
                        fontSize: 30,
                        color: Colors.theme,
                        textAlign: 'center'
                    }}>You're not helping to anyone</Text>
                </View>
        }
    </View>
}

export default IamHelpingScreen;