/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import { View } from 'react-native';
import React from 'react';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

const ColorList = (props: any) => {
  return (
    <View
      style={{
        borderRadius: 50, backgroundColor: props.Color,
        height: responsiveHeight(4), width: responsiveWidth(8),
      }} />
  );
};

export default ColorList;
