/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Text, View, StyleSheet, StatusBar, Image, TouchableOpacity, ImageBackground } from 'react-native';
import { FONTFAMILY } from '../../../themeComponents/theme';
import AppHeader from '../../../themeComponents/AppHeader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SettingComponent from '../Components/SettingComponent';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { responsiveHeight } from 'react-native-responsive-dimensions';
import { MilesImg } from '../../../themeComponents/Date';
import ThemeContext from '../Components/ThemeContext';

const UserScreen = ({ navigation }: any) => {
  const { themeColors, background, highlightColor } = useContext(ThemeContext);
  const [name, setName] = useState(' ');
  const [pass, setPass] = useState(' ');
  const [mail, setMail] = useState(' ');
  const [pnum, setPNum] = useState(' ');


  const userInfo = useCallback(async () => {
    try {
      const userDetails = await AsyncStorage.getItem('userInfo');
      if (userDetails) {
        const userList = JSON.parse(userDetails);
        if (Array.isArray(userList.data) && userList.data.length > 0) {
          const Name = userList.data[0].name; // Accessing the name property from the first item in the data array
          const Pass = userList.data[0].pass;
          const Mail = userList.data[0].mail;
          const PNum = userList.data[0].pnum;
          setName(Name);
          setPass(Pass);
          setMail(Mail);
          setPNum(PNum);
        }
      }
    } catch (err) {
      console.log(err);
    }
  }, [setName]);

  useEffect(() => {
    let timerId = setInterval(() => {
      userInfo();
    }, 1000);
    return () => {
      clearInterval(timerId);
    };
  }, [userInfo]);

  const loggedIn = async () => {
    try {
      await AsyncStorage.setItem('loggedIn', 'false'); // Set the value of 'loggedIn' to false
    } catch (error) {
      console.log(error);
    }
    navigation.navigate('Login');
  };

  return (
    <View style={[styles.container, {
      backgroundColor: themeColors.secondary,
    }]}>
      <StatusBar hidden />
      <ImageBackground source={background}
        blurRadius={0} style={{ flex: 1 }}>
        <View style={styles.appHeaderContainer}>
          <AppHeader
            name="close"
            header={'My Profile'}
            action={() => navigation.goBack()}
          />
        </View>

        <View style={styles.profileContainer}>
          <Image
            source={MilesImg}
            style={styles.avatarImage}
          />
          <Text style={[styles.avatarText, { color: themeColors.text }]}>{name}</Text>
        </View>

        <View style={styles.profileContainer}>
          <SettingComponent
            icon="user"
            heading="Account"
            subheading="Edit Profile"
            subtitle="Change Password"
            name={name}
            mail={mail}
            pnum={pnum}
            pass={pass}
            Screen="Account"
          />
          <SettingComponent
            icon="setting"
            heading="Settings"
            subheading="Theme"
            subtitle="Permissions"
            name={name}
            mail={mail}
            pnum={pnum}
            pass={pass}
            Screen="Settings"
          />
          <SettingComponent
            icon="info"
            heading="About"
            subheading="About TicketPeedika"
            subtitle="more"
            Screen="About"
          />
          <TouchableOpacity style={styles.Lcontainer} onPress={loggedIn}>
            <View>
              <MaterialIcons name="logout" style={[styles.iconStyle, { color: highlightColor }]} />
            </View>
            <View style={styles.settingContainer}>
              <Text style={[styles.title, { color: themeColors.text }]}>Logout</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
  },
  appHeaderContainer: {
    marginHorizontal: responsiveHeight(3.6), // Adjusted margin for responsiveness
    marginTop: responsiveHeight(4), // Adjusted marginTop for responsiveness
  },
  profileContainer: {
    alignItems: 'center',
    padding: responsiveHeight(3.6), // Adjusted padding for responsiveness
  },
  avatarImage: {
    height: responsiveHeight(9), // Adjusted height for responsiveness
    width: responsiveHeight(9), // Adjusted width for responsiveness
    borderRadius: responsiveHeight(9), // Adjusted borderRadius for responsiveness
  },
  avatarText: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: responsiveHeight(2), // Adjusted fontSize for responsiveness
    marginTop: responsiveHeight(1.6), // Adjusted marginTop for responsiveness
  },
  Lcontainer: {
    flexDirection: 'row',
    paddingVertical: responsiveHeight(2), // Adjusted paddingVertical for responsiveness
  },
  settingContainer: {
    flex: 1,
  },
  iconStyle: {
    fontSize: responsiveHeight(2.4), // Adjusted fontSize for responsiveness
    paddingHorizontal: responsiveHeight(2), // Adjusted paddingHorizontal for responsiveness
  },
  title: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: responsiveHeight(2.4), // Adjusted fontSize for responsiveness
  },
});

export default UserScreen;
