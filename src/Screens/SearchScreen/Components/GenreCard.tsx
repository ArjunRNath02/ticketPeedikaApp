/* eslint-disable prettier/prettier */
import { ImageBackground, StyleSheet, Text, TouchableOpacity } from 'react-native';
import React, { useContext } from 'react';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { FONTFAMILY } from '../../../themeComponents/theme';
import ThemeContext from '../../SettingScreen/Components/ThemeContext';

const GenreCard = ({ name, image, onPress }: any) => {
  const { themeColors } = useContext(ThemeContext);

  const styles = StyleSheet.create({
    container: {
      padding: responsiveWidth(2),
      alignItems: 'center',
    },
    img: {
      width: responsiveWidth(24),
      height: responsiveHeight(6),
      borderRadius: 20,
      overflow: 'hidden',
      justifyContent:'center',
      alignItems:'center',
    },
    text: {
      fontFamily: FONTFAMILY.poppins_semibold,
      fontSize: responsiveFontSize(1.65),
      color: themeColors.pureWhite,
      paddingHorizontal: responsiveWidth(2), // Added horizontal padding for text
    },
  });


  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <ImageBackground source={image} style={styles.img} blurRadius={45}>
        <Text style={styles.text}>{name}</Text>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default React.memo(GenreCard); // Memoize the component to improve performance
