import React from 'react';
import { View, Text, Image, Dimensions, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Styles from '../Styles'

const { width, height } = Dimensions.get('window');

const Header = ({ children, name, backRequired, backHandler, additionalStyle }) => {
    return <View
        style={{ ...Styles.headerContainerStyle }}
    >
        {/* <Image
            source={require('../Assets/Logo.png')}
            style={Styles.headerIconStyle}
        /> */}

        {backRequired && backHandler ? <TouchableOpacity
            onPress={() => backHandler()}
            style={{
                position: 'absolute',
                left: 10,
                top: 10
            }}
        >
            <Icon name='chevron-left' size={50} color='white' />
        </TouchableOpacity> : null}

        <Text
            style={{ ...Styles.headerTextStyle, ...additionalStyle }}
        > {name} </Text>
    </View>
}

export default Header;