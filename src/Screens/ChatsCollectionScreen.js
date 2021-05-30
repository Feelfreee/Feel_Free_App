import React, { useEffect, useState } from 'react';
import { View, Text, Dimensions, TouchableOpacity } from 'react-native';
import Header from '../Components/Header';
import Styles from '../Styles';
import { Colors } from '../Constants'
import IamHelpingScreen from './IamHelpingScreen';
import MyHelpersScreen from './MyHelpersScreen';

const { width, height } = Dimensions.get('screen');

const ChatsCollectionScreen = (props) => {

    // const [screenIndex, setScreenIndex] = useState(0);

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
                }}>Seeking Help</Text>
            </TouchableOpacity> */}
            <TouchableOpacity
                style={Styles.postsButtonsStyle}
                // onPress={() => setScreenIndex(1)}
            >
                <Text style={{
                    fontWeight: 'bold',
                    fontSize: 16,
                    // color: screenIndex == 1 ? 'black' : 'lightgrey'
                    color: 'black'
                }}>I'm Helping</Text>
            </TouchableOpacity>
        </View>


        <View style={{ flex: 1 }} >
            <IamHelpingScreen navigation={props.navigation} />
            {/* <MyHelpersScreen navigation={props.navigation} /> */}
            {/* {screenIndex === 0 ?
                : screenIndex === 1 ?
                    : null
            } */}
        </View>
    </View>
}

export default ChatsCollectionScreen;