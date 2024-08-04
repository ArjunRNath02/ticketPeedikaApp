/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, { useContext, useRef, useState } from 'react';
import { View, StatusBar, StyleSheet, ScrollView, ImageBackground, RefreshControl } from 'react-native';
import { FONTFAMILY } from '../../../themeComponents/theme';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import NowShowing from '../Components/NowShowing';
import PopularMovies from '../Components/PopularMovies';
import UpComing from '../Components/UpComing';
import LinearGradient from 'react-native-linear-gradient';
import ThemeContext from '../../SettingScreen/Components/ThemeContext';

const Home = () => {
  const { themeColors, background } = useContext(ThemeContext);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: themeColors.secondary,
      paddingBottom: responsiveHeight(13),
    },
    headerMovie: {
      fontSize: responsiveFontSize(2),
      color: themeColors.text,
      fontFamily: FONTFAMILY.poppins_semibold,
      left: responsiveWidth(3),
    },
  });

  const [refreshing, setRefreshing] = useState(false);
  const nowShowingRef = useRef<any>(); // Create a ref for NowShowing component
  const popularMoviesRef = useRef<any>();
  const upComingRef = useRef<any>();
  const onRefresh = () => {
    if (nowShowingRef.current) {
      nowShowingRef.current.fetchNowShowingMovies(); // Call fetchData function from NowShowing component ref
    }
    if (popularMoviesRef.current) {
      popularMoviesRef.current.fetchPopularMovies(); // Call fetchData function from PopularMovies component ref
    }
    if (upComingRef.current) {
      upComingRef.current.fetchUpComingMovies(); // Call fetchData function from UpComing component ref
    }
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  return (
    <ScrollView
      style={styles.container}
      bounces={false} showsVerticalScrollIndicator={false}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      <StatusBar hidden />
      <ImageBackground source={background} blurRadius={0}>
        <LinearGradient colors={[themeColors.linear, themeColors.linear]}>
          <View>
            <View style={{ paddingTop: 32 }}>
              <NowShowing ref={nowShowingRef} />
            </View>
            <View style={{ paddingHorizontal: responsiveWidth(2.5) }}>
              <View style={{ height: responsiveHeight(37) }}>
                <View style={{ paddingLeft: responsiveWidth(1) }}>
                  <PopularMovies ref={popularMoviesRef} />
                </View>
              </View>
              <View style={{ paddingBottom: responsiveHeight(5) }}>
                <View style={{ height: responsiveHeight(42) }}>
                  <View style={{ paddingLeft: responsiveWidth(1) }}>
                    <UpComing ref={upComingRef} />
                  </View>
                </View>
              </View>
            </View>
          </View>
        </LinearGradient>
      </ImageBackground>
    </ScrollView>
  );
};

export default Home;
