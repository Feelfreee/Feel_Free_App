import React from 'react';
import { View, Text, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import AuthScreen from './src/Screens/AuthScreen';
import ChatsCollectionScreen from './src/Screens/ChatsCollectionScreen';
import ChatsScreen from './src/Screens/ChatsScreen';
import AccountScreen from './src/Screens/AccountScreen';
import CreatePostScreen from './src/Screens/CreatePostScreen';
import ApplyToHelpScreen from './src/Screens/ApplyToHelpScreen';
import ReportPostScreen from './src/Screens/ReportPostScreen';
import { Colors } from './src/Constants'
import PostsScreen from './src/Screens/PostsScreen';
import ChatRequestsScreen from './src/Screens/ChatRequestsScreen';
import SplashScreen from './src/Screens/SplashScreen';
import GetThreePhoneNumbers from './src/Screens/GetThreePhoneNumbers';

const PostsStack = createStackNavigator();
const MainBottomTab = createBottomTabNavigator();
const StackTab = createStackNavigator();

const PostsNavigatorContainer = () => (
  <PostsStack.Navigator headerMode='none'>
    <PostsStack.Screen name='PostsMain' component={PostsScreen} options={{}} />
    <PostsStack.Screen name='ApplyToHelp' component={ApplyToHelpScreen} options={{}} />
    <PostsStack.Screen name='ReportPost' component={ReportPostScreen} options={{}} />
    <PostsStack.Screen name='ChatRequests' component={ChatRequestsScreen} options={{}} />
  </PostsStack.Navigator>
)

const MainBottomTabNavigator = () => (
  <MainBottomTab.Navigator
    tabBarOptions={{
      style: {
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        height: 60,
      },
      activeTintColor: Colors.theme
      ,
      showLabel: false
    }}
  >
    <MainBottomTab.Screen
      name='Posts'
      component={PostsNavigatorContainer}
      options={{
        tabBarIcon: ({ focused, color }) => (
          <Icon name='dynamic-feed' size={40} color={focused ? color : 'black'} />
        )
      }}
    />
    <MainBottomTab.Screen
      name='ChatsCollection'
      component={ChatsCollectionScreen}
      options={{
        tabBarIcon: ({ focused, color }) => (
          <Icon name='chat' size={40} color={focused ? color : 'black'} />
        )
      }}
    />
    <MainBottomTab.Screen
      name='CreatePost'
      component={CreatePostScreen}
      options={{
        tabBarIcon: ({ focused, color }) => (
          <Icon name='edit' size={40} color={focused ? color : 'black'} />
        )
      }}
    />
    <MainBottomTab.Screen
      name='Account'
      component={AccountScreen}
      options={{
        tabBarIcon: ({ focused, color }) => (
          <Icon name='person' size={40} color={focused ? color : 'black'} />
        )
      }}
    />
  </MainBottomTab.Navigator>
)



const App = () => {
  return <NavigationContainer >
    <StackTab.Navigator headerMode='none' initialRouteName='Splash'>
      <StackTab.Screen name='Splash' component={SplashScreen} options={{}} />
      <StackTab.Screen name='Auth' component={AuthScreen} options={{}} />
      <StackTab.Screen name='GetThreeNo' component={GetThreePhoneNumbers} options={{}} />
      <StackTab.Screen name='Main' component={MainBottomTabNavigator} options={{}} />
      <StackTab.Screen name='Chats' component={ChatsScreen} options={{}} />
    </StackTab.Navigator>
    <StatusBar backgroundColor={Colors.theme} />
  </NavigationContainer>
}

export default App;