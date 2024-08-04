/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, { memo, useCallback, useContext } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { FONTFAMILY } from '../../../themeComponents/theme';
import { responsiveWidth, responsiveHeight } from 'react-native-responsive-dimensions';
import ThemeContext from '../../SettingScreen/Components/ThemeContext';

interface CityIconProps {
  cardFunction: () => void;
  img: any; // Adjust the type of img according to your requirement
  color: string;
  name: string;
}

const CityIcon = memo((props: CityIconProps) => {
  const { cardFunction, img, color, name } = props;
  const { themeColors } = useContext(ThemeContext);

  // Memoize the onPress function using useCallback
  const handlePress = useCallback(() => {
    cardFunction();
  }, [cardFunction]);

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={{
        flexDirection: 'column',
        width: responsiveWidth(16), // Adjust width responsively
        height: responsiveHeight(8), // Adjust height responsively
        top: responsiveHeight(1), // Adjust top position responsively
        paddingLeft: responsiveWidth(6), // Adjust padding left responsively
        alignContent: 'center',
      }}>
      <Image
        source={img}
        style={{ height: responsiveHeight(7), width: responsiveHeight(7), tintColor: color }}
      />
      <View style={{ width: responsiveWidth(18), top: responsiveHeight(0.5), alignItems: 'center' }}>
        <Text
          style={{
            fontSize: responsiveWidth(2), // Adjust font size responsively
            fontFamily: FONTFAMILY.poppins_semibold,
            color: themeColors.text, right: responsiveWidth(2),
          }}>
          {name}
        </Text>
      </View>
    </TouchableOpacity>
  );
});

export default CityIcon;
