/* eslint-disable prettier/prettier */
import React, { useContext } from 'react';
import {Text, StyleSheet} from 'react-native';
import { FONTFAMILY } from '../../../themeComponents/theme';
import ThemeContext from '../../SettingScreen/Components/ThemeContext';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';


const CategoryHeader = (props: any) => {
  const { themeColors } = useContext(ThemeContext);

  const styles = StyleSheet.create({
    textEdit: {
      fontSize: responsiveFontSize(2.25),
      color: themeColors.text,
      paddingHorizontal: responsiveWidth(5.5),
      paddingVertical: responsiveHeight(2.25),
      fontFamily:FONTFAMILY.poppins_regular,
      top:responsiveHeight(1.5),
    },
  });

  return <Text style={styles.textEdit}>{props.title}</Text>;
};



export default CategoryHeader;
