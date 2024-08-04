/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import { FlatList, ImageBackground, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native';
import React, { useContext, useState } from 'react';
import { FONTFAMILY } from '../../../themeComponents/theme';
import AppHeader from '../../../themeComponents/AppHeader';
import { useNavigation } from '@react-navigation/native';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import FoodBox from '../Components/FoodBox';
import { FoodItems, backgroundImg } from '../../../themeComponents/Date';
import ThemeContext from '../../SettingScreen/Components/ThemeContext';

const FoodDetails = () => {
  const nav = useNavigation<any>();
  const { themeColors, background,highlightColor } = useContext(ThemeContext);
  const [selectedItems, setSelectedItems] = useState<any[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [totalItems, setTotalItems] = useState<number>(0);


  const styles = StyleSheet.create({
    container: {
      display: 'flex',
      flex: 1,
      backgroundColor: themeColors.secondary,
    },
    headerContainer: {
      marginHorizontal: responsiveWidth(8),
      marginTop: responsiveHeight(4),
      height: responsiveHeight(12),
    },
    LastBox: {
      width: '100%',
      height: responsiveHeight(6),
      borderTopLeftRadius: responsiveWidth(12),
      borderTopRightRadius: responsiveWidth(12),
      alignSelf: 'center',
      justifyContent: 'space-between',
      flexDirection: 'row',
    },
    BottomBox: {
      height: responsiveHeight(6),
      width: responsiveWidth(35),
      right: responsiveWidth(6),
      borderRadius: responsiveWidth(10),
      backgroundColor: highlightColor,
      flexDirection: 'row',
      alignItems: 'center',
      bottom: responsiveHeight(2),
      justifyContent: 'center',
      alignSelf: 'center',
    },
    selectedItemInfo: {
      backgroundColor: themeColors.blur,
      padding: responsiveHeight(0.5),
      marginTop: responsiveHeight(0.6),
      borderRadius: responsiveWidth(5),
      width: responsiveWidth(75),
      left: responsiveWidth(12),
      bottom: responsiveHeight(1.5),
    },
    selectedItemName: {
      color: themeColors.pureWhite,
      fontSize: responsiveHeight(1.3),
      fontFamily: FONTFAMILY.poppins_semibold,
      left: responsiveWidth(6),
    },
  });


  return (
    <View style={styles.container}>
      <ImageBackground source={background}
        blurRadius={0} style={{
          flex: 1,
        }}>
        <View style={styles.headerContainer}>
          <AppHeader
            name="close"
            header="Grab a Bite!"
            action={() => nav.goBack()}
          />
          <TouchableOpacity
            onPress={() => { nav.navigate('PayMoney', { selectedItems: 0, foodAmount: 0 }); }}
            style={{
              left: responsiveWidth(68),
              top: responsiveHeight(-5),
              backgroundColor: themeColors.blue,
              borderRadius: responsiveWidth(3),
              width: responsiveWidth(17),
              height: responsiveHeight(5.5),
              alignItems: 'center',
            }}>
            <Text style={{ fontSize: responsiveHeight(2), fontFamily: FONTFAMILY.poppins_semibold, color: themeColors.pureWhite, top: responsiveHeight(1) }}>
              Skip</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          showsVerticalScrollIndicator={false}
          numColumns={1}
          data={FoodItems}
          keyExtractor={(item: any) => item.id}
          style={{ bottom: responsiveHeight(4) }}
          renderItem={({ item, index }) => {
            const selectedItem = selectedItems.find((selectedItem) => selectedItem.id === item.id);
            const quantity = selectedItem ? selectedItem.quantity : 0;
            const amount = quantity * item.price;

            return (
              <View style={{
                paddingHorizontal: responsiveWidth(0.15), paddingVertical: responsiveHeight(0.5),
              }}>
                <FoodBox
                  item={item}
                  onSelectItem={(selectedItem: any, quantity: number, amount: number) => {
                    const updatedSelectedItems = [...selectedItems];
                    if (quantity === 0) {
                      const selectedItemIndex = updatedSelectedItems.findIndex((item) => item.id === selectedItem.id);
                      if (selectedItemIndex !== -1) {
                        updatedSelectedItems.splice(selectedItemIndex, 1); // Remove item if quantity is zero
                      }
                    } else {
                      // Update quantity and amount if quantity is greater than zero
                      const selectedItemIndex = updatedSelectedItems.findIndex((item) => item.id === selectedItem.id);
                      if (selectedItemIndex !== -1) {
                        updatedSelectedItems[selectedItemIndex].quantity = quantity;
                        updatedSelectedItems[selectedItemIndex].amount = amount;
                      } else {
                        updatedSelectedItems.push({ ...selectedItem, quantity, amount });
                      }
                    }
                    setSelectedItems(updatedSelectedItems);
                    setTotalAmount(totalAmount + amount); // Update totalAmount based on amount change

                    // Calculate the new totalItems based on selected items
                    const newTotalItems = updatedSelectedItems.reduce((total, item) => total + (item.quantity > 0 ? 1 : 0), 0);
                    setTotalItems(newTotalItems);
                  }}
                />
                {quantity > 0 && (
                  <View style={styles.selectedItemInfo}>
                    <Text style={styles.selectedItemName}>{item.name}</Text>
                    <Text style={styles.selectedItemName}>Quantity: {quantity}</Text>
                    <Text style={styles.selectedItemName}>Total Amount: ₹ {amount}</Text>
                  </View>
                )}
              </View>
            );
          }}
        />
        <View style={styles.LastBox}>
          <Text
            style={{
              paddingHorizontal: responsiveWidth(15),
              top: responsiveHeight(0),
              fontSize: responsiveHeight(2),
              fontFamily: FONTFAMILY.poppins_semibold,
              color: themeColors.text,
            }}
          >
            {totalItems} items selected
          </Text>
          <TouchableOpacity
            onPress={() => {
              if (totalItems === 0) {
                // Show a warning toast message if no items are selected
                ToastAndroid.show('Please select at least one item!', ToastAndroid.SHORT);
              } else {
                // Proceed with the selected items
                nav.navigate('PayMoney', { selectedItems, foodAmount: totalAmount });
              }
            }}
            style={styles.BottomBox}
          >
            <Text style={{ color: themeColors.pureWhite, fontSize: responsiveHeight(2), fontFamily: FONTFAMILY.poppins_semibold }}>
              Proceed
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};


export default FoodDetails;
