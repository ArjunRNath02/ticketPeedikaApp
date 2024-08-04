/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import { StatusBar, Text } from 'react-native';
import React, { useContext, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FONTFAMILY } from '../../../themeComponents/theme';
import AnimatedIcon from '../Components/AnimatedIcon';
import ThemeContext from '../../SettingScreen/Components/ThemeContext';

const Splash = () => {
  const { themeColors,highlightColor } = useContext(ThemeContext);
  const nav = useNavigation<any>();
  useEffect(() => {
    setTimeout(() => {
      AsyncStorage.getItem('loggedIn').then((value) => {
        if (value === null || value === 'false') {
          nav.replace('Login'); // Navigate to Login screen only if loggedIn key is null
        } else {
          nav.replace('Tab'); // Navigate to Tab screen if loggedIn key is not null
        }
      });
    }, 6000);
  }, [nav]);

  return (
    <SafeAreaView
      style={{
        backgroundColor: themeColors.secondary,
        flex: 1,
        display: 'flex',
      }}>
        <StatusBar hidden />
      <AnimatedIcon />
      <Text
        style={{
          color: highlightColor,
          fontFamily: FONTFAMILY.poppins_bold,
          fontSize: 10,
          top: 50,
        }}>
        Your One-Stop Shop for Movie Magic!
      </Text>
    </SafeAreaView>
  );
};

export default Splash;
