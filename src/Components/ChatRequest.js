import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { Card, Paragraph, Avatar } from 'react-native-paper';
import { Colors } from '../Constants';
import Styles from '../Styles';

const { width, height } = Dimensions.get('screen');

const ChatRequest = ({
    name,
    created_at,
    post_id,
    text,
    helper_id,
    navigation
}) => {

    const createRoom = () => {
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
                                query: `mutation {
                                            create_room(helper_id: "${helper_id}", post_id: "${post_id}", user_id: "${uid}") {
                                                roomId  
                                            }   
                                        }`
                            }
                        };
                        axios(config).then(value => {
                            console.log()
                            navigation.navigate('Chats', { room_id: value.data.data.create_room.roomId, name, uid, helper_id })
                        });
                    })
            })
    }

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
            title={name}
            subtitle={created_at}
            left={() => <Avatar.Text size={45} label={name[0]} />}
            titleStyle={{ color: Colors.theme }}
        />
        <Card.Content>
            <Paragraph>{text}</Paragraph>
        </Card.Content>

        <Card.Actions style={{ justifyContent: 'center' }}>
            <TouchableOpacity
                type
                onPress={() => createRoom()}
                style={{ ...Styles.Button, width: width * 0.8, marginTop: 10 }}>
                <Text style={{ fontSize: width * 0.040, color: 'white' }}>Chat</Text>
            </TouchableOpacity>
        </Card.Actions>

    </Card>
}

export default ChatRequest;