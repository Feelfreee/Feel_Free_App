import React from 'react';
import { View, Text, TouchableOpacity, TextInput, Dimensions } from 'react-native';
import Header from '../Components/Header';
import Icon from 'react-native-vector-icons/MaterialIcons'
import Styles from '../Styles';

const { width, height } = Dimensions.get('window');

const ReportPostScreen = (props) => {
    return <View
        style={{ flex: 1, paddingTop: 75, alignItems: 'center' }}
    >
        <Header name='Report Post' backRequired backHandler={() => props.navigation.goBack()} />

        <View style={{ marginTop: height * 0.1 }}>
            <TextInput
                style={Styles.InputText}
                // onChangeText={text => }
                placeholder={'Write a description ...'}
                placeholderTextColor={'#A9A9A9'}
                multiline={true}
            // value={review}
            />

            <TouchableOpacity
                type
                onPress={() => { }}
                style={Styles.Button}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>Submit</Text>
            </TouchableOpacity>
        </View>
    </View>
}

export default ReportPostScreen;