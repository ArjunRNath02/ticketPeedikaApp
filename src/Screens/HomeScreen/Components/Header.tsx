/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, { memo, useEffect, useState, useCallback, useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FONTFAMILY } from '../../../themeComponents/theme';
import CustomIcon from '../../../themeComponents/CustomIcon';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ThemeContext from '../../SettingScreen/Components/ThemeContext';

const Header = memo(() => {
  const { themeColors, highlightColor } = useContext(ThemeContext);
  const [name, setName] = useState('');
  const [city, setCity] = useState('');



  const userInfo = useCallback(async () => {
    try {
      const userDetails = await AsyncStorage.getItem('userInfo');
      if (userDetails) {
        const userList = JSON.parse(userDetails);
        if (Array.isArray(userList.data) && userList.data.length > 0) {
          const Name = userList.data[0].name; // Accessing the name property from the first item in the data array
          setName(Name); // Assuming setName is a state update function
        }
      }
    } catch (err) {
      console.log(err);
    }
  }, [setName]);


  const getCityInfo = useCallback(async () => {
    try {
      const cityValue = await AsyncStorage.getItem('cityInfo');
      setCity(cityValue || '');
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    const timerId = setInterval(() => {
      getCityInfo();
      userInfo();
    }, 1000);
    return () => clearInterval(timerId);
  }, [getCityInfo, userInfo]);

  const nav = useNavigation<any>();

  const navigateToCitySelection = useCallback(() => {
    nav.navigate('SelectCity');
  }, [nav]);

  const navigateToSearch = useCallback(() => {
    nav.navigate('Search');
  }, [nav]);

  return (
    <View
      style={{
        paddingHorizontal: responsiveWidth(4),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: responsiveHeight(1),
        bottom: responsiveHeight(2),
      }}>
      <View style={{ flexDirection: 'column', flexShrink: 1 }}>
        <View style={{ flexDirection: 'row' }}>
          <Text
            style={{
              color: themeColors.text,
              fontSize: responsiveFontSize(2.9),
              fontFamily: FONTFAMILY.poppins_semibold,
              paddingBottom: responsiveHeight(1),
              flexShrink: 1,
            }}>
            Hello {name || 'User'},
          </Text>
        </View>
        <TouchableOpacity
          onPress={navigateToCitySelection}
          style={{ flexDirection: 'row', alignItems: 'center', paddingBottom: responsiveHeight(1), bottom: responsiveHeight(1.5) }}>
          <Ionicons
            name="location-sharp"
            size={responsiveFontSize(2.6)}
            color={themeColors.text}
            style={{ bottom: responsiveHeight(0.2) }}
          />
          <Text
            adjustsFontSizeToFit={true}
            numberOfLines={1}
            style={{
              fontSize: responsiveFontSize(2.1),
              color: themeColors.text,
              fontFamily: FONTFAMILY.poppins_semibold,
              left: responsiveWidth(1),
            }}>
            {city}
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={{
          height: responsiveHeight(6),
          width: responsiveWidth(43),
          borderRadius: responsiveHeight(3),
          backgroundColor: themeColors.blur,
          flexDirection: 'row',
          alignItems: 'center',
          bottom: responsiveHeight(1),
        }}
        onPress={navigateToSearch}>
        <CustomIcon
          name="search"
          size={responsiveFontSize(3)}
          color={highlightColor}
          style={{ left: responsiveWidth(32) }}
        />
      </TouchableOpacity>
    </View>
  );
});

export default Header;
