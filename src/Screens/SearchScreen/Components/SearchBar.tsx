/* eslint-disable prettier/prettier */
import React, { useState, useCallback, useContext } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import CustomIcon from '../../../themeComponents/CustomIcon';
import { FONTFAMILY, BORDERRADIUS } from '../../../themeComponents/theme';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import ThemeContext from '../../SettingScreen/Components/ThemeContext';

const SearchBar = (props: any) => {
  const { themeColors, highlightColor } = useContext(ThemeContext);

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      right: responsiveWidth(3),
    },
    inputBox: {
      paddingVertical: responsiveHeight(0.4),
      paddingHorizontal: responsiveWidth(3),
      borderWidth: 2,
      borderColor: 'transparent',
      borderRadius: BORDERRADIUS.radius_25,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      width: responsiveWidth(77),
      left: responsiveWidth(3),
      backgroundColor: themeColors.blur,
    },
    textInput: {
      padding: responsiveHeight(1),
      width: '90%',
      fontFamily: FONTFAMILY.poppins_regular,
      left: responsiveWidth(3),
      color:themeColors.pureWhite,
    },
    icon: {
      right: responsiveWidth(1),
    },
  });

  const [searchText, setSearchText] = useState<string>(''); // Use setSearchText instead of setsearchText for consistency

  const handleSearch = useCallback(() => {
    if (searchText.trim()) {
      props.searchFunction(searchText);
    }
  }, [searchText, props]); // Memoize handleSearch function

  return (
    <View style={styles.container}>
      <View style={styles.inputBox}>
        <TextInput
          style={styles.textInput}
          onChangeText={setSearchText}
          value={searchText}
          placeholderTextColor={themeColors.pureWhite}
          placeholder="Search your Movies..."
        />
        <TouchableOpacity onPress={handleSearch}>
          <CustomIcon
            name="search"
            size={28}
            color={highlightColor}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};


export default SearchBar;

