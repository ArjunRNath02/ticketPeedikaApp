/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import {
    Image,
    ImageBackground,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    ToastAndroid,
    TouchableOpacity,
    View,
} from 'react-native';
import React, { useContext, useState } from 'react';
import { FONTFAMILY } from '../../../themeComponents/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    responsiveFontSize,
    responsiveHeight,
    responsiveWidth,
} from 'react-native-responsive-dimensions';
import AppHeader from '../../../themeComponents/AppHeader';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { MilesImg } from '../../../themeComponents/Date';
import ThemeContext from '../Components/ThemeContext';

const Account = ({ route }: any) => {
    const { themeColors,background,highlightColor } = useContext(ThemeContext);
    var { name, mail, pass, pnum } = route.params;
    const nav = useNavigation();
    var [newName, setName] = useState<any>();
    var [newPass, setPass] = useState<any>();
    var [newMail, setMail] = useState<any>();
    var [newPNum, setNewPNum] = useState<any>();
    const [showPass, setShowPass] = useState(false);

    const toggleShowPassword = () => {
        setShowPass(!showPass);
    };
    const userInfo = async () => {
        if (
            pass !== undefined &&
            name !== undefined &&
            mail !== undefined &&
            pnum !== undefined
        ) {
            name = newName;
            pass = newPass;
            mail = newMail;
            pnum = newPNum;
            try {
                await AsyncStorage.setItem(
                    'userInfo',
                    JSON.stringify({
                        Name: name,
                        Password: pass,
                        Mail: mail,
                        PNum: pnum,
                        Img: MilesImg,
                    }),
                );
            } catch (error) {
                console.error(
                    'Something went Wrong while storing in Change Functions',
                    error,
                );
            }
            ToastAndroid.showWithGravity(
                'Changes Successful !',
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM,
            );
        }
    };

    if (newName === undefined) {
        newName = name;
    }
    if (newPass === undefined) {
        newPass = pass;
    }
    if (newMail === undefined) {
        newMail = mail;
    }
    if (newPNum === undefined) {
        newPNum = pnum;
    }
    return (
        <ScrollView
            style={[styles.container, {
                backgroundColor: themeColors.secondary,
            }]}
            bounces={false}
            showsVerticalScrollIndicator={false}>
            <StatusBar hidden />
            <ImageBackground source={background}
                blurRadius={0}>
                <View>
                    <View style={{ height: '100%' }}>
                        <View //Header
                            style={styles.header}>
                            <AppHeader
                                name="close"
                                header={'Edit Profile'}
                                action={() => nav.goBack()}
                            />
                        </View>
                        <View //ProfileImage
                            style={styles.profileContainer}>
                            <Image source={MilesImg} style={styles.avatarImage} />
                            <Text style={[styles.imgChange, {
                                color: themeColors.text,
                            }]}>Change Profile Image</Text>
                        </View>
                        <View //userNameHeader
                            style={styles.mheader}>
                            <Text style={[styles.headerText, {
                                color: themeColors.text,
                            }]}>UserName</Text>
                            <View style={{ top: responsiveHeight(1.5) }}>
                                <TouchableOpacity style={[styles.boxes, {
                                    borderColor: themeColors.Mgrey, backgroundColor: themeColors.blur,
                                }]}>
                                    <View style={styles.text}>
                                        <TextInput
                                            style={[styles.textInput, {
                                                color: themeColors.pureWhite,
                                            }]}
                                            onChangeText={textInput => setName(textInput)}
                                            value={newName}
                                            placeholderTextColor={themeColors.pureWhite}
                                            placeholder="Username"
                                        />
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View //mailHeader
                            style={styles.mheader}>
                            <Text style={[styles.headerText, {
                                color: themeColors.text,
                            }]}>Email Address</Text>
                            <View style={{ top: responsiveHeight(1.5) }}>
                                <TouchableOpacity style={[styles.boxes, {
                                    borderColor: themeColors.Mgrey, backgroundColor: themeColors.blur,
                                }]}>
                                    <View style={styles.text}>
                                        <TextInput
                                            style={[styles.textInput, {
                                                color: themeColors.pureWhite,
                                            }]}
                                            onChangeText={textInput => setMail(textInput)}
                                            value={newMail}
                                            placeholderTextColor={themeColors.pureWhite}
                                            placeholder="Password"
                                        />
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View //PhoneNumber
                            style={styles.mheader}>
                            <Text style={[styles.headerText, {
                                color: themeColors.text,
                            }]}>Phone Number</Text>
                            <View style={{ top: responsiveHeight(1.5) }}>
                                <TouchableOpacity style={[styles.boxes, {
                                    borderColor: themeColors.Mgrey, backgroundColor: themeColors.blur,
                                }]}>
                                    <View style={styles.text}>
                                        <TextInput
                                            style={[styles.textInput, {
                                                color: themeColors.pureWhite,
                                            }]}
                                            onChangeText={textInput => setNewPNum(textInput)}
                                            value={newPNum}
                                            placeholderTextColor={themeColors.pureWhite}
                                            placeholder="Phone Number"
                                        />
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View //ChangePassword
                            style={{
                                paddingTop: responsiveHeight(5),
                                paddingLeft: responsiveWidth(9),
                            }}>
                            <Text style={[styles.headerText, {
                                color: themeColors.text,
                            }]}>Change Password</Text>
                            <View style={{ top: responsiveHeight(1.5) }}>
                                <View //EnterNewPass
                                >
                                    <TouchableOpacity style={[styles.boxes, {
                                        borderColor: themeColors.Mgrey, backgroundColor: themeColors.blur,
                                    }]}>
                                        <View style={styles.text}>
                                            <TextInput
                                                secureTextEntry={!showPass}
                                                style={[styles.textInput, {
                                                    color: themeColors.pureWhite,
                                                }]}
                                                onChangeText={textInput => setPass(textInput)}
                                                value={newPass}
                                                placeholderTextColor={themeColors.pureWhite}
                                                placeholder="Enter New Password"
                                            />
                                            <MaterialCommunityIcons
                                                name={showPass ? 'eye-off' : 'eye'}
                                                size={24}
                                                color={themeColors.grey}
                                                style={styles.Eicon}
                                                onPress={toggleShowPassword}
                                            />
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                <View //ConfirmNewPass
                                    style={{ top: responsiveHeight(2) }}>
                                    <TouchableOpacity style={[styles.boxes, {
                                        borderColor: themeColors.Mgrey, backgroundColor: themeColors.blur,
                                    }]}>
                                        <View style={styles.text}>
                                            <TextInput
                                                secureTextEntry={!showPass}
                                                style={[styles.textInput, {
                                                    color: themeColors.pureWhite,
                                                }]}
                                                placeholderTextColor={themeColors.pureWhite}
                                                placeholder="Confirm New Password"
                                            />
                                            <MaterialCommunityIcons
                                                name={showPass ? 'eye-off' : 'eye'}
                                                size={22}
                                                color={themeColors.grey}
                                                style={styles.Eicon}
                                                onPress={toggleShowPassword}
                                            />
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <View //SaveButton
                            style={{ height: responsiveHeight(20) }}>
                            <TouchableOpacity
                                activeOpacity={0.9}
                                onPress={userInfo}
                                style={[styles.Lbox, {
                                    backgroundColor: highlightColor,
                                }]}>
                                <Text style={[styles.LText,
                                { color: themeColors.text2 }]}>Save Changes</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ImageBackground>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,
    },
    loadingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center', height: responsiveHeight(100),
    },
    header: {
        marginHorizontal: responsiveWidth(9),
        marginTop: responsiveHeight(4),
    },
    profileContainer: {
        alignItems: 'center',
        padding: responsiveWidth(8),
        top: responsiveHeight(1),
    },
    avatarImage: {
        height: responsiveHeight(10),
        width: responsiveHeight(10),
        borderRadius: responsiveHeight(10) / 2,
    },
    mheader: {
        paddingTop: responsiveHeight(4),
        left: responsiveWidth(10),
    },
    headerText: {
        fontFamily: FONTFAMILY.poppins_medium,
        bottom: responsiveHeight(1),
    },
    text: {
        left: responsiveWidth(6),
        width: responsiveWidth(65),
    },
    textInput: {
        width: '100%',
        fontFamily: FONTFAMILY.poppins_regular,
        fontSize: responsiveFontSize(1.5),
    },
    boxes: {
        height: responsiveHeight(7),
        width: responsiveWidth(85),
        borderRadius: responsiveHeight(3.5),
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 2,
        right: responsiveWidth(1),
        bottom: responsiveHeight(1),
    },
    imgChange: {
        fontFamily: FONTFAMILY.poppins_regular,
        fontSize: responsiveFontSize(1.2),
        top: responsiveHeight(3),
        alignSelf: 'center',
    },
    Eicon: {
        margin: responsiveWidth(3),
        right: responsiveWidth(-8),
        position: 'absolute',
    },
    Lbox: {
        height: responsiveHeight(6),
        width: responsiveWidth(40),
        alignSelf: 'center',
        borderRadius: responsiveHeight(3),
        top: responsiveHeight(6),
        alignItems: 'center',
    },
    LText: {
        fontFamily: FONTFAMILY.poppins_semibold,
        top: responsiveHeight(1.5),
    },
});

export default Account;
