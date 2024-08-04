/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable eqeqeq */
/* eslint-disable react-native/no-inline-styles */
import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ToastAndroid,
  ScrollView,
  Image,
  Animated,
  Easing, RefreshControl,
} from 'react-native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { TheatreCity } from '../../themeComponents/Date';
import { useNavigation } from '@react-navigation/native';
import { FONTFAMILY } from '../../themeComponents/theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AppHeader from '../../themeComponents/AppHeader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ThemeContext from '../SettingScreen/Components/ThemeContext';


const generateDate = () => {
  // MovieDates Generation
  const date = new Date();
  let weekday = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];
  let weekdays = [];
  const year = date.getFullYear();
  const currDate = date.getDate();
  for (let i = 0; i < 7; i++) {
    let tempDate = {
      date: new Date(date.getTime() + i * 24 * 60 * 60 * 1000).getDate(),
      day: weekday[new Date(date.getTime() + i * 24 * 60 * 60 * 1000).getDay()],
    };
    weekdays.push(tempDate);
  }
  return weekdays;
};

const getDate = () => {
  // Day, Month, Year Generation
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const currDate = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const Month = date.toLocaleString('default', { month: 'long' });
  return { year, month, currDate, hours, minutes, Month };
};

const BookingDetails = ({ route }: any) => {
  const { themeColors, background, highlightColor } = useContext(ThemeContext);

  const styles = StyleSheet.create({
    dateContainer: {
      width: responsiveWidth(22),
      height: responsiveHeight(14),
      borderRadius: 40,
      alignItems: 'center',
      justifyContent: 'center',
      marginHorizontal: responsiveWidth(2.5),
      right: responsiveWidth(4),
      backgroundColor: themeColors.blur,
    },
    theatreContainer: {
      height: responsiveHeight(20),
      width: responsiveWidth(88),
      alignSelf: 'center',
      marginBottom: responsiveHeight(2),
      paddingHorizontal: responsiveWidth(4),
      paddingVertical: responsiveHeight(2),
      borderRadius: 25,
      backgroundColor: themeColors.blur,
    },
    theatreNameContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: responsiveHeight(1),
    },
    theatreNameText: {
      fontFamily: FONTFAMILY.poppins_semibold,
      fontSize: responsiveHeight(2),
      color: themeColors.pureWhite,
      marginLeft: responsiveWidth(2),
    },
    nonCancellableText: {
      fontFamily: FONTFAMILY.poppins_regular,
      fontSize: responsiveHeight(1.5),
      color: themeColors.grey,
      marginBottom: responsiveHeight(1),
    },
    timingContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: responsiveWidth(2),
    },
    timingButton: {
      backgroundColor: themeColors.blue,
      borderRadius: 10,
      alignItems: 'center',
      height: responsiveHeight(4),
      width: responsiveWidth(19),
    },
    timingText: {
      fontSize: responsiveFontSize(1.75),
      fontFamily: FONTFAMILY.poppins_semibold,
      color: themeColors.pureWhite,
      top: responsiveHeight(0.5),
    },
  });

  const [dateArray, setDateArray] = useState<any[]>(generateDate());
  const [selectedHeartIndex, setSelectedHeartIndex] = useState<any>(null);
  const { year, currDate, month, hours, minutes, Month } = getDate();
  const [selectedDateIndex, setSelectedDateIndex] = useState<any>();
  const { PosterImage, BgImage, movieID, titleName } = route.params;
  const nav = useNavigation<any>();
  const [city, setCity] = useState<string>('');
  const [SelectedDate, SetSelectedDate] = useState();
  const [animatedValue] = useState(new Animated.Value(0));
  const [refreshing, setRefreshing] = useState(false); // State for refresh control

  // Refresh function for the RefreshControl component
  const onRefresh = () => {
    // Add any logic here to refresh data
    setRefreshing(true);
    // Simulate data fetching delay
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  useEffect(() => {
    const getCityInfo = async () => {
      try {
        const city = await AsyncStorage.getItem('cityInfo');
        setCity(city || '');
      } catch (err) {
        console.log(err);
      }
    };
    getCityInfo();

    // Start animation when component mounts
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 1000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  }, [animatedValue]);

  const handleHeartPress = (index: number) => {
    setSelectedHeartIndex(index);
  };


  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{ flex: 1, backgroundColor: themeColors.secondary, height: responsiveHeight(80) }}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      <Image source={background}
        blurRadius={0} style={{ height: '100%', width: '100%', position: 'absolute' }} />
      <View style={{ paddingHorizontal: responsiveWidth(3.5), paddingVertical: responsiveHeight(3.5) }}>
        <View //header
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            height: responsiveHeight(9),
            justifyContent: 'space-between',
            paddingHorizontal: responsiveWidth(2),
          }}
        >
          <AppHeader
            name="close"
            header={titleName}
            action={() => nav.goBack()}
          />
        </View>

        <View //date,day,month
          style={{
            height: responsiveHeight(16),
            alignItems: 'center',
          }}
        >
          <FlatList
            showsHorizontalScrollIndicator={false}
            data={dateArray}
            keyExtractor={(item) => item.date}
            horizontal
            bounces={false}
            contentContainerStyle={{ paddingHorizontal: responsiveWidth(4) }}
            renderItem={({ item, index }) => {
              const scale = animatedValue.interpolate({
                inputRange: [0, 1],
                outputRange: [0.8, 1], // Adjust the scale value as needed
              });

              return (
                <TouchableOpacity onPress={() => { setSelectedDateIndex(index); SetSelectedDate(item.date); }}>
                  <Animated.View
                    style={[
                      styles.dateContainer,
                      index == selectedDateIndex
                        ? { backgroundColor: highlightColor, transform: [{ scale }] }
                        : { backgroundColor: themeColors.blur },
                    ]}
                  >
                    <Text
                      style={{
                        fontSize: responsiveFontSize(4.5),
                        color:
                          index == selectedDateIndex
                            ? themeColors.pureWhite
                            : themeColors.grey,
                        fontFamily: FONTFAMILY.poppins_semibold,
                      }}
                    >
                      {item.date}
                    </Text>
                    <Text
                      style={{
                        fontSize: responsiveHeight(1.75),
                        color:
                          index == selectedDateIndex
                            ? themeColors.pureWhite
                            : themeColors.grey,
                        fontFamily: FONTFAMILY.poppins_semibold,
                      }}
                    >
                      {item.day}
                    </Text>
                  </Animated.View>
                </TouchableOpacity>
              );
            }}
          />

        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: responsiveHeight(2) }}>
          {TheatreCity.filter((item) => item.city === city).map((item, cityIndex) =>
            item.theatres.map((multiplex, multiplexIndex) => (
              <View
                key={`${cityIndex}-${multiplexIndex}`}
                style={styles.theatreContainer}
              >
                <View //theatreName
                  style={styles.theatreNameContainer}
                >
                  <TouchableOpacity onPress={() => handleHeartPress(multiplexIndex)}>
                    <Ionicons
                      name={selectedHeartIndex === multiplexIndex ? 'heart' : 'heart-outline'}
                      size={24}
                      color={selectedHeartIndex === multiplexIndex ? themeColors.red : themeColors.red}
                    />
                  </TouchableOpacity>
                  <Text
                    style={styles.theatreNameText}
                  >
                    {multiplex.name}
                  </Text>
                </View>
                <Text
                  style={styles.nonCancellableText}
                >
                  Non-Cancellable
                </Text>
                <View style={styles.timingContainer}>
                {multiplex.timings.map((value, index) => {
                  const [timingHours, timingMinutes, meridian] = value.split(/[: ]/);
                  const timing24Hours = meridian === 'PM' ? parseInt(timingHours, 10) + 12 : parseInt(timingHours, 10);
                  const timingDate = new Date(year, month - 1, currDate, timing24Hours, parseInt(timingMinutes, 10));
                  const currentTime = new Date(year, month - 1, currDate, hours, minutes);
                  const isPast = timingDate <= currentTime;
                  return (
                    <TouchableOpacity
                      key={index}
                      style={[
                        styles.timingButton,
                        isPast ? { backgroundColor: 'transparent' } : null,
                        SelectedDate == currDate ? {} : {backgroundColor: themeColors.blue},
                      ]}
                      onPress={() => {
                        const selectedDate = new Date(year, month - 1, SelectedDate);
                        if (SelectedDate === currDate) {
                          const currentTime = new Date();
                          const timingDate = new Date(year, month - 1, currDate, timing24Hours, parseInt(timingMinutes, 10));
                          const isPast = timingDate <= currentTime;
                          if (!isPast) {
                            if (selectedDateIndex !== undefined) {
                              nav.navigate('Seat', { mall: multiplex.name, year, currDate:SelectedDate, Month, time: value, PosterImage, BgImage, movieID, titleName });
                            } else {
                              ToastAndroid.showWithGravity(
                                'Please Select Date and Time',
                                ToastAndroid.SHORT,
                                ToastAndroid.BOTTOM,
                              );
                            }
                          } else {
                            ToastAndroid.showWithGravity(
                              'Past timings cannot be selected.',
                              ToastAndroid.SHORT,
                              ToastAndroid.BOTTOM,
                            );
                          }
                        } else {
                          if (selectedDateIndex !== undefined) {
                            nav.navigate('Seat', { mall: multiplex.name, year, currDate:SelectedDate, Month, time: value, PosterImage, BgImage, movieID, titleName });
                          } else {
                            ToastAndroid.showWithGravity(
                              'Please Select Date and Time',
                              ToastAndroid.SHORT,
                              ToastAndroid.BOTTOM,
                            );
                          }
                        }
                      }}
                    >
                      {SelectedDate == currDate ? (
                      <Text style={[ styles.timingText, isPast ? { color: themeColors.grey } : { color: themeColors.pureWhite } ]}>
                        {value}</Text> ) : (
                        <Text style={[styles.timingText]}>
                          {value}</Text>)}
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          ))
        )}
      </ScrollView>
      </View>
    </ScrollView>
  );
};


export default BookingDetails;
