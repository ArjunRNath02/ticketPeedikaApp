/* eslint-disable prettier/prettier */
import React from 'react';
import {
    BottomTabBarProps,
    createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import Home from '../../HomeScreen/Screens/Home';
import UserScreen from '../../SettingScreen/Screens/UserScreen';
import Search from '../../SearchScreen/Screens/Search';
import Favorite from './Favorite';
import MyTicket from './MyTicket';
import CustomBottomTab from '../Components/CustomBottomTab';

export type BottomTabParamList = {
    Home: undefined;
    Search: undefined;
    UserScreen: undefined;
    Favorite: undefined;
    MyTicket: undefined;
};

const CustomBottomTabs = (props: BottomTabBarProps) => {
    return <CustomBottomTab {...props} />;
};

const BottomTabNavigator = () => {
    const Tab = createBottomTabNavigator<BottomTabParamList>();

    return (
        <Tab.Navigator
        initialRouteName="Home"
        backBehavior="initialRoute"
        screenOptions={{
            tabBarHideOnKeyboard: true,
            headerShown: false,tabBarShowLabel:false,
        }}
            tabBar={CustomBottomTabs}>
            <Tab.Screen name="Favorite" component={Favorite} />
            <Tab.Screen name="Search" component={Search} />
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="MyTicket" component={MyTicket} />
            <Tab.Screen name="UserScreen" component={UserScreen} />
        </Tab.Navigator>
    );
};

export default BottomTabNavigator;
