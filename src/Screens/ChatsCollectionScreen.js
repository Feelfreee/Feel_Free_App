import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { View, Text, Dimensions, TouchableOpacity } from 'react-native';
import Header from '../Components/Header';
import axios from 'axios';
import Styles from '../Styles';
import { Colors } from '../Constants'

const { width, height } = Dimensions.get('screen');

const ChatsCollectionScreen = (props) => {

    const [refresh, setRefresh] = useState(true);
    const [chatsList, setChatsList] = useState([]);
    const [screenIndex, setScreenIndex] = useState(0);

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
        // fetchChat();
    }, [])

    return <View style={{
        flex: 1,
        paddingTop: 75,
        alignItems: 'center',
        justifyContent: 'center'
    }}>
        <Header name='Chats' />

        <View style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            padding: 10,
            paddingBottom: 20,
            paddingTop: 0,
            width,
            backgroundColor: Colors.theme,
            borderBottomRightRadius: 20,
            borderBottomLeftRadius: 20,
        }}>
            <TouchableOpacity
                style={Styles.postsButtonsStyle}
                onPress={() => setScreenIndex(0)}>
                <Text style={{
                    fontWeight: 'bold',
                    fontSize: 16,
                    color: screenIndex == 0 ? 'black' : 'lightgrey'
                }}>My Helpers</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={Styles.postsButtonsStyle}
                onPress={() => setScreenIndex(1)}>
                <Text style={{
                    fontWeight: 'bold',
                    fontSize: 16,
                    color: screenIndex == 1 ? 'black' : 'lightgrey'
                }}>I'm Helping</Text>
            </TouchableOpacity>
        </View>


        <View style={{ flex: 1 }} >
            {/* {screenIndex === 0 ?
                // <OtherPostsScreen
                //     navigation={props.navigation}
                // />
                : screenIndex === 1 ? <MyPostsScreen
                    navigation={props.navigation}
                />
                    : null
            } */}
        </View>
    </View>
}

export default ChatsCollectionScreen;