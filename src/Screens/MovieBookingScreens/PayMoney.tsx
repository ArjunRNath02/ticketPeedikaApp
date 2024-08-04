/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */

import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, SafeAreaView, StyleSheet, ScrollView, ToastAndroid, ImageBackground, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { FONTFAMILY } from '../../themeComponents/theme';
import AppHeader from '../../themeComponents/AppHeader';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ThemeContext from '../SettingScreen/Components/ThemeContext';
import axios from 'axios';

const PayMoney = ({ route }: any) => {
  const { themeColors, background, highlightColor } = useContext(ThemeContext);
  const [loading, setLoading] = useState(false);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: themeColors.secondary,
    },
    headerContainer: {
      paddingHorizontal: responsiveWidth(3),
      marginTop: responsiveHeight(3),
    },
    DivText: {
      padding: responsiveHeight(3),
      top: responsiveHeight(2.5),
      fontSize: responsiveFontSize(2.35),
      fontFamily: FONTFAMILY.poppins_semibold,
      color: themeColors.text,
    },
    ScrollContainer: {
      display: 'flex',
      flex: 1, right: responsiveWidth(2),
    },
    PayBoxDet: {
      height: responsiveHeight(10),
      width: responsiveWidth(84),
      marginLeft: responsiveWidth(8),
      alignSelf: 'flex-start',
      marginTop: responsiveHeight(4),
      left: responsiveWidth(1),
      borderRadius: 30,
      gap: responsiveWidth(1),
      alignItems: 'center',
      flexDirection: 'row',
      flex: 1,
    },
    ImagDet: {
      width: '20%',
      borderRadius: 10,
      aspectRatio: 1.2 / 1.7,
      right: responsiveWidth(4.5), opacity: 1,
    },
    TitleDet: {
      color: themeColors.text,
      fontSize: responsiveFontSize(2.25),
      fontFamily: FONTFAMILY.poppins_bold, overflow: 'hidden',
    },
    TickDet: {
      color: themeColors.text,
      fontSize: responsiveFontSize(1.45),
      fontFamily: FONTFAMILY.poppins_regular,
    },
    payBox: {
      height: responsiveHeight(6.5), width: responsiveWidth(78),
      marginLeft: responsiveWidth(6),
      marginTop: responsiveHeight(4),
      borderRadius: 25,
      backgroundColor: themeColors.blur,
      flexDirection: 'row',
      alignItems: 'center',
      elevation: 0,
      bottom: responsiveHeight(2), shadowColor: themeColors.text,
    },
    payText: {
      left: responsiveWidth(20),
      fontFamily: FONTFAMILY.poppins_semibold,
      fontSize: responsiveFontSize(1.75),
      position: 'absolute', color: themeColors.pureWhite,
    },
    LastBox: {
      width: '114%',
      height: responsiveHeight(15),
      borderTopLeftRadius: 50,
      borderTopRightRadius: 50,
      alignSelf: 'center',
      justifyContent: 'space-between',
    },
    BottomBox: {
      height: responsiveHeight(8),
      marginLeft: responsiveWidth(9),
      marginRight: responsiveWidth(9),
      borderRadius: 25,
      backgroundColor: highlightColor,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center', top: responsiveHeight(3),
    },
    Details: {
      paddingTop: responsiveHeight(4), paddingLeft: responsiveWidth(6),
    },
    DetailsText1: {
      color: themeColors.grey, fontFamily: FONTFAMILY.poppins_regular, fontSize: responsiveFontSize(1.7),
    },
    DetailsText2: {
      color: themeColors.text, fontFamily: FONTFAMILY.poppins_regular, fontSize: responsiveFontSize(1.7),
    },
  });

  const nav = useNavigation<any>();
  const { selectedItems, foodAmount } = route.params;
  const [seatsArray, setSeatArray] = useState<any[]>([]);
  const [time, setTime] = useState<any>();
  const [month, setMonth] = useState<any>();
  const [currDate, setDate] = useState<any>();
  const [year, setYear] = useState<any>();
  const [mall, setMall] = useState<any>();
  const [Poster, setPoster] = useState<string | null>(null);
  const [titleName, setName] = useState<any>();
  const [amountTicket, setAmount] = useState<any>();
  const [selected, setSelected] = useState<number | null>(null);
  const ticketInfo = async () => {
    try {
      await AsyncStorage.getItem('ticket')
        .then(value => {
          if (value != null) {
            let item = JSON.parse(value);
            setSeatArray(item.seatsArray); setAmount(item.amountTicket);
            setTime(item.time); setName(item.titleName);
            setMonth(item.Month); setPoster(item.ticketImage ? item.ticketImage : null);
            setDate(item.currDate); setYear(item.year); setMall(item.mall);
          }
        });
    } catch (err) { console.log(err); }
  };
  useEffect(() => {
    ticketInfo();
  }, []);

  const ticket = { Poster, time, seatsArray, currDate, month, mall, year, titleName, amount: amountTicket };

  const bookTickets = async () => {
    if (seatsArray.length > 0) {
      try {
        const requestBody = {
          date: currDate,
          month: month,
          year,
          mall,
          titleName,
          time,
          seatsArray,
        };
        const url = 'https://ticketpeedika.onrender.com/seat/book-seats'; // Replace 'your-backend-url' with your actual backend URL
        const response = await axios.post(url, requestBody);

        if (response.status === 200) {
          // Handle successful booking,
          try {
            // Fetch existing tickets from AsyncStorage
            const existingTickets = await AsyncStorage.getItem('BookedTickets');
            let updatedTickets = [];

            if (existingTickets) {
              updatedTickets = JSON.parse(existingTickets);
            }

            // Add the new ticket to the array
            updatedTickets.push(ticket);

            // Store the updated array back to AsyncStorage
            await AsyncStorage.setItem('BookedTickets', JSON.stringify(updatedTickets));

            console.log('Ticket booked successfully');
            nav.navigate('SuccessfulPay');
          } catch (error) {
            console.error('Error storing ticket:', error);
          }
        } else {
          // Handle booking failure
          console.error('Booking failed:', response.data.message);
        }
      } catch (error) {
        console.error('Error booking seats:', error);
      }
    } else {
      // No seats selected
      console.warn('Please select at least one seat.');
    }
  };

  if (Poster === undefined || Poster === null && titleName === undefined || titleName === null) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.ScrollContainer}>
          <View style={styles.headerContainer}>
            <AppHeader
              name="close"
              header={'Checkout'}
              action={() => nav.goBack()}
            />
          </View>
        </View>
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={background}
        blurRadius={0} style={{ flex: 1, paddingHorizontal: responsiveWidth(6) }}>
        <ScrollView
          style={styles.ScrollContainer}
          bounces={false}
          showsVerticalScrollIndicator={false}>
          <View //CheckoutHeader
            style={styles.headerContainer}>
            <AppHeader
              name="close"
              header={'Checkout'}
              action={() => nav.goBack()}
            />
          </View>
          <View //MovieDetails
            style={styles.PayBoxDet}>
            <Image source={{ uri: Poster?.toString() ?? 'https://motivatevalmorgan.com/wp-content/uploads/2016/06/default-movie-768x1129.jpg' }} style={styles.ImagDet} />
            <View>
              <Text //MovieTitle
                style={styles.TitleDet}>
                {titleName.length > 21 ? titleName.slice(0, 21) + '...' : titleName}</Text>
              <Text //Seats
                style={styles.TickDet}>
                Seats : {seatsArray}</Text>
              <View style={{ flexDirection: 'row' }}>
                <Text //Date
                  style={styles.TickDet}>
                  {month} {currDate} {year} | </Text>
                <Text //Time
                  style={styles.TickDet}
                >
                  {time}
                </Text></View>
            </View>
          </View>

          <View //PaymentDetails
            style={styles.Details}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={styles.DetailsText1}>Ticket Cost</Text>
              <Text style={styles.DetailsText2}> ₹120.00</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={styles.DetailsText1}>Qty</Text>
              <Text style={styles.DetailsText2}>{seatsArray.length}</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={styles.DetailsText1}>Ticket Total</Text>
              <Text style={styles.DetailsText2}>₹{amountTicket}.00</Text>
            </View>
            {selectedItems.length > 0 && ( //foodItem if found display
              <View><Text style={styles.DetailsText1}>Food Items:</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-end', bottom: responsiveHeight(2.5), width: responsiveWidth(50), left: responsiveWidth(37.5), flexWrap: 'wrap' }}>
                  {selectedItems.map((item: { name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; quantity: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; amount: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor /* eslint-disable react-native/no-inline-styles */<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }, index: React.Key | null | undefined) => (
                    <View key={index} style={{ right: responsiveWidth(5) }}>
                      <Text style={[styles.DetailsText2, { fontSize: responsiveFontSize(1.4), flexShrink: 1 }]}> {item.name},</Text>
                    </View>
                  ))}
                </View>
              </View>
            )}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 10 }}>
              <Text style={styles.DetailsText1}>Food Total</Text>
              <Text style={styles.DetailsText2}>₹{foodAmount}.00</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', borderStyle: 'dashed', borderTopColor: themeColors.Mgrey, borderTopWidth: 2, paddingTop: 10 }}>
              <Text style={{ color: themeColors.grey, fontFamily: FONTFAMILY.poppins_semibold, fontSize: 13 }}>Total Amount</Text>
              <Text style={{ color: themeColors.text, fontFamily: FONTFAMILY.poppins_semibold, fontSize: 18 }}>₹{foodAmount + amountTicket}.00</Text>
            </View>
          </View>

          <View //PayOptions
          >
            <View>
              <Text //PaymentHeader
                style={styles.DivText}
              >
                Payment Method
              </Text>
              <View //CreditCard
                style={styles.payBox}>
                <MaterialIcons
                  name="payment"
                  size={26}
                  color={themeColors.pureWhite}
                  style={{
                    left: 23,
                    position: 'absolute',
                  }}
                />
                <Text style={styles.payText}>Credit Card</Text>
                <BouncyCheckbox
                  size={30}
                  fillColor={highlightColor}
                  unfillColor={'transparent'}
                  onPress={() => setSelected(selected === 0 ? null : 0)}
                  isChecked={selected === 0}
                  style={{ left: responsiveWidth(65), position: 'absolute' }} />
              </View>

              <View  //PayPal
                style={styles.payBox}>
                <MaterialIcons
                  name="paypal"
                  size={30}
                  color={themeColors.pureWhite}
                  style={{
                    left: 23,
                    position: 'absolute',
                  }}
                />
                <Text style={styles.payText}>PayPal</Text>
                <BouncyCheckbox
                  size={30}
                  fillColor={highlightColor}
                  unfillColor={'transparent'}
                  onPress={() => setSelected(selected === 1 ? null : 1)}
                  isChecked={selected === 1}
                  style={{ left: responsiveWidth(65), position: 'absolute' }}
                />
              </View>
              <View //GPay
                style={styles.payBox}>
                <FontAwesome5
                  name="google-pay"
                  size={30}
                  color={themeColors.pureWhite}
                  style={{
                    left: 23,
                    position: 'absolute',
                  }}
                />
                <Text style={styles.payText}>GooglePay</Text>
                <BouncyCheckbox
                  size={30}
                  fillColor={highlightColor}
                  unfillColor={'transparent'}
                  onPress={() => setSelected(selected === 2 ? null : 2)}
                  isChecked={selected === 2}
                  style={{ left: responsiveWidth(65), position: 'absolute' }}
                />
              </View>
              <View //TokenPay
                style={styles.payBox}>
                <MaterialIcons
                  name="generating-tokens"
                  size={30}
                  color={themeColors.pureWhite}
                  style={{
                    left: 23,
                    position: 'absolute',
                  }}
                />
                <Text style={styles.payText}>Tokens</Text>
                <BouncyCheckbox
                  size={30}
                  fillColor={highlightColor}
                  unfillColor={'transparent'}
                  onPress={() => setSelected(selected === 3 ? null : 3)}
                  isChecked={selected === 3}
                  style={{ left: responsiveWidth(65), position: 'absolute' }}
                />
              </View>
            </View>
          </View>
        </ScrollView>
        <View //PayBox
          style={styles.LastBox}>
          <TouchableOpacity //PayNow
            onPress={() => {
              if (selected != null) {
                setLoading(true); // Show loader when Pay Now is pressed
                bookTickets(); // Call bookTickets function
              } else {
                ToastAndroid.showWithGravity(
                  'Please select a Payment option',
                  ToastAndroid.SHORT,
                  ToastAndroid.BOTTOM,
                );
              }
            }}
            style={styles.BottomBox}>
            {loading ? ( // Conditionally render based on loading state
              <ActivityIndicator size="large" color={themeColors.pureWhite} />
            ) : (
              <Text style={{ color: themeColors.pureWhite, fontSize: 19, fontFamily: FONTFAMILY.poppins_semibold }}>
                Pay Now
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};


export default PayMoney;
