import React from 'react';
import { FlatList, View, Text, Dimensions } from 'react-native';
import Header from '../Components/Header';
import ChatRequest from '../Components/ChatRequest';
import Styles from '../Styles';

const { width, height } = Dimensions.get('screen');

const helpersData = [
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

const ChatRequestsScreen = ({ navigation, postId }) => {
    return <View
        style={{
            flex: 1,
            paddingTop: 75,
            alignItems: 'center'
        }}
    >
        <Header name="Helpers" backRequired backHandler={() => navigation.goBack()} />
        <FlatList
            data={helpersData}
            keyExtractor={(item) => { JSON.stringify(item) }}
            renderItem={
                ({ item }) => <ChatRequest {...item} navigation={navigation} />
            }
            style={{ flex: 1 }}
        />
    </View>
}

export default ChatRequestsScreen;