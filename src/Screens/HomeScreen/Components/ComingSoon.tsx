/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import React, { useContext } from 'react';
import CustomIcon from '../../../themeComponents/CustomIcon';
import { upComing } from '../../../themeComponents/Date';
import { FONTFAMILY } from '../../../themeComponents/theme';
import ThemeContext from '../../SettingScreen/Components/ThemeContext';

// Define the Item type for renderItem function
type Item = {
  img: string;
  title: string;
};

const ComingSoon = () => {
  const windowWidth = Dimensions.get('window').width;
  const { themeColors } = useContext(ThemeContext);

  const renderItem = ({ item }: { item: Item }) => (
    <TouchableOpacity
      style={{
        flex: 1,
        margin: windowWidth * 0.01, // Adjust margin based on screen width
        borderRadius: windowWidth * 0.03, // Adjust borderRadius based on screen width
        overflow: 'hidden',
      }}>
      <Image
        style={{
          height: windowWidth * 0.8,
          borderRadius: windowWidth * 0.03,
          opacity: 0.8,
        }}
        source={{ uri: item.img }}
      />
      <View
        style={{
          position: 'absolute',
          bottom: windowWidth * 0.06,
          left: windowWidth * 0.03,
          gap: windowWidth * 0.01,
        }}>
        <Text
          style={{
            color: themeColors.text,
            fontFamily: FONTFAMILY.poppins_bold,
            fontSize: windowWidth * 0.034,
          }}>
          {item.title}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            gap: windowWidth * 0.01,
            alignItems: 'center',
          }}>
          <CustomIcon name="star" size={windowWidth * 0.06} color="gold" />
          <Text
            style={{
              fontSize: windowWidth * 0.033,
              color: themeColors.text,
              fontFamily: FONTFAMILY.poppins_semibold,
            }}>
            Releasing Soon
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      numColumns={2}
      data={upComing}
      renderItem={renderItem}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Dimensions.get('window').width * 0.02, // Adjust padding based on screen width
    paddingBottom: Dimensions.get('window').width * 0.02, // Adjust padding based on screen width
  },
});

export default ComingSoon;
