/* eslint-disable prettier/prettier */
import React, { useContext } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import CustomIcon from '../../../themeComponents/CustomIcon';
import { FONTFAMILY } from '../../../themeComponents/theme';
import { useNavigation } from '@react-navigation/native';
import { responsiveHeight } from 'react-native-responsive-dimensions';
import ThemeContext from './ThemeContext';

const SettingComponent = ({
  name,
  mail,
  pass,
  pnum,
  Screen,
  icon,
  heading,
  subheading,
  subtitle,
}: any) => {
  const nav = useNavigation<any>();
  const { themeColors,highlightColor } = useContext(ThemeContext);

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
    },
    settingContainer: {
      flex: 1,
    },
    iconStyle: {
      color: highlightColor,
      fontSize: 24,
      paddingHorizontal: 20,
    },
    iconBG: {
      justifyContent: 'center',
    },
    title: {
      fontFamily: FONTFAMILY.poppins_medium,
      fontSize: 18,
      color: themeColors.text,
    },
    subtitle: {
      fontFamily: FONTFAMILY.poppins_regular,
      fontSize: 14,
      color: themeColors.grey,
    },
  });

  return (
    <TouchableOpacity
      style={[styles.container, { paddingVertical: responsiveHeight(2) }]}
      onPress={() => {
        nav.navigate(Screen, { name, mail, pass, pnum });
      }}>
      <View>
        <CustomIcon name={icon} style={styles.iconStyle} />
      </View>
      <View style={styles.settingContainer}>
        <Text style={styles.title}>{heading}</Text>
        <Text style={styles.subtitle}>{subheading}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
      <View style={styles.iconBG}>
        <CustomIcon name={'arrow-right'} style={styles.iconStyle} />
      </View>
    </TouchableOpacity>
  );
};

export default React.memo(SettingComponent);
