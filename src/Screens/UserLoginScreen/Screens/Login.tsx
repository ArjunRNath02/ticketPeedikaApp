/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import { StyleSheet, View, Image, ScrollView, StatusBar, ImageBackground } from 'react-native';
import React, { useContext, useState } from 'react';
import Llogin from '../Components/Llogin';
import Lsignup from '../Components/Lsignup';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { LoginLogo,LoginLogoIcon } from '../../../themeComponents/Date';
import ThemeContext from '../../SettingScreen/Components/ThemeContext';

const Login = () => {
  const { themeColors, background,highlightColor } = useContext(ThemeContext);
  const [showSignup, setShowSignup] = useState(false);

  const styles = StyleSheet.create({
    container: {
      display: 'flex',
      flex: 1, backgroundColor: themeColors.secondary,
    },
    firstBox: {
      alignItems: 'center',
      flex: 1, height: responsiveHeight(20), justifyContent: 'center',
      bottom:responsiveHeight(2),
    },
    logo: {
      height: responsiveHeight(11), width: responsiveWidth(88),
      tintColor:highlightColor,top:responsiveHeight(5),
    },
    logoIcon: {
      height: responsiveHeight(10), width: responsiveWidth(20),
      top:responsiveHeight(5),tintColor:highlightColor,
    },
    secondBox: {
      flex: 1, top: responsiveHeight(8),
      height: responsiveHeight(80),
      width: responsiveWidth(90),
      justifyContent: 'center', alignSelf: 'center',
    },
  });

  return (
    <ScrollView
      bounces={false}
      showsVerticalScrollIndicator={false}
      style={styles.container}>
      <ImageBackground source={background}
        blurRadius={0} style={{ flex:1,display: 'flex' }}>
        <StatusBar hidden />
        <View style={styles.firstBox} //Icon,Welcome
        >
        <Image
            source={LoginLogoIcon}
            style={styles.logoIcon} />
          <Image
            source={LoginLogo}
            style={styles.logo} />
        </View>

        <View  //Login,SignUp
          style={styles.secondBox}>
          {showSignup ? (
            <Lsignup onCancel={() => setShowSignup(false)} />
          ) : (
            <Llogin onSignup={() => setShowSignup(true)} />
          )}
        </View>
      </ImageBackground>
    </ScrollView>
  );
};

export default Login;
