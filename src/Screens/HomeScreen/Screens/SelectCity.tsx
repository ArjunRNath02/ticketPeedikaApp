/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable eqeqeq */
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import React, { useContext, useState } from 'react';
import { cities } from '../../../themeComponents/Date';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FONTFAMILY } from '../../../themeComponents/theme';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SearchCity from '../Components/SearchCity';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import CityIcon from '../Components/CityIcon';
import ThemeContext from '../../SettingScreen/Components/ThemeContext';


const SelectCity = () => {
  const { themeColors, background,highlightColor } = useContext(ThemeContext);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: themeColors.secondary,
      paddingHorizontal: responsiveWidth(5),
      paddingTop: responsiveHeight(3),
    },
    titleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    title: {
      fontSize: responsiveHeight(3),
      color: themeColors.text,
      fontFamily: FONTFAMILY.poppins_semibold,
      paddingBottom: responsiveHeight(1),
    },
    proceedButton: {
      height: responsiveHeight(5),
      width: responsiveWidth(25),
      borderRadius: responsiveWidth(5),
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttonText: {
      fontFamily: FONTFAMILY.poppins_semibold,
      fontSize: responsiveHeight(1.8),
    },
    popularCitiesContainer: {
      paddingTop: responsiveHeight(4),
    },
    popularCitiesText: {
      fontSize: responsiveHeight(2),
      fontFamily: FONTFAMILY.poppins_semibold,
      color: themeColors.text,
      paddingBottom: responsiveHeight(1),
    },
    cityItem: {
      borderRadius: responsiveWidth(5),
      marginTop: responsiveHeight(2),
      paddingVertical: responsiveHeight(1),
      paddingHorizontal: responsiveWidth(2),
    },
    cityText: {
      fontFamily: FONTFAMILY.poppins_regular,
      fontSize: responsiveHeight(2),
      paddingHorizontal: responsiveWidth(8),
    },
  });

  const [isSelected, setisSelected] = useState<any>();
  const [isClicked, setisClicked] = useState<any>(true);
  const [city, setCity] = useState<any>();
  const [Option, setOption] = useState(0);
  const nav = useNavigation<any>();
  const cityInfo = async () => {
    try {
      await AsyncStorage.setItem('cityInfo', city);
    } catch (error) {
      console.error('Something went Wrong while storing in city details', error);
    }
    nav.navigate('Tab');
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground source={background}
        blurRadius={0} style={styles.container}>
        {Option == 0 ? (
          <View>
            <Text style={styles.title}>Select City</Text>
          </View>
        ) : (
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Select City</Text>
            <TouchableOpacity
              disabled={isClicked}
              onPress={cityInfo}
              style={[styles.proceedButton, { backgroundColor: isClicked ? 'transparent' : highlightColor }]}>
              <Text style={[styles.buttonText, { color: isClicked == false ? themeColors.pureWhite : themeColors.grey }]}>Proceed</Text>
            </TouchableOpacity>
          </View>
        )}
        <View style={{
          paddingBottom: responsiveHeight(2),
        }}>
          <SearchCity cardFunction={() => setOption(1)} />
        </View>
        {Option == 0 ? (
          <View style={{ paddingTop: responsiveHeight(6), paddingLeft: responsiveWidth(6) }}>
            <Text style={{ fontSize: responsiveFontSize(2), fontFamily: FONTFAMILY.poppins_semibold, color: themeColors.text }}>Popular Cities</Text>
            <View
              style={{ flexDirection: 'column', gap: responsiveHeight(6), height: responsiveHeight(70), paddingTop: responsiveHeight(2) }}>
              <View style={{ flexDirection: 'row', gap: responsiveWidth(10) }}>
                <CityIcon img={require('../../../assets/cities/MMB.png')} name="Mumbai" cardFunction={() => { setCity('Mumbai'); setisClicked(false); }} color={city === 'Mumbai' ? highlightColor : themeColors.text} />
                <CityIcon img={require('../../../assets/cities/BNG.png')} name="Bengaluru" cardFunction={() => { setCity('Bengaluru'); setisClicked(false); }} color={city == 'Bengaluru' ? highlightColor : themeColors.text} />
                <CityIcon img={require('../../../assets/cities/KKT.png')} name="Kolkata" cardFunction={() => { setCity('Kolkata'); setisClicked(false); }} color={city == 'Kolkata' ? highlightColor : themeColors.text} />
              </View>
              <View style={{ flexDirection: 'row', gap: responsiveWidth(10) }}>
                <CityIcon img={require('../../../assets/cities/HYD.png')} name="Hyderabad" cardFunction={() => { setCity('Hyderabad'); setisClicked(false); }} color={city == 'Hyderabad' ? highlightColor : themeColors.text} />
                <CityIcon img={require('../../../assets/cities/CHN.png')} name="Chennai" cardFunction={() => { setCity('Chennai'); setisClicked(false); }} color={city == 'Chennai' ? highlightColor : themeColors.text} />
                <CityIcon img={require('../../../assets/cities/DLH.png')} name="Delhi" cardFunction={() => { setCity('Delhi'); setisClicked(false); }} color={city == 'Delhi' ? highlightColor : themeColors.text} />
              </View>
              <CityIcon img={require('../../../assets/cities/KCH.png')} name="Kochi" cardFunction={() => { setCity('Kochi'); setisClicked(false); }} color={city == 'Kochi' ? highlightColor : themeColors.text} />
            </View>
            <View style={{
              width: '50%',
              height: responsiveHeight(10),
              borderTopLeftRadius: 50,
              borderTopRightRadius: 50,
              alignSelf: 'center',
              justifyContent: 'space-between',
              flexDirection: 'row',
            }}>
              <TouchableOpacity
                disabled={isClicked}
                onPress={(cityInfo)}
                style={{
                  backgroundColor: isClicked == false ? highlightColor : themeColors.blur,
                  height: responsiveHeight(7), width: responsiveWidth(40),
                  borderRadius: 20,
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'row',
                  bottom: responsiveHeight(8),
                  alignSelf: 'center',
                }}>
                <Text style={{
                  fontFamily: FONTFAMILY.poppins_semibold, fontSize: responsiveFontSize(2),
                  color: isClicked == false ? themeColors.pureWhite : themeColors.grey,
                }}>
                  Proceed
                </Text>
              </TouchableOpacity>
            </View>
          </View>) : (
          <FlatList
            style={{ width: responsiveWidth(80), left: responsiveWidth(5) }}
            numColumns={1}
            data={cities}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                style={[
                  styles.cityItem,
                  {
                    borderWidth: isSelected == index ? 2 : 0,
                    borderColor: isSelected == index ? highlightColor : themeColors.secondary,
                  }]}
                onPress={() => {
                  setisSelected(index);
                  setisClicked(false);
                  setCity(item);
                }}>
                <Text style={[styles.cityText, { color: isSelected == index ? highlightColor : themeColors.text }]}>
                  {item}{' '}
                </Text>
              </TouchableOpacity>
            )}
          />
        )}
      </ImageBackground>
    </SafeAreaView>
  );
};

export default SelectCity;
