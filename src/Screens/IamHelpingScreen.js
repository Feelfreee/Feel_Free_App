import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { View, FlatList, RefreshControl, Dimensions, TouchableOpacity, Text } from 'react-native';
import ChatRequest from '../Components/ChatRequest';
import { Colors } from '../Constants';
import Styles from '../Styles';
import { Card, Avatar, Paragraph } from 'react-native-paper'

const { width, height } = Dimensions.get('screen');

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

    const Items = ({ random_name, room_id }) => {
        // const { width, height } = Dimensions.get('screen');
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
                title={random_name}
                left={() => <Avatar.Text size={45} label={random_name[0]} />}
                titleStyle={{ color: Colors.theme }}
            />

            <Card.Actions style={{ justifyContent: 'center' }}>
                <TouchableOpacity
                    type
                    onPress={() => navigation.navigate('Chats', { room_id, random_name, helper_id: uid, from: 'helper' })}
                    style={{ ...Styles.Button, width: width * 0.8, marginTop: 10 }}>
                    <Text style={{ fontSize: width * 0.040, color: 'white' }}>Chat</Text>
                </TouchableOpacity>
            </Card.Actions>

        </Card>
    }

    return <View style={{ flex: 1, alignItems: 'center' }}>
        <FlatList
            refreshing
            refreshControl={
                <RefreshControl refreshing={refresh} onRefresh={() => fetchPosts()} />
            }
            keyExtractor={(item) => JSON.stringify(item)}
            data={posts}
            renderItem={({ item }) => <Items {...item} random_name={item.post.random_name} />}
        />
    </View>
}

export default IamHelpingScreen;