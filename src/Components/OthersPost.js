import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { Card, Paragraph, Avatar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Colors } from '../Constants'

const { width, height } = Dimensions.get('window');

const OthersPost = ({
    random_name,
    picture,
    created_at,
    description,
    helperCount,
    navigation
}) => {

    const [onImageErrorStyle, setOnImageErrorStyle] = useState({});

    return <Card style={{
        borderRadius: 20,
        margin: 10,
        width: width * 0.9
    }} elevation={10}>
        <Card.Title
            title={random_name}
            subtitle={created_at.substr(11, 5) + " " + created_at.substr(0, 10)}
            left={() => <Avatar.Text size={45} label={random_name[0]} />}
            titleStyle={{ color: Colors.theme }}
        />
        <Card.Content>
            <Paragraph>{description}</Paragraph>
        </Card.Content>

        <Card.Cover source={{ uri: picture }}
            style={onImageErrorStyle}
            onError={() => setOnImageErrorStyle({ height: 0, width: 0 })}
        />

        <Card.Actions style={{ justifyContent: 'space-between' }}
        >
            <Text style={{ flex: 3, color: '#A7A7A7' }}>
                {helperCount} people wants to help
            </Text>
            <View style={{
                flexDirection: 'row',
                flex: 2,
                justifyContent: 'space-around',
                alignItems: 'center',
            }}>
                <TouchableOpacity onPress={() => {
                    console.log('all helpers');
                    navigation.navigate('ApplyToHelp')
                }}>
                    <Icon name='message' size={height * 0.05} color={Colors.theme} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    console.log('all helpers');
                    navigation.navigate('ReportPost')
                }}>
                    <Icon name='bug-report' size={height * 0.05} color={Colors.theme} />
                </TouchableOpacity>
            </View>
        </Card.Actions>

    </Card>
}

export default OthersPost;