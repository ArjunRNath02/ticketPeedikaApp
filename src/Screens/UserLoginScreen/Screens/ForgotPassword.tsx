/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, { useContext, useEffect, useState } from 'react';
import { ImageBackground, StatusBar, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { FONTFAMILY } from '../../../themeComponents/theme';
import AppHeader from '../../../themeComponents/AppHeader';
import { useNavigation } from '@react-navigation/native';
import ThemeContext from '../../SettingScreen/Components/ThemeContext';

const ForgotPassword = () => {
  const { themeColors,background,highlightColor } = useContext(ThemeContext);

  const styles = StyleSheet.create({
    container: {
      flex: 1,backgroundColor: themeColors.secondary,
    },
    contentContainer: {
      paddingHorizontal: responsiveWidth(5),
      paddingBottom: responsiveHeight(5),
    },
    header: {
      marginVertical: responsiveHeight(4),
    },
    mheader: {
      paddingBottom: responsiveHeight(2),
    },
    headerText: {
      fontFamily: FONTFAMILY.poppins_medium,
      fontSize: responsiveFontSize(1.8),
      color: themeColors.text,
    },
    boxes: {
      height: responsiveHeight(7.5),
      width: '100%',
      alignSelf: 'center',
      borderRadius: responsiveHeight(1),
      backgroundColor: themeColors.Grad,
      marginBottom: responsiveHeight(4),
      flexDirection: 'row',
      alignItems: 'center', top: responsiveHeight(3),
      borderWidth:2,borderColor:themeColors.grey,
    },
    text: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
    },
    textInput: {
      flex: 1,
      fontFamily: FONTFAMILY.poppins_regular,
      fontSize: responsiveFontSize(1.65),
      paddingLeft: responsiveWidth(6),
      color: themeColors.text,
    },
    eyeIcon: {
      marginHorizontal: responsiveWidth(2),
    },
    saveButton: {
      height: responsiveHeight(7),
      width: '100%',
      alignSelf: 'center',
      borderRadius: responsiveHeight(1),
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: highlightColor,
    },
    buttonText: {
      fontFamily: FONTFAMILY.poppins_semibold,
      fontSize: responsiveFontSize(2),
      color:themeColors.pureWhite,
    },
    changePassword: {},
    passwordInput: {},
  });

  const nav = useNavigation();
  const [name, setName] = useState<string | undefined>();
  const [mail, setMail] = useState<string | undefined>();
  const [pnum, setPNum] = useState<string | undefined>();
  const [newPass, setNewPass] = useState<string | undefined>();
  const [verPass, setVerPass] = useState<string | undefined>();
  const [newMail, setNewMail] = useState<string | undefined>();
  const [showPass, setShowPass] = useState(false);

  useEffect(() => {
    let timerId = setInterval(() => {
      getUserData();
    }, 500);
    return () => {
      clearInterval(timerId);
    };
  }, []);

  const getUserData = async () => {
    try {
      const value = await AsyncStorage.getItem('userInfo');
      if (value !== null) {
        const item = JSON.parse(value);
        setName(item.Name);
        setMail(item.Mail);
        setPNum(item.PNum);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const toggleShowPassword = () => {
    setShowPass(!showPass);
  };

  const setUserData = async () => {
    if (mail === newMail) {
      if (newPass === verPass) {
        if (newPass && name && mail && pnum) {
          const password = newPass;
          try {
            await AsyncStorage.setItem(
              'userInfo',
              JSON.stringify({
                Name: name,
                Password: password,
                Mail: mail,
                PNum: pnum,
              })
            );
          } catch (error) {
            console.error('Something went Wrong while storing in Change Functions', error);
          }
          ToastAndroid.showWithGravity('Changes Successful !', ToastAndroid.SHORT, ToastAndroid.BOTTOM);
        }
      } else {
        ToastAndroid.showWithGravity('Passwords entered do not match !', ToastAndroid.SHORT, ToastAndroid.BOTTOM);
      }
    } else {
      ToastAndroid.showWithGravity('Enter your registered email address !', ToastAndroid.SHORT, ToastAndroid.BOTTOM);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <ImageBackground source={background}
      blurRadius={0} style={{height:'100%'}}>
      <View style={styles.contentContainer}>
        <View style={styles.header}>
          <AppHeader name="close" header={'Forgot Password'} action={() => nav.goBack()} />
        </View>
        <View style={{paddingHorizontal: responsiveWidth(8)}}>
        <View style={styles.mheader}>
          <Text style={styles.headerText}>Enter your Email Address</Text>
          <View >
            <TouchableOpacity style={styles.boxes}>
              <View style={styles.text}>
                <TextInput
                  style={styles.textInput}
                  onChangeText={(textInput) => setNewMail(textInput)}
                  value={newMail}
                  placeholderTextColor={themeColors.grey}
                  placeholder="Enter Email Address"
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.changePassword}>
          <Text style={styles.headerText}>Change Password</Text>
          <View>
            <View style={styles.passwordInput}>
              <TouchableOpacity style={styles.boxes}>
                <View style={styles.text}>
                  <TextInput
                    secureTextEntry={!showPass}
                    style={styles.textInput}
                    onChangeText={(textInput) => setNewPass(textInput)}
                    value={newPass}
                    placeholderTextColor={themeColors.grey}
                    placeholder="Enter New Password"
                  />
                  <MaterialCommunityIcons
                    name={showPass ? 'eye-off' : 'eye'}
                    size={24}
                    color={themeColors.grey}
                    style={styles.eyeIcon}
                    onPress={toggleShowPassword}
                  />
                </View>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity style={styles.boxes}>
                <View style={styles.text}>
                  <TextInput
                    secureTextEntry={!showPass}
                    style={styles.textInput}
                    onChangeText={(textInput) => setVerPass(textInput)}
                    value={verPass}
                    placeholderTextColor={themeColors.grey}
                    placeholder="Confirm New Password"
                  />
                  <MaterialCommunityIcons
                    name={showPass ? 'eye-off' : 'eye'}
                    size={24}
                    color={themeColors.grey}
                    style={styles.eyeIcon}
                    onPress={toggleShowPassword}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={{ marginTop: responsiveHeight(4) }}>
          <TouchableOpacity activeOpacity={0.9} onPress={setUserData} style={styles.saveButton}>
            <Text style={styles.buttonText}>Save Changes</Text>
          </TouchableOpacity>
        </View>
      </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default ForgotPassword;
