import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Dimensions, Imagem, } from 'react-native';
import { Colors } from '../Constants';
import Styles from '../Styles';
import { Avatar, Card, Paragraph } from 'react-native-paper';

const { width, height } = Dimensions.get('window');

const MyPosts = ({
    random_name,
    picture,
    created_at,
    description,
    helperCount,
    navigation,
    id,
}) => {

    const [onImageErrorStyle, setOnImageErrorStyle] = useState({});

    console.log(id);

    return <Card
        style={{
            borderRadius: 20,
            margin: 10,
            width: width * 0.9
        }} elevation={10}
    >
        <Card.Title
            title={random_name.substr(0, 20)}
            subtitle={new Date(created_at).toLocaleString()}
            left={() => <Avatar.Text size={45} label={random_name[0]} />}
            titleStyle={{ color: Colors.theme }}
        />
        <Card.Content>
            <Paragraph>{description}</Paragraph>
        </Card.Content>
        {picture ? <Card.Cover source={{ uri: picture }}
            style={onImageErrorStyle}
            onError={() => setOnImageErrorStyle({ height: 0, width: 0 })}
        /> : null}

        <Card.Actions
            style={{ justifyContent: 'space-between' }}
        >
            <Text
                style={{ flex: 3, color: '#A7A7A7' }}
            >
                {helperCount} people wants to help
            </Text>
            <TouchableOpacity
                onPress={() => { navigation.navigate('ChatRequests', { navigation, id }) }}
                style={{ ...Styles.Button, marginTop: 0, marginBottom: 0, flex: 2 }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>Helpers</Text>
            </TouchableOpacity>
        </Card.Actions>

    </Card>
}

export default MyPosts;