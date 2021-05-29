import React from 'react';
import { View, Text, Button } from 'react-native';
import Header from '../Components/Header';

const ChatsCollectionScreen = (props) => {
    return <View style={{ flex: 1, paddingTop: 75 }}>
        <Header name='Chats' />
        <Text> ChatsCollectionScreen </Text>
        <Button
            title="GO TO CHATS"
            onPress={
                () => props.navigation.navigate('Chats')
            }
        />
    </View>
}

export default ChatsCollectionScreen;