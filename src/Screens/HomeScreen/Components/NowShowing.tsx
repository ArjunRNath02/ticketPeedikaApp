/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  View,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
  Animated, Image,
  Text,
} from 'react-native';
import React, { forwardRef, useCallback, useContext, useEffect, useImperativeHandle, useRef, useState } from 'react';
import MovieCard from './MovieCard';
import { useNavigation } from '@react-navigation/native';
import { nowShowing, baseImagePath } from '../../../api/apiCalls';
import { FONTFAMILY } from '../../../themeComponents/theme';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import LinearGradient from 'react-native-linear-gradient';
import Header from './Header';
import { movieNotFound } from '../../../themeComponents/Date';
import ThemeContext from '../../SettingScreen/Components/ThemeContext';

const { width, height } = Dimensions.get('window');
const ITEM_SIZE = width * 0.55;
const SPACING = 10;
const SPACER_ITEM_SIZE = (width - ITEM_SIZE + 2) / 2;
const BACKDROP_HEIGHT = height * 0.6;

const Backdrop = ({ movies, scrollX }: any) => {
  const { themeColors } = useContext(ThemeContext);
  return (
    <View style={{ position: 'absolute', width, height: BACKDROP_HEIGHT, bottom: responsiveHeight(25) }}>
      <FlatList
        data={movies}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => `${item.key}-${index}`} // Ensure unique keys
        removeClippedSubviews={false}
        contentContainerStyle={{ width, height: BACKDROP_HEIGHT }}
        renderItem={({ item, index }) => {
          const imageUrl = item.backdrop_path
            ? baseImagePath('w780', item.backdrop_path)
            : item.poster_path
              ? baseImagePath('w780', item.poster_path)
              : null;

          if (!imageUrl) {
            return null;
          }
          const translateX = scrollX.interpolate({
            inputRange: [(index - 1) * ITEM_SIZE, index * ITEM_SIZE],
            outputRange: [0, width],
          });
          return (
            <Animated.View
              key={`${item.key}-${index}`} // Ensure unique keys
              removeClippedSubviews={false}
              style={{
                position: 'absolute',
                left: responsiveWidth(0),
                transform: [{ translateX }],
                width,
                height: BACKDROP_HEIGHT,
                overflow: 'hidden',
              }}
            >
              <Image
                source={{ uri: imageUrl }}
                style={{ flex: 1, width, height: BACKDROP_HEIGHT }}
                resizeMode="cover"
                blurRadius={4}
              />
            </Animated.View>
          );
        }}
      />
      <LinearGradient
        colors={['transparent', themeColors.linear]}
        style={{
          height: BACKDROP_HEIGHT,
          width,
          position: 'absolute',
          bottom: responsiveWidth(0),
        }}
      />
    </View>
  );
};


const NowShowing = forwardRef((props, ref) => {
  const { themeColors, highlightColor } = useContext(ThemeContext);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    scrollViewContainer: {
      flexGrow: 1,
    },
    loadingContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    flatlistView: {
      marginHorizontal: SPACING, padding: SPACING * 4,
      alignItems: 'center', borderRadius: 30,
      backgroundColor: 'transparent',
      elevation: 0, shadowColor: themeColors.text,
    },
    headerMovie: {
      color: themeColors.text,
      fontFamily: FONTFAMILY.poppins_semibold,
      bottom: responsiveHeight(1.5),
      fontSize: responsiveFontSize(2.3),
      left: responsiveWidth(5),
    },
  });


  const [nowShowingList, setNowShowingList] = useState<any>(undefined);
  const [loading, setLoading] = useState(true); // State for activity loader
  const nav = useNavigation<any>();
  const scrollX = React.useRef(new Animated.Value(0)).current;

  const fetchNowShowingMovies = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(nowShowing);
      const json = await response.json();
      if (json && json.results && json.results.length > 0) {
        setNowShowingList([{ key: 'left-spacer' }, ...json.results, { key: 'right-spacer' }]);
      } else {
        console.error('No data found in nowShowing');
      }
    } catch (error) {
      console.error('Error fetching nowShowingList', error);
    } finally {
      setLoading(false);
    }
  },[]);

  useImperativeHandle(ref, () => ({
    fetchNowShowingMovies, // Expose fetchNowShowingMovies function to parent component using ref
  }));

  useEffect(() => {
    fetchNowShowingMovies(); // Fetch data on component mount
  }, [fetchNowShowingMovies]);

  if (loading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color={highlightColor} />
      </View>
    );
  }



  return (
    <View style={styles.container}>
      <Backdrop movies={nowShowingList} scrollX={scrollX} />
      <Header />
      <Text style={styles.headerMovie}>
        Now Showing
      </Text>
      <Animated.FlatList
        contentContainerStyle={{ alignItems: 'center', bottom: responsiveHeight(6) }}
        horizontal
        showsHorizontalScrollIndicator={false}
        data={nowShowingList}
        // Remove initialScrollIndex and add getItemLayout
        getItemLayout={(data, index) => ({
          length: ITEM_SIZE,
          offset: ITEM_SIZE * index,
          index,
        })}
        initialScrollIndex={3}
        snapToInterval={ITEM_SIZE}
        decelerationRate={0}
        bounces={false}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], { useNativeDriver: true })}
        scrollEventThrottle={22}
        keyExtractor={(item: any, index: number) => (item.id ? item.id.toString() : index.toString())} // Handle undefined item.id
        renderItem={({ item, index }) => {
          if (!item.poster_path) {
            return <View style={{ width: SPACER_ITEM_SIZE }} />;
          }
          const inputRange = [(index - 2) * ITEM_SIZE, (index - 1) * ITEM_SIZE, (index) * ITEM_SIZE];
          const translateY = scrollX.interpolate({
            inputRange, outputRange: [0, -50, 0],
          });
          return (
            <View style={{ top: responsiveHeight(2), width: ITEM_SIZE, alignItems: 'center', marginBottom: responsiveHeight(-3.25) }}>
              <Animated.View
                style={[
                  styles.flatlistView,
                  {
                    transform: [
                      {
                        scale: scrollX.interpolate({
                          inputRange: [
                            (index - 2) * ITEM_SIZE, // Movie to the left
                            (index - 1) * ITEM_SIZE, // Movie in the center
                            (index) * ITEM_SIZE, // Movie to the right
                          ],
                          outputRange: [0.7, 1, 0.7], // Adjust these values for the desired scaling effect
                          extrapolate: 'clamp', // Ensures the scaling stays within the defined input range
                        }),
                      },
                    ],
                  },
                ]}
              >
                <MovieCard
                  cardFunction={() => {
                    nav.push('MovieDetails', { movieid: item.id });
                  }}
                  title={item.title}
                  imagePath={item.poster_path != null ? baseImagePath('w780', item.poster_path) : movieNotFound}
                  vote_average={item.vote_average.toFixed(1)}
                  vote_count={item.vote_count}
                  largerSize={NowShowing} // Pass the largerSize prop
                />
              </Animated.View>
            </View>
          );
        }}
      />
    </View>
  );
});

export default NowShowing;
