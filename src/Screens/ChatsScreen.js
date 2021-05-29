import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, TextInput, Image, Modal, TouchableWithoutFeedback } from 'react-native';
import Header from '../Components/Header';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Styles from '../Styles';
import { Colors } from '../Constants/index';
import { Card, Avatar } from 'react-native-paper';

const messages = [
    {
        senderEmail: 'asdfghjkl@gmail.com',
        message: 'hello'
    },
    {
        senderEmail: 'zxcvbnm@gmail.com',
        message: 'hi'
    }
]

const ChatsScreen = (props) => {

    const [isModalVisible, setIsModalVisible] = useState(false);

    const SenderImageComponent = () => {
        return <Avatar.Text size={30} />
        // />
    }

    const RecieverImageComponent = () => {
        return <Image
            // source={props.route.params.item.data.photoURL ? { uri: props.route.params.item.data.photoURL } : require('../assets/userImage.png')}
            style={Styles.userImageStyle}
        />
    }

    const SenderMessageComponent = ({ color, item, index }) => {
        return <View key={index} style={Styles.senderMessageComponentStyle}>
            <View style={Styles.senderMessageStyle}>
                <Text
                    style={Styles.senderMessageTextStyle}
                >{item.message}
                </Text>
            </View>
            <SenderImageComponent />
        </View>
    }

    const RecieverMessageComponent = ({ color, item, index }) => {
        return <View style={Styles.recieverMessageComponentStyle}>
            <RecieverImageComponent />
            <Text
                style={Styles.recieverMessageStyle}
            >{item.message}</Text>
        </View>
    }

    return <View style={{ flex: 1, paddingTop: 75, justifyContent: 'space-between' }}>
        <Header name='Anonymous User'
            backRequired
            backHandler={() => props.navigation.goBack()}
            additionalStyle={{ fontSize: 20, alignSelf: 'flex-start', marginLeft: 75 }}
        />

        <FlatList
            data={messages}
            keyExtractor={item => item.senderEmail}
            renderItem={
                ({ item, index }) => {
                    return <View>
                        {
                            // item.senderEmail == props.email
                            item.senderEmail == 'asdfghjkl@gmail.com'
                                ?
                                <SenderMessageComponent color={'blue'} item={item} index={index} />
                                :
                                <RecieverMessageComponent color={'green'} item={item} index={index} />
                        }
                    </View>
                }
            }
            style={{ paddingHorizontal: 10 }}
        />

        <View style={Styles.inputWidget}>
            <TextInput
                style={{
                    ...Styles.inputStyle,
                    minHeight: 50,
                    maxHeight: 200,
                }}
                autoFocus={true}
                // value={}
                onChangeText={
                    newMsg => { }
                }
                placeholderTextColor='black'
                placeholder='Type something...'
                multiline={true}
                numberOfLines={5}
            />
            {/* <TextInput
                style={{ ...Styles.InputText, }}
                // onChangeText={text => dispatch({ type: 'set_post_description', payload: text })}
                placeholder={'Write a description ...'}
                placeholderTextColor={'#A9A9A9'}
                multiline={true}
            // value={state.postDescription}
            /> */}
            {props.isSending ?
                <TouchableOpacity
                    style={Styles.sendButtonStyle}
                >
                    <ActivityIndicator size='small' color={Colors.theme} />
                </TouchableOpacity>
                :
                <TouchableOpacity
                    style={{ ...Styles.sendButtonStyle, padding: 0, marginRight: 10 }}
                    onPress={
                        () => { }
                    }
                >
                    <Icon name='send' color={Colors.theme} size={45} />
                </TouchableOpacity>
            }
            <TouchableOpacity
                style={{ ...Styles.sendButtonStyle, width: 30, padding: 0, marginRight: 15 }}
                onPress={
                    () => setIsModalVisible(true)
                }
            >
                <Icon name='more-vert' size={30} color='grey' />
            </TouchableOpacity>
        </View>
        <Modal
            visible={isModalVisible}
            transparent
            onRequestClose={() => setIsModalVisible(false)}
        >
            <TouchableWithoutFeedback onPress={() => setIsModalVisible(false)}>
                <View style={{
                    flex: 1,
                    // zIndex: 1,
                }} >
                    <TouchableOpacity style={{
                        height: 175,
                        width: 250,
                        // backgroundColor: 'red',
                        position: 'absolute',
                        bottom: 70,
                        right: 20,
                        padding: 10,
                    }}>
                        <Card
                            style={{
                                height: 155,
                                borderRadius: 20
                            }}
                            elevation={5}
                        >
                            <TouchableOpacity
                                // onPress={ }
                                style={{
                                    height: 75,
                                    width: 230,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderBottomColor: 'black',
                                    borderBottomWidth: 1,
                                }}
                            >
                                <Text style={{}}>Report Helper</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{
                                    height: 75,
                                    width: 230,
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}
                            >
                                <Text>End Chat</Text>
                            </TouchableOpacity>
                        </Card>
                    </TouchableOpacity>
                </View>

            </TouchableWithoutFeedback>
        </Modal>
    </View>
}

export default ChatsScreen;