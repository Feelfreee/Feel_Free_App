import { Dimensions, StyleSheet } from "react-native"
import { Colors } from '../Constants'

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
    InputText: {
        marginTop: height * 0.01,
        justifyContent: 'flex-start',
        textAlignVertical: 'top',
        fontSize: width * 0.038,
        padding: width * 0.030,
        borderRadius: height * 0.010,
        height: height * 0.12,
        width: width - width * 0.1,
        marginHorizontal: width * 0.020,
        borderWidth: 1,
        color: 'black',
        borderColor: Colors.theme,
        backgroundColor: 'white'
    },
    attachFile: {
        height: 50,
        width: width - width * 0.1,
        borderWidth: 1,
        borderColor: Colors.theme,
        marginHorizontal: width * 0.020,
        justifyContent: 'space-between',
        alignSelf: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        marginTop: width * 0.034,
        borderRadius: height * 0.010,
        paddingStart: width * 0.030,
        flexDirection: 'row'
    },
    Button: {
        backgroundColor: Colors.theme,
        width: width - width * 0.1,
        height: height * 0.05,
        borderRadius: width * 0.012,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: width * 0.034 * 3,
        marginHorizontal: width * 0.020,
        marginBottom: width * 0.040
    },
    attachUpload: {
        borderRadius: height * 0.010,
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.theme,
        width: 100
    },
    userImageStyle: {
        height: 40,
        width: 40,
        borderRadius: 30,
        backgroundColor: 'white'
    },
    senderMessageComponentStyle: {
        paddingLeft: 100,
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    senderMessageTextStyle: {
        fontSize: 20,
        textAlign: 'right'
    },
    recieverMessageComponentStyle: {
        paddingRight: 100,
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    sendButtonStyle: {
        padding: 10,
        marginHorizontal: 10,
        height: 50,
        width: 75,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputWidget: {
        flexDirection: 'row',
        marginVertical: 10,
        marginStart: 10,
        justifyContent: 'space-between'
    },
    inputStyle: {
        // height: 50,
        borderWidth: 1,
        borderRadius: 10,
        paddingStart: 10,
        fontSize: 20,
        marginRight: 10,
        // flex: 1,
        borderColor: Colors.theme,
        color: 'black'
    },
    headerContainerStyle: {
        backgroundColor: Colors.theme,
        width,
        height: 75,
        position: 'absolute',
        top: 0,
        left: 0,
        justifyContent: 'center',
    },
    headerIconStyle: {
        height: 58.5,
        width: 67.035,
        position: 'absolute',
        // top: 7.5,
        right: 10
    },
    headerTextStyle: {
        color: 'white',
        alignSelf: 'center',
        fontSize: 30,
        fontWeight: 'bold',
    },
    subHeaderStyle: {
        textAlign: 'center',
        color: Colors.theme,
        fontSize: 20,
        marginTop: 10
    },
    postsButtonsStyle: {
        height: 40,
        width: width / 2.25,
        backgroundColor: 'white',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    userImageStyle: {
        height: 40,
        width: 40,
        borderRadius: 30,
        backgroundColor: 'black',
        marginTop: 5
    },
    senderMessageStyle: {
        borderRadius: 10,
        backgroundColor: 'lightblue',
        color: 'black',
        alignSelf: 'flex-end',
        textAlign: 'right',
        padding: 5,
        margin: 10,
    },
    senderMessageTextStyle: {
        fontSize: 20,
        textAlign: 'right'
    },
    senderMessageComponentStyle: {
        paddingLeft: 100,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        // borderWidth: 1,
    },
    recieverMessageComponentStyle: {
        paddingRight: 100,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        // borderWidth: 1
    },
    recieverMessageStyle: {
        borderRadius: 10,
        backgroundColor: 'lightgreen',
        color: 'black',
        fontSize: 20,
        alignSelf: 'flex-start',
        padding: 5,
        margin: 10
    },
    inputWidget: {
        flexDirection: 'row',
        marginVertical: 10,
        marginStart: 10,
        justifyContent: 'space-between'
    },
    inputStyle: {
        height: 50,
        borderWidth: 1,
        borderRadius: 10,
        paddingStart: 10,
        fontSize: 20,
        marginRight: 10,
        flex: 1,
        borderColor: 'black',
        color: 'black'
    },
    sendButtonStyle: {
        borderRadius: 10,
        padding: 10,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
});