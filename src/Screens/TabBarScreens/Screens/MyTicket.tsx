/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-shadow */

import React, { useState, useEffect, useRef, useContext, useCallback } from 'react';
import { View, Text, StyleSheet, Image, FlatList, ImageBackground, StatusBar, Animated, RefreshControl } from 'react-native';
import { FONTFAMILY } from '../../../themeComponents/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { responsiveWidth, responsiveHeight, responsiveFontSize } from 'react-native-responsive-dimensions';
import LinearGradient from 'react-native-linear-gradient';
import CustomIcon from '../../../themeComponents/CustomIcon';
import AppHeader from '../../../themeComponents/AppHeader';
import Foundation from 'react-native-vector-icons/Foundation';
import Fontisto from 'react-native-vector-icons/Fontisto';
import ThemeContext from '../../SettingScreen/Components/ThemeContext';

const MyTicket = ({ navigation }: any) => {
  const { themeColors, background, highlightColor } = useContext(ThemeContext);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: themeColors.secondary,
    },
    flatlistContainer: {
      justifyContent: 'center',
      height: responsiveHeight(73), gap: responsiveWidth(10),
      alignItems: 'center',
    },
    ticketContainer: {
      width: responsiveWidth(74), // Adjust width as needed
      height: responsiveHeight(73), // Adjust height as needed
      paddingHorizontal: responsiveWidth(12), justifyContent: 'center',
      marginRight: responsiveWidth(6), alignSelf: 'center',
    },
    imgBox: {
      borderRadius: 40,
      backgroundColor: highlightColor,
      height: responsiveHeight(50),
      width: responsiveWidth(68),
      alignItems: 'center',
      right: responsiveWidth(5),
    },
    ticketBG: {
      width: responsiveWidth(60),
      aspectRatio: 200 / 250,
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      overflow: 'hidden',
      justifyContent: 'flex-end',
      top: responsiveHeight(2),
    },
    dashLine: {
      borderStyle: 'dashed',
      borderTopWidth: 1, width: responsiveWidth(50),
      borderColor: highlightColor, left: responsiveWidth(4),
    },
    linearGrad: { height: '70%' },
    ticketFooter: {
      backgroundColor: highlightColor,
      width: responsiveWidth(70), // Adjust width as needed
      height: responsiveHeight(12), // Adjust height as needed
      alignItems: 'center',
      borderRadius: 40,
      right: responsiveWidth(5),
    },
    tickDate: {
      width: responsiveWidth(60),
      right: responsiveWidth(4), bottom: responsiveHeight(2),
      alignSelf: 'center', justifyContent: 'center',
    },
    dateTitle: {
      fontSize: responsiveFontSize(1.65),
      color: themeColors.pureWhite,
      fontFamily: FONTFAMILY.poppins_semibold,
    },
    subTitle: {
      fontSize: responsiveFontSize(1.65),
      color: themeColors.pureWhite,
      fontFamily: FONTFAMILY.poppins_semibold,
    },
    ticSeatContainer: {
      flexDirection: 'row',
      gap: 36,
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: 10, left: 18,
    },
    bardCodeImg: {
      height: responsiveHeight(7), width: responsiveWidth(10),
      aspectRatio: 150 / 40, top: responsiveHeight(2.5),
    },
    noTicketsText: {
      fontSize: responsiveFontSize(2),
      fontFamily: FONTFAMILY.poppins_regular,
      textAlign: 'center',
      marginTop: responsiveHeight(32),
      color: themeColors.text,
    },
    dotContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    dot: {
      width: responsiveWidth(2),
      height: responsiveHeight(1),
      borderRadius: responsiveWidth(1),
      backgroundColor: themeColors.Mgrey,
      marginHorizontal: responsiveWidth(1),
    },
    activeDot: {
      backgroundColor: highlightColor,
    },
    emptyListContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      left: responsiveWidth(25),
    },
  });

  const [tickets, setTickets] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const flatListRef = useRef<FlatList<any>>(null);
  const animatedValue = useRef(new Animated.Value(0)).current;

  const fetchTickets = useCallback(async () => {
    try {
      const storedTickets = await AsyncStorage.getItem('BookedTickets');
      if (storedTickets) {
        const parsedTickets = JSON.parse(storedTickets);
        setTickets(parsedTickets.reverse());
      }
    } catch (error) {
      console.error('Error fetching tickets:', error);
    }
  }, []);

  useEffect(() => {
    let timerId = setInterval(fetchTickets, 1000);
    return () => clearInterval(timerId);
  }, [fetchTickets]);

  useEffect(() => {
    const animate = () => {
      Animated.timing(animatedValue, {
        toValue: currentIndex,
        duration: 500,
        useNativeDriver: false,
      }).start();
    };
    animate();
  }, [animatedValue, currentIndex]);

  const renderDots = useCallback(() => {
    return tickets.map((_, index) => (
      <View key={index} style={[styles.dot, index === currentIndex ? styles.activeDot : null]} />
    ));
  }, [tickets, currentIndex, styles]);


  const renderTicketItem = useCallback(({ item }: { item: any }) => (
    <View style={styles.ticketContainer}>
      <View style={styles.imgBox}>
        <ImageBackground
          source={{ uri: item.Poster }}
          style={styles.ticketBG}>
          <LinearGradient
            colors={['transparent', highlightColor]}
            style={styles.linearGrad}
          />
        </ImageBackground>
        <View style={styles.tickDate}>
          <View style={{ flexDirection: 'row', top: responsiveHeight(3), left: responsiveWidth(7) }}>

            <View style={{ flexDirection: 'row', gap: responsiveWidth(1), right: responsiveWidth(1) }}>
              <Fontisto name="date" size={16} color={themeColors.grey} style={{ top: 2 }} />
              <Text style={styles.dateTitle}>{item.currDate}</Text>
              <Text style={styles.dateTitle}>{item.month}</Text>
            </View>

            <View style={{ flexDirection: 'row', gap: responsiveWidth(1), left: responsiveWidth(3) }}>
              <CustomIcon name="clock" size={16} color={themeColors.grey} style={{ top: 2 }} />
              <Text style={styles.dateTitle}>{item.time}</Text>
            </View>

            <View style={{ flexDirection: 'row', gap: responsiveWidth(1), left: responsiveWidth(7) }}>
              <Foundation name="bitcoin-circle" size={19} color={themeColors.grey} style={{ top: 2 }} />
              <Text style={styles.dateTitle}>₹{item.amount}</Text>
            </View>
          </View>

          <View style={{ top: responsiveHeight(4) }}>
            <View style={{ overflow: 'hidden', flexDirection: 'row', left: responsiveWidth(8), gap: responsiveWidth(2) }}>
              <Text style={{
                fontSize: responsiveFontSize(1.65),
                color: themeColors.pureWhite,
                fontFamily: FONTFAMILY.poppins_regular,
              }}>Theatre</Text>
              <Text style={styles.subTitle}>{item.mall}</Text>
            </View>
            <View style={{ overflow: 'hidden', flexDirection: 'row', left: responsiveWidth(8), gap: responsiveWidth(2) }}>
              <Text style={{
                fontSize: responsiveFontSize(1.65),
                color: themeColors.pureWhite,
                fontFamily: FONTFAMILY.poppins_regular,
                top: responsiveHeight(0),
              }}>Seats </Text>
              <Text style={styles.subTitle}>
                {item.seatsArray.length > 15
                  ? `${item.seatsArray.slice(0, 15).join(', ')}...`
                  : item.seatsArray.join(', ')}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.dashLine} />
      <View style={styles.ticketFooter}>
        <Image
          source={require('../../../assets/images/barcode.png')}
          style={styles.bardCodeImg}
        />
      </View>
    </View>
  ), [highlightColor, styles.bardCodeImg, styles.dashLine, styles.dateTitle, styles.imgBox, styles.linearGrad, styles.subTitle, styles.tickDate, styles.ticketBG, styles.ticketContainer, styles.ticketFooter, themeColors.grey, themeColors.pureWhite]);

  const handleRefresh = useCallback(() => {
    fetchTickets();
  }, [fetchTickets]);


  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <ImageBackground source={background}
        blurRadius={0} style={{
          flex: 1, paddingHorizontal: responsiveWidth(8),
          paddingVertical: responsiveHeight(4), gap: 20,
        }}>
        <AppHeader
          name="close"
          header={'My Tickets'}
          action={() => navigation.navigate('Home')}
        />
        <View>
          <Animated.FlatList
            ref={flatListRef}
            horizontal
            data={tickets}
            snapToInterval={responsiveWidth(90)}
            bounces={false}
            scrollEventThrottle={16}
            showsHorizontalScrollIndicator={false}
            renderItem={renderTicketItem}
            keyExtractor={(item, index) => index.toString()}
            onMomentumScrollEnd={(event) => {
              const contentOffsetX = event.nativeEvent.contentOffset.x;
              const currentIndex = Math.round(contentOffsetX / responsiveWidth(90));
              setCurrentIndex(currentIndex);
            }}
            pagingEnabled
            contentContainerStyle={tickets.length === 0 ? styles.emptyListContainer : styles.flatlistContainer}
            ListEmptyComponent={<Text style={styles.noTicketsText}>No tickets found.</Text>}
            refreshControl={
              <RefreshControl
                refreshing={false} // Change to a state that reflects refreshing status
                onRefresh={handleRefresh}
                colors={[themeColors.primary]}
                progressBackgroundColor={themeColors.background}
              />
            }
          />
          <View style={styles.dotContainer}>
            {renderDots()}
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default MyTicket;
