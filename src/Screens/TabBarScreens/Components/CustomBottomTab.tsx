/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, { useContext } from 'react';
import { Pressable, StyleSheet, View, useWindowDimensions } from 'react-native';
import Animated, { useAnimatedStyle, withSpring } from 'react-native-reanimated';
import BottomTabIcon from './BottomTabIcon';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import ThemeContext from '../../SettingScreen/Components/ThemeContext';


const CustomBottomTab = ({ state, navigation }: any) => {
    const { themeColors, highlightColor } = useContext(ThemeContext);

    const styles = StyleSheet.create({
        tabBarContainer: {
            flexDirection: 'row',
            height: responsiveHeight(8.5),
            position: 'absolute',
            alignSelf: 'center',
            backgroundColor: themeColors.blur,
            borderRadius: 20,
            alignItems: 'center',
            justifyContent: 'space-around',
            overflow: 'hidden',
        },
        slidingTabContainer: {
            ...StyleSheet.absoluteFillObject,
            alignItems: 'center',
            justifyContent: 'center',
        },
        slidingTab: {
            width: responsiveWidth(16),
            height: responsiveHeight(8),
            borderRadius: 100,
            backgroundColor: highlightColor,
        },
        contentContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            gap: 4,
        },
    });


    const { width } = useWindowDimensions();
    const MARGIN = 20;
    const TAB_BAR_WIDTH = width - 3 * MARGIN;
    const TAB_WIDTH = TAB_BAR_WIDTH / state.routes.length;

    const translateAnimation = useAnimatedStyle(() => ({
        transform: [{ translateX: withSpring(TAB_WIDTH * state.index) }],
    }));

    return (
        <View style={[styles.tabBarContainer, { width: TAB_BAR_WIDTH, bottom: responsiveHeight(2), position: 'absolute' }]}>
            <Animated.View style={[styles.slidingTabContainer, { width: TAB_WIDTH }, translateAnimation]}>
                <View style={styles.slidingTab} />
            </Animated.View>
            {state.routes.map((route: { key: any; name: string; }, index: React.Key | null | undefined) => {
                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name, { merge: true });
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };

                return (
                    <Pressable key={index} onPress={onPress} onLongPress={onLongPress} style={{ flex: 1 }}>
                        <View style={styles.contentContainer}>
                            <BottomTabIcon route={route.name} isFocused={isFocused} />
                        </View>
                    </Pressable>
                );
            })}
        </View>
    );
};

export default CustomBottomTab;
