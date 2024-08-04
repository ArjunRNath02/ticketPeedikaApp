/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import ThemeContext from '../SettingScreen/Components/ThemeContext';

const SuccessfulPay = () => {
    const { themeColors, background, highlightColor } = useContext(ThemeContext);

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: themeColors.secondary,
        },
        imgBox: {
            alignItems: 'center',
        },
        imgtext: {
            color: highlightColor,
            fontFamily: 'Poppins-SemiBold',
            fontSize: 26,
            marginTop: 20,
        },
        ticket: {
            height: responsiveHeight(30),
            width: responsiveWidth(100),
        },
        button: {
            marginTop: 30,
            paddingVertical: 10,
            paddingHorizontal: 20,
            backgroundColor: highlightColor,
            borderRadius: 10,
        },
        buttonText: {
            color: themeColors.pureWhite,
            fontFamily: 'Poppins-SemiBold',
            fontSize: 18,
        },
    });

    const nav = useNavigation<any>();

    return (
        <View style={styles.container}>
            <ImageBackground source={background}
                blurRadius={0} style={{
                    flex: 1, justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <View style={styles.imgBox}>
                    <LottieView
                        source={require('../../assets/animations/anm.json')}
                        loop={true}
                        autoPlay
                        style={styles.ticket}
                    />
                    <Text style={styles.imgtext}>Payment Successful!</Text>
                </View>
                <TouchableOpacity onPress={() => {nav.navigate('Tab');}} style={styles.button}>
                    <Text style={styles.buttonText}>Go Home</Text>
                </TouchableOpacity>
            </ImageBackground>
        </View >
    );
};

export default SuccessfulPay;
