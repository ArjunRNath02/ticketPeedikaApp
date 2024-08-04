/* eslint-disable prettier/prettier */
import React, { useContext } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FONTFAMILY } from '../../../themeComponents/theme';
import ThemeContext from '../../SettingScreen/Components/ThemeContext';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

const CastCard = (props:any) => {
  const { themeColors } = useContext(ThemeContext);

  const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
    },
    cardImage: {
      aspectRatio: 1920 / 2880,
      borderRadius: 10,
    },
    textContainer: {
      alignSelf: 'stretch',
      marginTop: responsiveHeight(0.5),
      paddingHorizontal: responsiveWidth(0.75),
    },
    title: {
      fontSize: responsiveFontSize(1.45),
      color: themeColors.text,
      fontFamily: FONTFAMILY.poppins_regular,
    },
    subtitle: {
      fontSize: responsiveFontSize(1.22),
      color: themeColors.text,
      fontFamily: FONTFAMILY.poppins_regular,
    },
  });

  const {
    cardWidth,
    cardFunction,
    imagePath,
    title,
    subtitle,
    shouldMarginatedAtEnd,
    isFirst,
    isLast,
  } = props;

  const marginStyle = shouldMarginatedAtEnd
    ? isFirst
      ? { marginLeft: 24 }
      : isLast
      ? { marginRight: 24 }
      : {}
    : {};

  return (
    <TouchableOpacity
      style={[styles.container, marginStyle, { maxWidth: cardWidth }]}
      onPress={cardFunction}>
      <Image source={{ uri: imagePath }} style={[styles.cardImage, { width: cardWidth }]} />
      <View style={styles.textContainer}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        <Text style={styles.subtitle} numberOfLines={1}>
          {subtitle}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default CastCard;
