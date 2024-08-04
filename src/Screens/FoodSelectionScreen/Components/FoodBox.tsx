/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useContext, useState } from 'react';
import { responsiveWidth, responsiveHeight, responsiveFontSize } from 'react-native-responsive-dimensions';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { FONTFAMILY } from '../../../themeComponents/theme';
import ThemeContext from '../../SettingScreen/Components/ThemeContext';


const FoodBox = ({ item, onSelectItem }: any) => {
    const { themeColors } = useContext(ThemeContext);

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            margin: '2%',
            borderRadius: 35,
            display: 'flex',
            width: responsiveWidth(87),
            height: responsiveHeight(18),
            left: 20,
        },
        itemContainer: {
            flex: 1,
            right: responsiveWidth(3),
            borderRadius: 10,
            display: 'flex',
            flexDirection: 'row',
            flexGrow: 1,
        },
        imageContainer: {
            width: responsiveWidth(32),
            borderRadius: 30,
            left: responsiveWidth(5),
            top: responsiveHeight(1),
            aspectRatio: 12 / 12,
        },
        nameText: {
            color: themeColors.pureWhite,
            fontSize: responsiveFontSize(2),
            fontFamily: FONTFAMILY.poppins_semibold,
            left: responsiveWidth(10),
            top: responsiveHeight(4),
        },
        priceText: {
            color: themeColors.pureWhite,
            fontSize: responsiveFontSize(1.95),
            fontFamily: FONTFAMILY.poppins_regular,
            left: responsiveWidth(10),
            top: responsiveHeight(4),
        },
        addBoxContainer: {
            backgroundColor: themeColors.blue,
            height: responsiveHeight(4),
            width: responsiveWidth(18.25),
            top: responsiveHeight(6),
            left: responsiveWidth(35),
            borderRadius: 20,
            alignItems: 'center',
        },
        addText: {
            color: themeColors.pureWhite,
            fontFamily: FONTFAMILY.poppins_semibold,
            fontSize: responsiveFontSize(1.60),
            top: responsiveHeight(0.8),
            alignSelf: 'center',
        },
        numText: {
            color: themeColors.pureWhite,
            fontFamily: FONTFAMILY.poppins_semibold,
            fontSize: responsiveFontSize(1.60),
            top: responsiveHeight(0.8),
            alignSelf: 'center',
        },
    });

    const [num, setNum] = useState(0);
    const incrementNum = () => {
        setNum(num + 1);
        onSelectItem(item, num + 1, item.price);
    };

    const decrementNum = () => {
        const updatedNum = Math.max(num - 1, 0);
        setNum(updatedNum);
        onSelectItem(item, updatedNum, -item.price);
    };

    return (
        <View style={[styles.container, { backgroundColor: themeColors.blur }]}>
            <View style={styles.itemContainer}>
                <Image style={styles.imageContainer} source={item.img} />
                <View style={{ flexDirection: 'column', flexShrink: 1 }}>
                    <Text style={styles.nameText}>{item.name}</Text>
                    <View style={{ flexDirection: 'column', flexShrink: 1 }}>
                        <Text style={styles.priceText}>₹ {item.price}</Text>
                        <TouchableOpacity style={styles.addBoxContainer} onPress={num === 0 ? incrementNum : decrementNum}>
                            {num === 0 ? (
                                <Text style={styles.addText}>Add</Text>
                            ) : (
                                <View style={{ flexDirection: 'row' }}>
                                    <Ionicons name="remove-circle-outline" size={24} color={themeColors.pureWhite} style={{ top: responsiveHeight(0.5), right: responsiveWidth(3), position: 'absolute' }} onPress={decrementNum} />
                                    <Text style={styles.numText}>{num}</Text>
                                    <Ionicons name="add-circle-outline" size={24} color={themeColors.pureWhite} style={{ top: responsiveHeight(0.5), left: responsiveWidth(3), position: 'absolute' }} onPress={incrementNum} />
                                </View>
                            )}
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default FoodBox;
