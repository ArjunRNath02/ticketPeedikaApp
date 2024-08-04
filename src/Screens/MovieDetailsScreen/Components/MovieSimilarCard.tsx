/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import { View, Text, TouchableOpacity, Image } from 'react-native';
import React, { memo, useContext, useMemo } from 'react';
import { FONTFAMILY } from '../../../themeComponents/theme';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import ThemeContext from '../../SettingScreen/Components/ThemeContext';

interface MovieCardProps {
  cardFunction: () => void;
  title: string;
  imagePath: string;
}

const MovieSimilarCard = memo((props: MovieCardProps) => {
  const { themeColors } = useContext(ThemeContext);

  const cardStyle = useMemo(() => {
    return {
      marginHorizontal: responsiveWidth(2),
      width: responsiveWidth(33),
      borderRadius: 30,
    };
  }, []);

  const titleStyle = useMemo(() => {
    return {
      fontFamily: FONTFAMILY.poppins_semibold,
      fontSize: responsiveFontSize(1.4),
      color: themeColors.text,
    };
  }, [themeColors.text]);

  const imageStyle = useMemo(() => {
    return {
      height: responsiveHeight(23),
      borderRadius: 10,
    };
  }, []);

  const renderImage = () => {
    if (props.imagePath) {
      return <Image style={imageStyle} source={{ uri: props.imagePath }} />;
    }
  };

  return (
    <TouchableOpacity style={cardStyle} onPress={props.cardFunction}>
      {renderImage()}
      <View style={{ overflow: 'hidden', marginLeft: responsiveWidth(2) }}>
        <Text style={titleStyle}>{props.title}</Text>
      </View>
    </TouchableOpacity>
  );
});

export default MovieSimilarCard;
