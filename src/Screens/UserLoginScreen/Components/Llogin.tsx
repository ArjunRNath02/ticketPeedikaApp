/* eslint-disable prettier/prettier */
/* eslint-disable eqeqeq */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native';
import { FONTFAMILY } from '../../../themeComponents/theme';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import ThemeContext from '../../SettingScreen/Components/ThemeContext';
import axios from 'axios';

const Llogin = ({ onSignup }: { onSignup: () => void }) => {
  const { themeColors, highlightColor } = useContext(ThemeContext);
  const [loading, setLoading] = useState(false);
  const [Option, setOption] = useState(0);


  const [newName, setnewName] = useState<any>();
  const [newPass, setnewPass] = useState<any>();
  const [showPass, setShowPass] = useState(false);
  const nav = useNavigation<any>();

  const loggedIn = async () => {
    try {
      const value = await AsyncStorage.getItem('loggedIn');
      if (value !== 'true') {
        await AsyncStorage.setItem('loggedIn', 'true');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogin = () => {
    setLoading(true); // Set loading to true when login is initiated

    const credentials = {
      name: newName,
      pass: newPass,
    };

    if (!credentials.name || !credentials.pass) {
      setLoading(false); // Set loading to false if validation fails

      ToastAndroid.showWithGravity(
        'Please Enter Username and Password',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
      );
      return;
    }

    const url = 'https://ticketpeedika.onrender.com/user/signin';

    axios.post(url, credentials)
      .then(async (response) => {
        const result = response.data;
        const { status, data } = result;

        if (status !== 'SUCCESS') {
          setLoading(false); // Set loading to false if login fails

          ToastAndroid.showWithGravity(
            'Incorrect Username or Password',
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM
          );
        } else {
          if (data) {
            loggedIn();
            await AsyncStorage.setItem('userInfo', JSON.stringify({data}));
            setLoading(false); // Set loading to false after successful login
            nav.navigate('Tab');
          } else {
            console.log('User data is undefined');
            setLoading(false); // Set loading to false if user data is undefined

            ToastAndroid.showWithGravity(
              'An error occurred while logging in. Please try again.',
              ToastAndroid.SHORT,
              ToastAndroid.BOTTOM
            );
          }
       } }).catch(error => {
          console.log(error);
          setLoading(false); // Set loading to false if an error occurs

          ToastAndroid.showWithGravity(
            'An error occurred . Check your network and try again',
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM
          );
        });
  };

  const toggleShowPassword = () => {
    setShowPass(!showPass);
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: responsiveWidth(8),
    },
    boxBorderView: {
      width: '115%',
      justifyContent: 'center', alignSelf: 'center',
      borderWidth: 2, borderColor: highlightColor, borderRadius: 15,
      height: responsiveHeight(50),
    },
    signInView: {
      alignSelf: 'center', justifyContent: 'center',
      marginTop: responsiveHeight(2),
    },
    signInText: {
      fontFamily: FONTFAMILY.poppins_semibold,
      fontSize: responsiveFontSize(3.3),
      color: themeColors.text,
    },
    boxes: {
      height: responsiveHeight(7.5),
      width: '88%',
      alignSelf: 'center',
      borderRadius: responsiveHeight(1),
      backgroundColor: themeColors.Grad,
      marginBottom: responsiveHeight(4),
      flexDirection: 'row',
      alignItems: 'center', top: responsiveHeight(3),
    },
    icon: {
      width: responsiveHeight(7),
      height: responsiveHeight(7),
      alignItems: 'center',
      justifyContent: 'center',
      borderTopLeftRadius: responsiveHeight(3),
      borderBottomLeftRadius: responsiveHeight(3),
    },
    text: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      marginLeft: responsiveWidth(3),
    },
    textInput: {
      flex: 1,
      fontFamily: FONTFAMILY.poppins_regular,
      fontSize: responsiveHeight(1.8),
      color: themeColors.text,
    },
    Eicon: {
      right: responsiveWidth(4),
    },
    LastText: {
      fontSize: responsiveHeight(2.5),
      fontFamily: FONTFAMILY.poppins_semibold,
      color: themeColors.pureWhite,
    },
    Lbox: {
      height: responsiveHeight(7),
      width: '88%',
      alignSelf: 'center',
      borderRadius: responsiveHeight(1),
      top: responsiveHeight(3),
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: highlightColor,
    },
    forText: {
      fontSize: responsiveHeight(1.8),
      fontFamily: FONTFAMILY.poppins_semibold,
      color: themeColors.text,
    },
    forBox: {
      alignSelf: 'flex-end',
      marginRight: responsiveHeight(2.5),
    },
    signUpView: {
      flexDirection: 'row',
      marginTop: responsiveHeight(2),
      alignSelf: 'center', justifyContent: 'center',
    },
    signUpText: {
      fontFamily: FONTFAMILY.poppins_regular,
      fontSize: responsiveFontSize(1.5),
      color: themeColors.text,
    },
  });


  return (
    <View style={styles.container}>
      <View style={styles.boxBorderView}>
        <View style={styles.signInView}>
          <Text style={styles.signInText}>Log In</Text>
        </View>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            setOption(0);
          }}
          style={[
            styles.boxes,
            Option == 0 ? { borderColor: highlightColor, borderWidth: 3 }
              : { borderColor: themeColors.blur, borderWidth: 3 }]}>
          <View style={styles.icon}>
            <FontAwesome name="user-circle" size={responsiveHeight(3.5)} color={highlightColor} style={{ marginLeft: responsiveWidth(2) }} />
          </View>
          <View style={styles.text}>
            <TextInput
              style={styles.textInput}
              onChangeText={(textInput) => setnewName(textInput)}
              value={newName}
              placeholderTextColor={themeColors.text}
              placeholder="Username"
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            setOption(1);
          }}
          style={[
            styles.boxes,
            Option == 1 ? { borderColor: highlightColor, borderWidth: 3 }
              : { borderColor: themeColors.blur, borderWidth: 3 }]}>
          <View style={styles.icon}>
            <MaterialCommunityIcons name="key" size={responsiveHeight(4)} color={highlightColor} style={{ marginLeft: responsiveWidth(2) }} />
          </View>
          <View style={styles.text}>
            <TextInput
              secureTextEntry={!showPass}
              style={styles.textInput}
              onChangeText={(textInput) => setnewPass(textInput)}
              value={newPass}
              placeholderTextColor={themeColors.text}
              placeholder="Password"
            />
            <MaterialCommunityIcons
              name={showPass ? 'eye-off' : 'eye'}
              size={responsiveHeight(3.2)}
              color={themeColors.grey}
              style={styles.Eicon}
              onPress={toggleShowPassword}
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => nav.navigate('ForgotPassword')} style={styles.forBox}>
          <Text style={styles.forText}>Forgot Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity activeOpacity={0.9} onPress={handleLogin} style={styles.Lbox}>
          {loading ? ( // Conditionally render based on loading state
            <ActivityIndicator size="large" color={themeColors.pureWhite} />
          ) : (
            <Text style={styles.LastText}>Login</Text>
          )}
        </TouchableOpacity>
      </View>
      <View style={styles.signUpView}>
        <Text style={styles.signUpText}>Don't have an account?</Text>
        <TouchableOpacity onPress={onSignup}>
          <Text style={[styles.signUpText, { color: highlightColor, fontFamily: FONTFAMILY.poppins_semibold }]}>
            {' '}Create Account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};


export default Llogin;
