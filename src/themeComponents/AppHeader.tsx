/* eslint-disable prettier/prettier */
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { FONTFAMILY } from './theme';
import ThemeContext from '../Screens/SettingScreen/Components/ThemeContext';

const AppHeader = (props: any) => {
  const { themeColors, highlightColor } = React.useContext(ThemeContext);

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    headerText: {
      flex: 1,
      fontSize: 20,
      color: themeColors.text, fontFamily: FONTFAMILY.poppins_semibold,
      left: 10, flexShrink: 1,
    },
    emptyContainer: {
      height: 40,
      width: 40,
    },
    iconBG: {
      height: 40,
      width: 40,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 20, bottom: 2,
    },
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.iconBG} onPress={() => props.action()}>
        <Ionicons name="arrow-back-circle" size={39} color={highlightColor} />
      </TouchableOpacity>
      <Text style={styles.headerText}>{props.header}</Text>
      <View style={styles.emptyContainer} />
    </View>
  );
};



export default AppHeader;
