/* eslint-disable prettier/prettier */
import React, { useContext } from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import CustomIcon from '../../../themeComponents/CustomIcon';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import ThemeContext from '../../SettingScreen/Components/ThemeContext';

const SearchCity = (props: any) => {
  const { themeColors,highlightColor } = useContext(ThemeContext);
  const styles = StyleSheet.create({
    container: {
      borderRadius: 30,
      backgroundColor: themeColors.blur,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      top: responsiveHeight(1.5),
      alignSelf: 'center',
    },
    iconContainer: {
      left: responsiveWidth(45),
      bottom: responsiveHeight(1.5),
    },
    icon: {
      position: 'absolute',
      right: responsiveWidth(10),
      top: responsiveHeight(-0.25),
    },
  });

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          height: responsiveHeight(6),
          width: responsiveWidth(80),
        },
      ]}
      onPress={props.cardFunction}>
      <View style={styles.iconContainer}>
        <CustomIcon
          name="search"
          size={27}
          color={highlightColor}
          style={styles.icon}
        />
      </View>
    </TouchableOpacity>
  );
};

export default SearchCity;
