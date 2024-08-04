/* eslint-disable prettier/prettier */
/* eslint-disable eqeqeq */
/* eslint-disable react-native/no-inline-styles */

import { ActivityIndicator, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native';
import React, { useContext, useState } from 'react';
import { FONTFAMILY } from '../../../themeComponents/theme';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import ThemeContext from '../../SettingScreen/Components/ThemeContext';
import axios from 'axios';

const Lsignup = ({ onCancel }: { onCancel: () => void }) => {
  const { themeColors, highlightColor } = useContext(ThemeContext);
  const [loading, setLoading] = useState(false);


  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: responsiveWidth(8),
    },
    boxBorderView: {
      width: '115%',
      justifyContent: 'center', alignSelf: 'center',
      borderWidth: 2, borderColor: highlightColor, borderRadius: 15,
      height: responsiveHeight(68),
      bottom: responsiveHeight(6),
    },
    signUpView: {
      alignSelf: 'center', justifyContent: 'center',
      marginTop: responsiveHeight(-3),
    },
    signUpText: {
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
    signInView: {
      flexDirection: 'row',
      bottom: responsiveHeight(4),
      alignSelf: 'center', justifyContent: 'center',
    },
    signInText: {
      fontFamily: FONTFAMILY.poppins_regular,
      fontSize: responsiveFontSize(1.5),
      color: themeColors.text,
    },
  });

  const [Option, setOption] = useState(0);
  const [name, setName] = useState<any>();
  const [pass, setPass] = useState<any>();
  const [mail, setMail] = useState<any>();
  const [pnum, setPnum] = useState<any>();
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
  const toggleShowPassword = () => {
    setShowPass(!showPass);
  };

  const userInfo = async () => {
    if (pass !== undefined &&
      name !== undefined &&
      mail !== undefined &&
      pnum !== undefined) {

      setLoading(true); // Show the loading indicator

      const credentials = {
        name: name,
        pass: pass,
        mail: mail,
        pnum: pnum,
      };

      const url = 'https://ticketpeedika.onrender.com/user/signup';

      try {
        const response = await axios.post(url, credentials);
        const result = response.data;
        const { status, data } = result;

        if (status === 'SUCCESS') {
          loggedIn();
          await AsyncStorage.setItem('userInfo', JSON.stringify({ data }));
          nav.navigate('SelectCity');
          ToastAndroid.showWithGravity(
            'User Registration Successful!',
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM,
          );
        } else {
          ToastAndroid.showWithGravity(
            'User Registration Failed!',
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM,
          );
        }
      } catch (error) {
        console.log(error);
        ToastAndroid.showWithGravity(
          'An error occurred. Check your network and try again',
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
        );
      } finally {
        setLoading(false); // Hide the loading indicator
      }
    } else {
      ToastAndroid.showWithGravity(
        'Please fill all boxes!',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.boxBorderView}>
        <View style={styles.signUpView}>
          <Text style={styles.signUpText}>Sign Up</Text>
        </View>
        <View  //Name
        >
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
              <FontAwesome name="user-circle" size={responsiveFontSize(3.5)} color={highlightColor} />
            </View>
            <View style={styles.text}>
              <TextInput
                style={styles.textInput}
                onChangeText={(textInput) => setName(textInput)}
                value={name}
                placeholderTextColor={themeColors.text}
                placeholder="Enter your name" />
            </View>
          </TouchableOpacity>
        </View>

        <View  //Mail
        >
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
              <MaterialCommunityIcons name="gmail" size={responsiveFontSize(3.5)} color={highlightColor} />
            </View>
            <View style={styles.text}>
              <TextInput
                style={styles.textInput}
                onChangeText={(textInput) => setMail(textInput)}
                value={mail}
                placeholderTextColor={themeColors.text}
                placeholder="Enter e-mail address" />
            </View>
          </TouchableOpacity>
        </View>

        <View  //NumberPhone
        >
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              setOption(2);
            }}
            style={[
              styles.boxes,
              Option == 2 ? { borderColor: highlightColor, borderWidth: 3 }
                : { borderColor: themeColors.blur, borderWidth: 3 }]}>
            <View style={styles.icon}>
              <MaterialCommunityIcons name="phone" size={responsiveFontSize(3.5)} color={highlightColor} />
            </View>
            <View style={styles.text}>
              <TextInput
                style={styles.textInput}
                onChangeText={(textInput) => setPnum(textInput)}
                value={pnum}
                placeholderTextColor={themeColors.text}
                keyboardType="numeric"
                placeholder="Enter Phone Number" />
            </View>
          </TouchableOpacity>
        </View>

        <View   //Password
        >
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              setOption(4);
            }}
            style={[
              styles.boxes,
              Option == 4 ? { borderColor: highlightColor, borderWidth: 3 }
                : { borderColor: themeColors.blur, borderWidth: 3 }]}>
            <View style={styles.icon}>
              <MaterialCommunityIcons name="key" size={responsiveFontSize(3.5)} color={highlightColor} />
            </View>
            <View style={styles.text}>
              <TextInput
                secureTextEntry={!showPass}
                style={styles.textInput}
                onChangeText={(textInput) => setPass(textInput)}
                value={pass}
                placeholderTextColor={themeColors.text}
                placeholder="Enter Password" />
              <MaterialCommunityIcons
                name={showPass ? 'eye-off' : 'eye'}
                size={responsiveFontSize(3.5)} color={themeColors.grey}
                style={styles.Eicon}
                onPress={toggleShowPassword}
              />
            </View>
          </TouchableOpacity>
        </View>

        <View  //SubmitBox
        >
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={userInfo}
            style={styles.Lbox}>
            {loading ? ( // Conditionally render based on loading state
            <ActivityIndicator size="large" color={themeColors.pureWhite} />
          ) : (
            <Text style={styles.LastText}>Create Account</Text>
          )}
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.signInView}>
        <Text style={styles.signInText}>Already have an account?</Text>
        <TouchableOpacity onPress={onCancel}>
          <Text style={[styles.signInText, { color: highlightColor, fontFamily: FONTFAMILY.poppins_semibold }]}>
            {' '}Log In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Lsignup;
