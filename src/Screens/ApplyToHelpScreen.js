import React from 'react';
import { View, Text, TouchableOpacity, TextInput, Dimensions, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Styles from '../Styles';
import Header from '../Components/Header';

const { width, height } = Dimensions.get('window');

const ApplyToHelpModel = (props) => {
    return <Modal>

        <View
            style={{ flex: 1, paddingTop: 75, alignItems: 'center' }}
        >
            <Header backRequired name='Send Request' backHandler={() => props.navigation.goBack()} />

            {/* <SubHeader text='Send request' /> */}
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
                    <Text style={{ fontSize: width * 0.040, color: 'white' }}>Submit</Text>
                </TouchableOpacity>
            </View>
        </View>
    </Modal>
}

export default ApplyToHelpModel;