/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect, useContext } from 'react';
import { View, Animated, Text, Image, Easing } from 'react-native';
import AnimationsLogo from './AnimationsLogo';
import { FONTFAMILY } from '../../../themeComponents/theme';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { mainLogo } from '../../../themeComponents/Date';
import ThemeContext from '../../SettingScreen/Components/ThemeContext';


const AnimatedIcon = () => {
  const { themeColors,background,highlightColor } = useContext(ThemeContext);
  const [iconSize] = useState(new Animated.Value(7)); // Initial icon size
  const [appNameOpacity] = useState(new Animated.Value(0)); // Initial opacity for app name
  const [showLogo, setShowLogo] = useState(false); // State to control the logo visibility
  const [logoOpacity] = useState(new Animated.Value(0)); // Initial opacity for AnimationsLogo component

  useEffect(() => {
    const animateIcon = Animated.timing(iconSize, {
      toValue: 3, // Final icon size
      duration: 800, // Animation duration in milliseconds
      easing: Easing.inOut(Easing.ease), // Use easing function for smoother transition
      useNativeDriver: false, // Ensure useNativeDriver is set to false for certain animations
    });

    const animateAppName = Animated.timing(appNameOpacity, {
      toValue: 1, // Final opacity for app name
      duration: 1000,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: false, // Ensure useNativeDriver is set to false for certain animations
    });

    const animateLogo = Animated.timing(logoOpacity, {
      toValue: 1,
      duration: 1000,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: false,
    });

    // Animation sequence: shrink icon, then fade in app name
    Animated.sequence([animateIcon, animateAppName]).start(() => {
      setTimeout(() => {
        setShowLogo(true);
        animateLogo.start();
      }, 250);
    });

    return () => {
      animateIcon.stop();
      animateAppName.stop();
      animateLogo.stop();
    };

  }, [appNameOpacity, iconSize, logoOpacity]);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: themeColors.secondary,
      }}>
      <Image
        source={background} blurRadius={0}
        style={{ height: '120%', position: 'absolute' }}
      />
      <Animated.View
        style={{
          transform: [{ scale: iconSize }],
          position: 'absolute',
          bottom: 500,
        }}>
        <Image
          source={mainLogo}
          style={{
            height: responsiveHeight(5),
            width: responsiveWidth(10),
            tintColor: highlightColor,
            alignSelf: 'center',
          }}
        />
      </Animated.View>
      {showLogo && (
        <Animated.View
          style={{
            opacity: appNameOpacity,
            top: responsiveHeight(45),
            position: 'absolute',
          }}>
          <Animated.View style={{ opacity: logoOpacity, alignItems: 'center' }}>
            <AnimationsLogo />
            <Text
              style={{
                color: themeColors.text,
                fontFamily: FONTFAMILY.poppins_bold,
                fontSize: responsiveFontSize(1.2),
                marginTop: responsiveHeight(2),
              }}>
              Your One-Stop Shop for Movie Magic!
            </Text>
          </Animated.View>
        </Animated.View>
      )}
    </View>
  );
};

export default AnimatedIcon;
