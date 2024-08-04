/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable eqeqeq */
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  ImageBackground,
  ToastAndroid,
  StatusBar, ScrollView,
} from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import AppHeader from '../../themeComponents/AppHeader';
import { FONTFAMILY } from '../../themeComponents/theme';
import { SeatsGold, SeatsPlat, theatreImg } from '../../themeComponents/Date';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import CustomIcon from '../../themeComponents/CustomIcon';
import { responsiveWidth, responsiveHeight, responsiveFontSize } from 'react-native-responsive-dimensions';
import ThemeContext from '../SettingScreen/Components/ThemeContext';
import axios from 'axios';


const Seat = ({ route }: any) => {
  const { mall, year, currDate, Month, time, PosterImage, BgImage, titleName } = route.params;
  const { themeColors, background, highlightColor } = useContext(ThemeContext);
  const nav = useNavigation<any>();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: themeColors.secondary,
    },
    imageBG: {
      width: '100%',
      height: 280,
      aspectRatio: 2100 / 1400,
    },
    screen: {
      width: '80%',
      bottom: responsiveHeight(12), height: responsiveHeight(5),
      alignSelf: 'center',
    },
    linearGradient: {
      height: '100%',
    },
    appHeaderContainer: {
      marginHorizontal: responsiveWidth(9),
      marginTop: responsiveHeight(5),
    },
    seatView: {
      alignSelf: 'center',
      paddingBottom: responsiveHeight(2),
      alignItems: 'center',
      gap: responsiveWidth(1.5),
    },
    radioContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: responsiveWidth(4),
    },
    radioIcon: {
      fontSize: 25,
    },
    radioText: {
      fontSize: 13,
      fontFamily: FONTFAMILY.poppins_regular,
      color: themeColors.grey,
      marginLeft: responsiveWidth(1),
      top: responsiveHeight(0.25),
    },
    seatRadioContainer: {
      flexDirection: 'row',
      marginBottom: responsiveHeight(0),
      alignItems: 'center',
      justifyContent: 'center',
      bottom: responsiveHeight(5),
    },
    PayContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      gap: responsiveWidth(7),
      bottom: responsiveHeight(1.5),
    },
    PriceBox: {
      height: responsiveHeight(9),
      backgroundColor: highlightColor,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 25,
      flexDirection: 'row',
      paddingHorizontal: responsiveWidth(8),
      marginBottom: responsiveHeight(2),
    },
    LastText: {
      color: themeColors.pureWhite,
      fontSize: 20,
      fontFamily: FONTFAMILY.poppins_bold,
      marginLeft: responsiveWidth(2),
    },
    title: {
      fontSize: responsiveFontSize(1.8),
      fontFamily: FONTFAMILY.poppins_semibold,
      color: themeColors.text,
    },
    linear: {
      height: responsiveHeight(80),
    },
  });

  const [seatsArray, setSeatsArray] = useState<string[]>([]);
  const [bookedSeats, setBookedSeats] = useState([]);

  useEffect(() => {
    const loadBookedSeats = async () => {
      try {
        const url = 'https://ticketpeedika.onrender.com/seat/get-booked-seats';
        const response = await axios.get(url);

        if (response.status === 200) {
          const filteredSeats = response.data.data.filter((seat: { date: any; month: any; year: any; mall: any; titleName: any; time: any; }) =>
            seat.date === currDate.toString() && seat.month === Month && seat.year === year.toString()
            && seat.mall === mall && seat.titleName === titleName && seat.time === time
          );

          const seats = filteredSeats.flatMap((seat: { seats: any; }) => seat.seats);
          setBookedSeats(seats);
        } else {
          console.error('Failed to load booked seats:', response.data.message);
        }
      } catch (error) {
        console.error('Error loading booked seats:', error);
      }
    };

    loadBookedSeats();
  }, [Month, currDate, mall, time, titleName, year]);


  const BookSeats = async () => {
    if (
      seatsArray.length !== 0 &&
      time !== undefined &&
      currDate !== undefined
    ) {
      try {
        await AsyncStorage.setItem(
          'ticket',
          JSON.stringify({
            seatsArray: seatsArray,
            time: time,
            currDate, Month, year,
            ticketImage: PosterImage,
            mall, amountTicket: amount,titleName,
          }),
        );
      } catch (error) {
        console.error(
          'Something went Wrong while storing in BookSeats Functions',
          error,
        );
      }
      nav.navigate('FoodDetails');
    } else {
      ToastAndroid.showWithGravity(
        'Please Select Seats',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
      );
    }
  };


  let amount = 0;
  if (seatsArray.length > 0) {
    amount = 120 * seatsArray.length;
  }

  const compareSeats = (bookedSeats: string[], SeatsGold: string[], SeatsPlat: string[]) => {
    const matchedGoldSeats = SeatsGold.filter(seat => bookedSeats.includes(seat));
    const matchedPlatSeats = SeatsPlat.filter(seat => bookedSeats.includes(seat));
    return { matchedGoldSeats, matchedPlatSeats };
  };


  const { matchedGoldSeats, matchedPlatSeats } = compareSeats(bookedSeats, SeatsGold, SeatsPlat);


  const renderSeat = ({ item }: any) => {
    const isSeatSelected = seatsArray.includes(item);
    const isMatchingSeat = matchedGoldSeats.includes(item) || matchedPlatSeats.includes(item);
    const seatStyle = {
      color: isMatchingSeat
        ? themeColors.seatBookedColor // Color for matched seats
        : isSeatSelected
          ? highlightColor // Color for selected seats
          : themeColors.seatColor, // Default color for available seats
      padding: responsiveWidth(0.5),
    };

    const onPressSeat = () => {
      if (isMatchingSeat) {
        ToastAndroid.showWithGravity(
          'Seat is already booked for this movie.',
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM
        );
      } else {
        const updatedSeats = isSeatSelected
          ? seatsArray.filter(selectedSeat => selectedSeat !== item)
          : [...seatsArray, item];
        setSeatsArray(updatedSeats);
      }
    };

    return (
      <TouchableOpacity
        onPress={onPressSeat}
        activeOpacity={0.8}
        disabled={isMatchingSeat}
      >
        <CustomIcon name="seat" size={responsiveWidth(6)} style={seatStyle} />
      </TouchableOpacity>
    );
  };


  return (
    <View style={styles.container}
    >
      <StatusBar hidden />
      <View //Header
      >
        <ImageBackground source={{ uri: BgImage }} style={styles.imageBG} blurRadius={2}>
          <LinearGradient
            colors={[themeColors.Grad, themeColors.secondary]}
            style={styles.linearGradient}
          >
            <View style={styles.appHeaderContainer}>
              <AppHeader
                name="close"
                header={mall}
                action={() => nav.goBack()}
              />
              <View style={{ marginLeft: responsiveWidth(13) }}>
                <Text style={styles.title}>{titleName}</Text>
                <Text style={styles.title}>{time}</Text>
              </View>
            </View>
          </LinearGradient>
        </ImageBackground>
      </View>
      <ImageBackground source={background}
        blurRadius={0} style={styles.linear}>
        <LinearGradient
          colors={[themeColors.secondary, themeColors.Grad]}
          style={styles.linear}>
          <View>
            <Image //Image
              source={theatreImg} tintColor={themeColors.text}
              style={styles.screen}
            />
            <View //Seats
              style={{ bottom: responsiveHeight(6), alignItems: 'center' }}
            >
              <ScrollView //SeatOrderGold
                horizontal showsHorizontalScrollIndicator={false} bounces={false}
                style={{ height: responsiveHeight(32) }}>
                <FlatList
                  style={{ width: responsiveWidth(86) }}
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={styles.seatView}
                  data={SeatsGold}
                  numColumns={12}
                  renderItem={renderSeat}
                  keyExtractor={(item) => item}
                />
              </ScrollView>
              <ScrollView //SeatOrderPlat
                horizontal showsHorizontalScrollIndicator={false} bounces={false}
                style={{ height: responsiveHeight(15) }}>
                <FlatList
                  style={{ width: responsiveWidth(86) }}
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={styles.seatView}
                  data={SeatsPlat}
                  numColumns={12}
                  renderItem={renderSeat}
                  keyExtractor={(item) => item}
                />
              </ScrollView>
            </View>
            <View //IdentifiersAvail
              style={styles.seatRadioContainer}
            >
              <View style={styles.radioContainer}>
                <CustomIcon
                  name="radio"
                  style={[styles.radioIcon, { color: themeColors.seatColor }]}
                />
                <Text style={styles.radioText}>Available</Text>
              </View>
              <View style={styles.radioContainer}>
                <CustomIcon
                  name="radio"
                  style={[styles.radioIcon, { color: themeColors.seatBookedColor }]}
                />
                <Text style={styles.radioText}>Taken</Text>
              </View>
              <View style={styles.radioContainer}>
                <CustomIcon
                  name="radio"
                  style={[styles.radioIcon, { color: highlightColor }]}
                />
                <Text style={styles.radioText}>Selected</Text>
              </View>
            </View>
            <View //PaymentBox
              style={styles.PayContainer}
            >
              <View style={styles.PriceBox}>
                <View style={{ alignItems: 'center', top: responsiveHeight(0.5) }}>
                  <Text style={{ fontSize: responsiveFontSize(1.6), fontFamily: FONTFAMILY.poppins_semibold, color: themeColors.pureWhite }}>
                    Total Price :
                  </Text>
                  <Text
                    style={{
                      fontSize: 29,
                      fontFamily: FONTFAMILY.poppins_semibold, color: themeColors.pureWhite,
                    }}
                  >
                    ₹ {amount}
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={BookSeats}
                style={{
                  backgroundColor:
                    amount != 0 ? highlightColor : themeColors.blur,
                  height: responsiveHeight(9),
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 25,
                  flexDirection: 'row',
                  paddingHorizontal: responsiveWidth(6),
                  bottom: responsiveHeight(1),
                }}
              >
                <Text style={styles.LastText}>Buy Tickets</Text>
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
};


export default Seat;
