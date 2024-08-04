/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import { View, Text, TouchableOpacity, Image } from 'react-native';
import React, { useContext } from 'react';
import CustomIcon from '../../../themeComponents/CustomIcon';
import { FONTFAMILY } from '../../../themeComponents/theme';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import ThemeContext from '../../SettingScreen/Components/ThemeContext';



const SearchMovieCard = (props: any) => {

  const { themeColors } = useContext(ThemeContext);

  return (
    <View
      style={{
        flex: 1,
        marginVertical: responsiveHeight(5),
        display: 'flex',
        width: responsiveWidth(82), height: responsiveHeight(13.5),
        shadowColor: themeColors.text, elevation: 0,
        backgroundColor: 'transparent', borderRadius: 15,
      }}>
      <TouchableOpacity
        onPress={() => props.cardFunction()}
        style={{
          right: responsiveWidth(0),
          flexDirection: 'row', flexGrow: 1, height: responsiveHeight(22),
        }}>
        <Image
          style={{
            height: responsiveHeight(20), width: responsiveWidth(27), borderRadius: 15,
            left: responsiveWidth(0), bottom: responsiveHeight(4),
          }}
          source={{ uri: props.imagePath }}
        />
        <View style={{ flexDirection: 'column', flexShrink: 1 }}>
          <Text
            style={{
              color: themeColors.text,
              fontSize: responsiveFontSize(1.65), fontFamily: FONTFAMILY.poppins_semibold,
              left: responsiveWidth(5), top: responsiveHeight(1.5),
            }}>
            {props.title.length > 26 ? props.title.slice(0,26) + '...' : props.title}
          </Text>

          <View style={{ flexDirection: 'column', flexShrink: 1 }}>
            <Text
              style={{
                color: themeColors.text,
                fontSize: responsiveFontSize(1.55), fontFamily: FONTFAMILY.poppins_regular,
                left: responsiveWidth(6), top: responsiveHeight(2),
              }}>
              {props.year}
            </Text>
          </View>

          <View style={{ flexDirection: 'row' }}>
            <CustomIcon name="star" size={18} color={themeColors.gold}
              style={{ left: responsiveWidth(5), top: responsiveHeight(3) }} />
            {props.vote_average !== undefined && !isNaN(props.vote_average) && (
              <Text
                style={{
                  color: themeColors.text,
                  fontSize: responsiveFontSize(1.55), fontFamily: FONTFAMILY.poppins_regular,
                  left: responsiveWidth(6), top: responsiveHeight(3),
                }}>
                {Number(props.vote_average).toFixed(1)}
              </Text>
            )}
          </View>

        </View>
      </TouchableOpacity>
    </View>
  );
};

export default SearchMovieCard;
