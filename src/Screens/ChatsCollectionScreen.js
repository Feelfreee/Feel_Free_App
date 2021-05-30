import React, { useEffect, useState } from 'react';
import { View, Text, Dimensions, TouchableOpacity } from 'react-native';
import Header from '../Components/Header';
import Styles from '../Styles';
import { Colors } from '../Constants'
import IamHelpingScreen from './IamHelpingScreen';

const { width, height } = Dimensions.get('screen');

const ChatsCollectionScreen = (props) => {

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
            {/* <TouchableOpacity
                style={Styles.postsButtonsStyle}
                onPress={() => setScreenIndex(0)}>
                <Text style={{
                    fontWeight: 'bold',
                    fontSize: 16,
                    color: screenIndex == 0 ? 'black' : 'lightgrey'
                }}>My Helpers</Text>
            </TouchableOpacity> */}
            <TouchableOpacity
                style={Styles.postsButtonsStyle}
            // onPress={() => setScreenIndex(1)}
            >
                <Text style={{
                    fontWeight: 'bold',
                    fontSize: 16,
                    color: 'black'
                }}>I'm Helping</Text>
            </TouchableOpacity>
        </View>


        <View style={{ flex: 1 }} >
            <IamHelpingScreen />
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