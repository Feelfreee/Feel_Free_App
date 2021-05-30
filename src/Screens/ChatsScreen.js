import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, TextInput, Image, Modal, TouchableWithoutFeedback } from 'react-native';
import Header from '../Components/Header';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Styles from '../Styles';
import { Colors } from '../Constants/index';
import { Card, Avatar } from 'react-native-paper';
import { useSubscription, gql } from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const messages = [
    {
        senderEmail: 'asdfghjkl@gmail.com',
        message: 'hello'
    },
    {
        senderEmail: 'zxcvbnm@gmail.com',
        message: 'hi'
    }
]

let previousChatData = [];

const ChatsScreen = (props) => {
    console.log(props.route.params.room_id);

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [input, setInput] = useState('');
    const [chatsList, setChatsList] = useState([]);

    const { loading, error, data } = useSubscription(
        gql`subscription {
                chats(where: {room_id: {_eq: "${props.route.params.room_id}"}}) {
                    text
                    user_id
                }
            }`
    )

    if (loading) {
        console.log('notification loading', loading)
    }
    if (error) {
        console.error('notification error', error);
    }
    if (data) {
        if (previousChatData != data) {
            previousChatData = data;
            setChatsList(data.chats);
        }
    }

    const onSendMsg = (text) => {

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
                                        insert_chats_one(object: {room_id: "${props.route.params.room_id}", text: "${text}", user_id: "${uid}"}) {
                                            id
                                    }
                                }`
                            }
                        };
                        axios(config).then((value) => console.log(value.data)).catch(e => console.log('error', e));
                    })
            })
    }

    const SenderImageComponent = () => {
        return <Avatar.Text size={40} style={{ marginTop: 5 }} />
    }

    const RecieverImageComponent = () => {
        return <Avatar.Text size={40} label={props.route.params.name[0]} style={{ marginTop: 5 }} />
    }

    const SenderMessageComponent = ({ color, item, index }) => {
        return <View key={index} style={Styles.senderMessageComponentStyle}>
            <View style={Styles.senderMessageStyle}>
                <Text
                    style={Styles.senderMessageTextStyle}
                >{item.text}
                </Text>
            </View>
            <SenderImageComponent />
        </View>
    }

    const RecieverMessageComponent = ({ color, item, index }) => {
        return <View style={Styles.recieverMessageComponentStyle}>
            <RecieverImageComponent />
            <Text
                style={Styles.recieverMessageStyle}
            >{item.text}</Text>
        </View>
    }

    return <View style={{ flex: 1, paddingTop: 75, justifyContent: 'space-between' }}>
        <Header name={props.route.params.name}
            backRequired
            backHandler={() => props.navigation.goBack()}
            additionalStyle={{ fontSize: 20, alignSelf: 'flex-start', marginLeft: 60 }}
        />

        <FlatList
            data={chatsList}
            keyExtractor={item => item.senderEmail}
            renderItem={
                ({ item, index }) => {
                    return <View>
                        {
                            // item.senderEmail == props.email
                            item.user_id == props.route.params.uid
                                ?
                                <SenderMessageComponent color={'blue'} item={item} index={index} />
                                :
                                <RecieverMessageComponent color={'green'} item={item} index={index} />
                        }
                    </View>
                }
            }
            style={{ paddingHorizontal: 10 }}
        />

        <View style={Styles.inputWidget}>
            <TextInput
                style={{
                    ...Styles.inputStyle,
                    minHeight: 50,
                    maxHeight: 200,
                }}
                autoFocus={true}
                value={input}
                onChangeText={newMsg => setInput(newMsg)}
                placeholderTextColor='black'
                placeholder='Type something...'
                multiline={true}
                numberOfLines={5}
            />
            {props.isSending ?
                <TouchableOpacity
                    style={Styles.sendButtonStyle}
                >
                    <ActivityIndicator size='small' color={Colors.theme} />
                </TouchableOpacity>
                :
                <TouchableOpacity
                    style={{ ...Styles.sendButtonStyle, padding: 0, marginRight: 10 }}
                    onPress={
                        () => onSendMsg(input)
                    }
                >
                    <Icon name='send' color={Colors.theme} size={45} />
                </TouchableOpacity>
            }
            <TouchableOpacity
                style={{ ...Styles.sendButtonStyle, width: 30, padding: 0, marginRight: 15 }}
                onPress={
                    () => setIsModalVisible(true)
                }
            >
                <Icon name='more-vert' size={30} color='grey' />
            </TouchableOpacity>
        </View>
        <Modal
            visible={isModalVisible}
            transparent
            onRequestClose={() => setIsModalVisible(false)}
        >
            <TouchableWithoutFeedback onPress={() => setIsModalVisible(false)}>
                <View style={{
                    flex: 1,
                    // zIndex: 1,
                }} >
                    <TouchableOpacity style={{
                        height: 175,
                        width: 250,
                        // backgroundColor: 'red',
                        position: 'absolute',
                        bottom: 70,
                        right: 20,
                        padding: 10,
                    }}>
                        <Card
                            style={{
                                height: 155,
                                borderRadius: 20
                            }}
                            elevation={5}
                        >
                            <TouchableOpacity
                                onPress={() => props.navigation.navigate('ReportHelper', { from: 'report', helper_id: props.route.params.helper_id })}
                                style={{
                                    height: 75,
                                    width: 230,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderBottomColor: 'black',
                                    borderBottomWidth: 1,
                                }}
                            >
                                <Text style={{ fontSize: 20 }}>Report Helper</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => props.navigation.navigate('ReportHelper', { from: 'end', helper_id: props.route.params.helper_id })}
                                style={{
                                    height: 75,
                                    width: 230,
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}
                            >
                                <Text style={{ fontSize: 20 }}>End Chat</Text>
                            </TouchableOpacity>
                        </Card>
                    </TouchableOpacity>
                </View>

            </TouchableWithoutFeedback>
        </Modal>
    </View>
}

export default ChatsScreen;

// mutation {
//     rate_helper(helper_id: "", rating: "") {
//         message
//     }
// }
