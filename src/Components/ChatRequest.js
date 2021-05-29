import React from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { Card, Paragraph } from 'react-native-paper';
import Styles from '../Styles';

const { width, height } = Dimensions.get('screen');

const ChatRequest = ({
    name,
    icon,
    time,
    description,
    onChatClick,
    navigation
}) => {
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
            subtitle={time}
            left={
                () => <View
                    style={{
                        height: 50,
                        width: 50,
                        borderRadius: 30,
                        backgroundColor: 'grey',
                        borderWidth: 1,
                        borderColor: 'black'
                    }}
                />
            }
            titleStyle={{ color: '#69C0FF' }}
        />
        <Card.Content>
            <Paragraph>{description}</Paragraph>
        </Card.Content>

        <Card.Actions style={{ justifyContent: 'center' }}>
            <TouchableOpacity
                type
                onPress={() => { navigation.navigate('Chats', {}) }}
                style={{ ...Styles.Button, width: width * 0.8, marginTop: 10 }}>
                <Text style={{ fontSize: width * 0.040, color: 'white' }}>Chat</Text>
            </TouchableOpacity>
        </Card.Actions>

    </Card>
}

export default ChatRequest;