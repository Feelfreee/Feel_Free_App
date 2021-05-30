import React, { useReducer } from 'react';
import { View, Text, TextInput, Dimensions, ScrollView, TouchableOpacity, ToastAndroid, ActivityIndicator } from 'react-native';
import Header from '../Components/Header';
import Styles from '../Styles';
import { launchImageLibrary } from 'react-native-image-picker';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth';
import '@react-native-firebase/storage';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
const { uniqueNamesGenerator, names, starWars, animals } = require('unique-names-generator');
const { v4: uuidv4 } = require('uuid');

const { width, height } = Dimensions.get('window');

const reducer = (state, action) => {
    switch (action.type) {
        case 'set_file_url': {
            console.log(action.type, action.payload);
            return { ...state, fileUrl: action.payload };
        }
        case 'set_post_description': {
            console.log(action.type, action.payload);
            return { ...state, postDescription: action.payload };
        }
        case 'set_loader': {
            console.log(action.type, action.payload);
            return { ...state, loader: action.payload };
        }
        case 'set_error': {
            console.log(action.type, action.payload);
            return { ...state, error: action.payload };
        }
        case 'clear': {
            return {
                fileUrl: null,
                postDescription: '',
                loader: false,
                error: ''
            }
        }
        default: return state;
    }
}


const CreatePostScreen = (props) => {

    const shortNames = () => {
        const shortName = uniqueNamesGenerator({
            dictionaries: [animals, names, starWars],
            length: 2
        });
        return shortName + '_' + uuidv4();
    }

    const [state, dispatch] = useReducer(reducer, {
        fileUrl: '',
        postDescription: '',
        loader: false,
        error: ''
    })

    const uploadFile = () => {
        launchImageLibrary({ mediaType: 'photo' }, response => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.errorCode) {
                console.log('ImagePicker Error: ', response.errorCode);
            } else if (response.errorMessage) {
                console.log('ImagePicker ErrorMessage ', response.errorMessage);
            } else {
                if (response.assets[0].fileSize <= 10000000)
                    dispatch({ type: 'set_file_url', payload: response.assets[0].uri })
                else {
                    dispatch({ type: 'set_error', payload: 'File size is greater than 10 MB.' });
                }
            }
        })
    }

    const onSubmit = () => {
        dispatch({ type: 'set_loader', payload: true });
        if (state.fileUrl !== '') {
            AsyncStorage.getItem('USER_UID').then(uid => {
                if (uid) {
                    firebase.storage()
                        .ref('users')
                        .child(uid + `/posts/${uuidv4()}`)
                        .putFile(state.fileUrl)
                        .then((data) => {
                            firebase.storage().ref(data.metadata.fullPath)
                                .getDownloadURL()
                                .then(async (imageURL) => {
                                    const token = await AsyncStorage.getItem('API_ACCESS_TOKEN');
                                    if (token) {
                                        console.log(token);
                                        const config = {
                                            url: 'https://feelfree12.herokuapp.com/v1/graphql',
                                            method: 'post',
                                            headers: {
                                                Authorization: `Bearer ${token}`,
                                            },
                                            data: {
                                                query: `mutation {
                                              insert_posts(objects: {description: "${state.postDescription}", picture: "${imageURL}", posted_by: "${uid}", random_name: "${shortNames()}"}) {
                                                affected_rows
                                              }
                                            }`
                                            }
                                        }
                                        axios(config)
                                            .then(res => {
                                                console.log('res');
                                                dispatch({ type: 'clear' });
                                                ToastAndroid.showWithGravity('Post Created', 2000, ToastAndroid.BOTTOM);
                                            })
                                            .catch(err => {
                                                console.log(err);
                                                ToastAndroid.showWithGravity('Error Occured', 2000, ToastAndroid.BOTTOM);
                                            })
                                    }
                                })
                                .catch(e => console.log(e));
                        })
                        .catch(e => console.log(e));
                }
            })
        }
        else {
            AsyncStorage.getItem('API_ACCESS_TOKEN')
                .then(token => {
                    AsyncStorage.getItem('USER_UID')
                        .then(uid => {
                            const config = {
                                url: 'https://feelfree12.herokuapp.com/v1/graphql',
                                method: 'post',
                                headers: {
                                    Authorization: `Bearer ${token}`,
                                },
                                data: {
                                    query: `mutation {
                                              insert_posts(objects: {description: "${state.postDescription}", picture: ${null}, posted_by: "${uid}", random_name: "${shortNames()}"}) {
                                                affected_rows
                                              }
                                            }`
                                }
                            };

                            axios(config)
                                .then(res => {
                                    console.log('res');
                                    dispatch({ type: 'clear' });
                                    ToastAndroid.showWithGravity('Post Created', 2000, ToastAndroid.BOTTOM);
                                })
                                .catch(err => {
                                    console.log(err);
                                    ToastAndroid.showWithGravity('Error Occured', 2000, ToastAndroid.BOTTOM);
                                })
                        })
                })
        }
    }

    return <View
        style={{ flex: 1, paddingTop: 75, padding: width * 0.01, alignItems: 'center' }}
    >
        <Header name="Create a Post" />
        <ScrollView>
        <View style={{ marginTop: height * 0.1 }}>
            <TextInput
                style={Styles.InputText}
                onChangeText={text => dispatch({ type: 'set_post_description', payload: text })}
                placeholder={'Write a description ...'}
                placeholderTextColor={'#A9A9A9'}
                multiline={true}
                value={state.postDescription}
            />
            <View style={Styles.attachFile}>
                <ScrollView
                    horizontal
                    style={{ width: width - 300 }}
                    showsHorizontalScrollIndicator={false}
                >
                    <Text style={{ fontSize: 16, color: '#A9A9A9', paddingEnd: width * 0.030, }}>{state.fileUrl ? state.fileUrl : "Upload images"}</Text>
                </ScrollView>
                <TouchableOpacity
                    style={Styles.attachUpload}
                    onPress={uploadFile}
                >
                    <Text style={{ color: "white", fontWeight: 'bold', fontSize: 16 }}>Upload</Text>
                </TouchableOpacity>
            </View>
            {state.error ? <Text style={{ color: 'red', fontSize: 16, fontWeight: 'bold', textAlign: 'center', paddingTop: 20 }}>{state.error}</Text> : <View style={{ height: 16 }} />}
            {!state.loader ? <TouchableOpacity
                onPress={onSubmit}
                style={Styles.Button}>
                <Text style={{ fontSize: width * 0.040, color: 'white' }}>Submit</Text>
            </TouchableOpacity> : <View style={Styles.Button}><ActivityIndicator size='large' color='white' /></View>}

            </View>
        </ScrollView>

    </View >
}

export default CreatePostScreen;