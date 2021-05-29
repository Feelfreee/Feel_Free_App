import React from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { Card, Paragraph, Avatar } from 'react-native-paper';
import { Colors } from '../Constants';
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
            left={() => <Avatar.Text size={45} label={name[0]} />}
            titleStyle={{ color: Colors.theme }}
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