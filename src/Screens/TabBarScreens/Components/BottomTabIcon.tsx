/* eslint-disable prettier/prettier */
import React, { useContext } from 'react';
import CustomIcon from '../../../themeComponents/CustomIcon';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ThemeContext from '../../SettingScreen/Components/ThemeContext';

interface Props {
    route: string;
    isFocused: boolean;
}

const BottomTabIcon = ({ route, isFocused }: Props) => {
    const { themeColors } = useContext(ThemeContext);
    const renderIcon = (iconName: string, size: number) => (
        <CustomIcon
            name={iconName}
            style={{ color: isFocused ? themeColors.pureWhite : themeColors.pureWhite }}
            size={size}
        />
    );

    const renderIonicons = (iconName: string, size: number) => (
        <Ionicons
            name={iconName}
            style={{ color: isFocused ? themeColors.pureWhite : themeColors.pureWhite }}
            size={size}
        />
    );

    switch (route) {
        case 'UserScreen':
            return renderIcon('user', 30);
        case 'Search':
            return renderIcon('search', 27);
        case 'Home':
            return renderIcon('video', 35);
        case 'MyTicket':
            return renderIcon('ticket', 32);
        case 'Favorite':
            return renderIonicons('heart-outline', 27);
        default:
            return null;
    }
};

export default BottomTabIcon;
