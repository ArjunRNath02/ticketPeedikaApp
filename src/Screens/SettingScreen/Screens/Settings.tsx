/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, { useContext, useEffect, useState } from 'react';
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FONTFAMILY } from '../../../themeComponents/theme';
import AppHeader from '../../../themeComponents/AppHeader';
import { useNavigation } from '@react-navigation/native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import ColorList from '../Components/ColorList';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Octicons from 'react-native-vector-icons/Octicons';
import ThemeContext from '../Components/ThemeContext';
import ToggleSwitch from 'toggle-switch-react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';

const Settings = ({ navigation }: any) => {
  const [Option, setOption] = useState<number>();

  const indexedColors = [
    { color: '#3626A4', name: 'BLU' },
    { color: '#58CD36', name: 'GRN' },
    { color: '#FF91D9', name: 'FSC' },
    { color: '#A42CD6', name: 'VLT' },
    { color: '#3772FF', name: 'LGB' },
    { color: '#D9FB02', name: 'MNT' },
    { color: '#FFD218', name: 'GLD' },
    { color: '#FF57D2', name: 'PNK' },
    { color: '#EF0307', name: 'RED' },
    { color: '#F77F00', name: 'ORG' },
  ];

  const nav = useNavigation<any>();
  const clearMovieData = async () => {
    try {
      AsyncStorage.removeItem('BookedTickets');
    } catch (error) { }
    navigation.navigate('Tab');
  };

  const { themeColors, toggleTheme, background, highlightColor, setHighlightColor } = useContext(ThemeContext);
  const [isOn, setIsOn] = useState(themeColors.theme === 'dark');

  const handleToggle = async (newIsOn: boolean | ((prevState: boolean) => boolean)) => {
    setIsOn(newIsOn); // Update the state when the toggle is switched
    toggleTheme(); // Call the toggleTheme function from your context to change the theme
    try {
      await AsyncStorage.setItem('isDarkTheme', newIsOn ? 'true' : 'false');
    } catch (error) {
      console.error('Error saving toggle state:', error);
    }
  };

  useEffect(() => {
    const fetchToggleState = async () => {
      try {
        const storedIsDarkTheme = await AsyncStorage.getItem('isDarkTheme');
        setIsOn(storedIsDarkTheme === 'true');
      } catch (error) {
        console.error('Error fetching toggle state:', error);
      }
    };

    fetchToggleState();
  }, []);



  const changeHighlightColor = async (color: string, option: number) => {
    setOption(option);
    setHighlightColor(color); // Update the highlight color in the ThemeContext
    try {
      await AsyncStorage.setItem('highlightColor', color);
    } catch (error) {
      console.error('Error saving highlight color:', error);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: themeColors.secondary }]}>
      <ImageBackground source={background} blurRadius={0} style={{ flex: 1 }}>
        <View style={styles.headerContainer}>
          <AppHeader
            name="close"
            header={'Settings'}
            action={() => nav.goBack()}
          />
        </View>
        <View style={styles.subHeadContainer}>
          <Text style={[styles.headText, { color: themeColors.text }]}>Select Theme</Text>
        </View>
        <View style={[styles.modeContainer, { backgroundColor: themeColors.blur }]}>
          <View style={{ marginTop: responsiveHeight(2), marginLeft: responsiveWidth(3) }}>
            <ToggleSwitch
              isOn={isOn}
              size="large"
              onColor={themeColors.Mgrey}
              offColor={themeColors.Mgrey}
              thumbOnStyle={{ backgroundColor: themeColors.red }}
              thumbOffStyle={{ backgroundColor: themeColors.blue }}
              label="Change Theme"
              labelStyle={{ color: themeColors.text, fontFamily: FONTFAMILY.poppins_semibold }}
              onToggle={handleToggle} // Pass the handleToggle function as the onToggle prop
              icon={isOn ? <MaterialIcons name="sunny" size={24} color={themeColors.pureWhite} /> : <Feather name="moon" size={24} color={themeColors.pureWhite} />}
            />
          </View>
        </View>
        <View style={[styles.hlContainer, { backgroundColor: themeColors.blur }]}>
          <Text style={[styles.subHeadText, { color: themeColors.text }]}>Highlight Color</Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: responsiveWidth(2),
              paddingHorizontal: responsiveWidth(10),
              paddingTop: responsiveHeight(3),
            }}>
            {indexedColors.map(({ color, name }: any, index: any) => (
              <TouchableOpacity
                key={index}
                style={styles.colorButton}
                onPress={() => changeHighlightColor(color, index)}
              >
                <ColorList Color={color} />
                {Option === index ? (
                  <Text style={[styles.colorText, { color: themeColors.text }]}>
                    {name}
                  </Text>
                ) : (
                  <Text> </Text>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <TouchableOpacity onPress={clearMovieData} style={[styles.button, { backgroundColor: highlightColor }]}>
          <Octicons name="trash" size={26} color={themeColors.pureWhite} style={{ left: responsiveWidth(6) }} />
          <Text style={[styles.buttonText, { color: themeColors.pureWhite }]}>Clear Ticket Data</Text>
        </TouchableOpacity>

      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
  },
  headerContainer: {
    marginHorizontal: 36,
    marginTop: 40,
  },
  subHeadContainer: {
    paddingTop: responsiveHeight(5),
    paddingLeft: responsiveWidth(12),
  },
  headText: {
    fontSize: responsiveFontSize(2.2),
    fontFamily: FONTFAMILY.poppins_semibold,
  },
  modeContainer: {
    top: responsiveHeight(1.5),
    left: responsiveWidth(12),
    height: responsiveHeight(8),
    width: responsiveWidth(75),
    borderRadius: 30,
    borderBottomWidth: 1,
    borderBottomEndRadius: 0,
    borderBottomStartRadius: 0,
  },
  subHeadText: {
    fontSize: 15,
    fontFamily: FONTFAMILY.poppins_semibold,
    paddingLeft: 30,
    top: 13,
  },
  imGContainer: {
    paddingLeft: 90,
    paddingTop: 20,
  },
  imG: {
    height: responsiveHeight(15),
    width: responsiveWidth(15),
    borderRadius: 10,
  },
  modeText: {
    fontSize: 12,
    fontFamily: FONTFAMILY.poppins_regular,
    paddingLeft: 17,
    top: 10,
  },
  hlContainer: {
    top: responsiveHeight(1.2),
    left: responsiveWidth(12),
    height: responsiveHeight(23),
    width: responsiveWidth(75),
    borderRadius: 30,
    borderTopEndRadius: 0,
    borderTopStartRadius: 0,
  },
  colorText: {
    fontSize: 11,
    fontFamily: FONTFAMILY.poppins_regular,
    left: 6,
    top: 4,
  },
  colorButton: {},
  button: {
    marginTop: responsiveHeight(5),
    paddingVertical: responsiveHeight(1.5),
    width: responsiveWidth(70),
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: 10, flexDirection: 'row',
  },
  buttonText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: responsiveFontSize(2), left: responsiveWidth(15),
  },
});

export default Settings;
