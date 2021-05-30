import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Dimensions, ToastAndroid } from 'react-native';
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
    navigation,
    id
}) => {

    const [onImageErrorStyle, setOnImageErrorStyle] = useState({});

    return <Card style={{
        borderRadius: 20,
        margin: 10,
        width: width * 0.9
    }} elevation={10}>
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
                    navigation.navigate('ApplyToHelp', { id })
                }}>
                    <Icon name='message' size={40} color={Colors.theme} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    console.log('all helpers');
                    // navigation.navigate('ReportPost')
                    ToastAndroid.showWithGravity('Coming Soon!', 2000, ToastAndroid.BOTTOM);
                }}>
                    <Icon name='bug-report' size={40} color={Colors.theme} />
                </TouchableOpacity>
            </View>
        </Card.Actions>

    </Card>
}

export default OthersPost;