import React, { useState } from 'react';
import {
    View,
    Text,
    Dimensions,
    TouchableOpacity,
} from 'react-native';
import Header from '../Components/Header';
import { Colors } from '../Constants';
import Styles from '../Styles';
import MyPostsScreen from './MyPostsScreen';
import OtherPostsScreen from './OtherPostsScreen';

const { width, height } = Dimensions.get('window');

const PostsScreen = (props) => {

    const [screenIndex, setScreenIndex] = useState(0);

    return <View style={{ flex: 1, paddingTop: 75 }}>
        <Header name='Posts' />

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
                }}>All Posts</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={Styles.postsButtonsStyle}
                onPress={() => setScreenIndex(1)}>
                <Text style={{
                    fontWeight: 'bold',
                    fontSize: 16,
                    color: screenIndex == 1 ? 'black' : 'lightgrey'
                }}>My Posts</Text>
            </TouchableOpacity>
        </View>


        <View style={{ flex: 1 }} >
            {screenIndex === 0 ?
                <OtherPostsScreen
                    navigation={props.navigation}
                />
                : screenIndex === 1 ? <MyPostsScreen
                    navigation={props.navigation}
                />
                    : null
            }
        </View>
    </View >
}

export default PostsScreen;