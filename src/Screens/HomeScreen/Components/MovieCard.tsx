/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import { View, Text, TouchableOpacity, Image } from 'react-native';
import React, { memo, useContext, useMemo } from 'react';
import { FONTFAMILY } from '../../../themeComponents/theme';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import CustomIcon from '../../../themeComponents/CustomIcon';
import { StyleSheet } from 'react-native';
import ThemeContext from '../../SettingScreen/Components/ThemeContext';

interface MovieCardProps {
  cardFunction: () => void;
  title: string;
  imagePath: string;
  vote_average?: number;
  vote_count?: number;
  largerSize: any;
  smallerSize?: boolean; // Add smallerSize prop
}

const MovieCard = memo((props: MovieCardProps) => {
  const { themeColors } = useContext(ThemeContext);

  const getStarRating = useMemo(() => {
    if (props.vote_average === undefined || props.vote_average === null) {
      return null; // Return null if vote_average is null
    }
    const maxRating = 10;
    const maxStars = 5;
    const filledStars = Math.round((props.vote_average * maxStars) / maxRating);
    const emptyStars = maxStars - filledStars;
    const stars = [];
    for (let i = 0; i < filledStars; i++) {
      stars.push(
        <CustomIcon
          key={i}
          name="star"
          size={props.largerSize ? responsiveFontSize(1.7) : responsiveFontSize(1.4)}
          color={themeColors.gold}
        />,
      );
    }
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <CustomIcon
          key={filledStars + i}
          name="star"
          size={props.largerSize ? responsiveFontSize(1.7) : responsiveFontSize(1.4)}
          color={themeColors.grey}
        />,
      );
    }
    return stars;
  }, [props.vote_average, props.largerSize, themeColors.gold, themeColors.grey]);

  const cardStyle = useMemo(() => {
    return props.largerSize ? styles.cardContainerLarger : (props.smallerSize ? styles.cardContainerSmaller : styles.cardContainer);
  }, [props.largerSize, props.smallerSize]);

  const imageStyle = useMemo(() => {
    return props.largerSize ? styles.imageLarger : (props.smallerSize ? styles.imageSmaller : styles.image);
  }, [props.largerSize, props.smallerSize]);

  const titleStyle = useMemo(() => {
    return props.largerSize ? [styles.titleText, { color: themeColors.text }] : (props.smallerSize ? [styles.titleTextSmaller, { color: themeColors.text }] : [styles.titleTextSmall, { color: themeColors.text }]);
  }, [props.largerSize, props.smallerSize, themeColors.text]);

  const ratingStyle = useMemo(() => {
    return props.largerSize ? [styles.ratingText, { color: themeColors.text }] : (props.smallerSize ? [styles.ratingTextSmaller, { color: themeColors.text }] : [styles.ratingTextSmall, { color: themeColors.text }]);
  }, [props.largerSize, props.smallerSize, themeColors.text]);

  return (
    <TouchableOpacity style={cardStyle} onPress={props.cardFunction}>
      <Image style={imageStyle} source={{ uri: props.imagePath }} />
      <View style={styles.rating}>
        <Text style={ratingStyle}>{props.vote_average} </Text>
        {getStarRating}
      </View>
      <View style={{ overflow: 'hidden', marginLeft: responsiveWidth(1.25), alignSelf: 'center' }}>
        <Text style={titleStyle}>{props.title}</Text>
      </View>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  cardContainer: {
    marginHorizontal: responsiveWidth(3),
    width: responsiveWidth(38),
    borderRadius: responsiveWidth(3),
  },
  cardContainerLarger: {
    marginHorizontal: responsiveWidth(-0.5),
    width: responsiveWidth(52),
    borderRadius: responsiveWidth(5),
  },
  cardContainerSmaller: {
    marginHorizontal: responsiveWidth(1),
    width: responsiveWidth(28),
    borderRadius: responsiveWidth(2),
  },
  rating: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: responsiveHeight(1),
  },
  titleText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: responsiveFontSize(1.4),
  },
  titleTextSmall: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: responsiveFontSize(1.2),
  },
  titleTextSmaller: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: responsiveFontSize(1),
  },
  image: {
    height: responsiveHeight(28),
    borderRadius: responsiveWidth(3),
  },
  imageLarger: {
    height: responsiveHeight(38),
    borderRadius: responsiveWidth(3),
  },
  imageSmaller: {
    height: responsiveHeight(22),
    borderRadius: responsiveWidth(2),
  },
  ratingText: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: responsiveFontSize(1.3),
    top: responsiveHeight(0.1),
  },
  ratingTextSmall: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: responsiveFontSize(1.2),
    top: responsiveHeight(0.1),
  },
  ratingTextSmaller: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: responsiveFontSize(1),
    top: responsiveHeight(0.1),
  },
});

export default MovieCard;

