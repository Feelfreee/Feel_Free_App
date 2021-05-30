import React, { useState } from 'react'
import { TextInput, View, TouchableOpacity, Dimensions } from 'react-native';
import Styles from '../Styles';

const { width, height } = Dimensions.get('screen');

const GetThreePhoneNumbers = (props) => {

    const [helperNumber, setHelperNumber] = useState()
    const [index, setIndex] = useState(1)

    const enterNo = () => {
        // on every number entry 
        // locally save the nos
        // store the index asyncstorage
    }

    return <View style={{ flex: 1, alignItems: 'center' }}>

        <View style={Styles.attachFile}>
            <ScrollView
                horizontal
                style={{ width: width - 300 }}
                showsHorizontalScrollIndicator={false}
            >
                <Text style={{ fontSize: 16, color: '#A9A9A9', paddingEnd: width * 0.030, }}>{fileUrl ? fileUrl : "Upload images"}</Text>
            </ScrollView>
            <TouchableOpacity
                style={Styles.attachUpload}
                onPress={uploadFile}
            >
                <Text style={{ color: "white", fontWeight: 'bold', fontSize: 16 }}>Upload</Text>
            </TouchableOpacity>
        </View>

        <TextInput
            style={Styles.inputStyle}
            value={helperNumber}
            onChangeText={
                helperNo => setHelperNumber(helperNo)
            }
            placeholderTextColor='black'
            placeholder={`Enter ${index === 1 ? 'first' : index === 2 ? 'second' : index === 3 ? 'third' : null} person contact no.`}
        />
        {index == 1 ? <TouchableOpacity
            onPress={enterNo}
            style={Styles.Button}
        >
            <Text style={{ fontSize: width * 0.040, color: 'white' }}>Submit</Text>
        </TouchableOpacity> :
            <TouchableOpacity
                onPress={enterNo}
                style={Styles.Button}
            >
                <Text style={{ fontSize: width * 0.040, color: 'white' }}>Move ahead</Text>
            </TouchableOpacity>
        }
        <TouchableOpacity
            onPress={() => props.navigation.navigate('Main')}
            style={Styles.Button}
        >
            <Text style={{ fontSize: width * 0.040, color: 'white' }}>Skip for now</Text>
        </TouchableOpacity>
    </View>
}

export default GetThreePhoneNumbers;