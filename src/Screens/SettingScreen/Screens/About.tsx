/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import { StyleSheet, Text, View, ScrollView, ImageBackground } from 'react-native';
import React, { useContext } from 'react';
import { FONTFAMILY } from '../../../themeComponents/theme';
import {
    responsiveFontSize,
    responsiveHeight,
    responsiveWidth,
} from 'react-native-responsive-dimensions';
import AppHeader from '../../../themeComponents/AppHeader';
import { useNavigation } from '@react-navigation/native';
import ThemeContext from '../Components/ThemeContext';

const About = () => {
    const { themeColors, background } = useContext(ThemeContext);

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: themeColors.secondary,
            paddingLeft: responsiveWidth(12),
        },
        text: {
            fontFamily: FONTFAMILY.poppins_regular,
            color: themeColors.text,
            fontSize: responsiveFontSize(1.6),
            marginTop: responsiveHeight(2),
            paddingHorizontal: responsiveWidth(0),
        },
        header: {
            marginHorizontal: responsiveWidth(-4),
            marginTop: responsiveHeight(4),
        },
        scrollView: {
            marginLeft: responsiveWidth(1),
            marginTop: responsiveHeight(2),
            marginRight: responsiveWidth(5),
        },
    });


    const nav = useNavigation();
    return (
        <View style={{ flex: 1 }}>
            <ImageBackground source={background}
                blurRadius={0} style={styles.container}>
                <View style={styles.header}>
                    <AppHeader name="close" header={'About'} action={() => nav.goBack()} />
                </View>

                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={styles.scrollView}>
                    <Text style={styles.text}>
                        TicketPeedika is an innovative online movie ticket booking system
                        developed using React Native and JavaScript. It offers a seamless
                        experience for users to browse, select, and book movie tickets from
                        the comfort of their mobile devices. Developed by Group Four of
                        Computer Science and Engineering at the University College of
                        Engineering (2021-2025) as part of a Mini-project assignment,
                        TicketPeedika combines the power of NodeJS on the backend and React
                        Native on the frontend to create a cross-platform solution.
                    </Text>
                    <Text style={styles.text}>Key features of TicketPeedika include:</Text>
                    <Text style={styles.text}>
                        User-Friendly Interface: TicketPeedika provides an intuitive interface
                        for users to easily navigate through movie listings, view showtimes,
                        and book tickets with just a few taps.
                    </Text>
                    <Text style={styles.text}>
                        Movie Selection: Users can browse a wide range of movies, view detailed
                        information such as synopsis, cast, trailers, and ratings, and select
                        their preferred showtime.
                    </Text>
                    <Text style={styles.text}>
                        Seat Reservation: The system allows users to choose their seats from
                        available options in the theater, providing a visual representation of
                        the seating arrangement.
                    </Text>
                    <Text style={styles.text}>
                        Secure Payment: TicketPeedika ensures secure online payment processing,
                        allowing users to complete their bookings seamlessly using various
                        payment methods.
                    </Text>
                    <Text style={styles.text}>
                        Real-Time Updates: Users receive real-time updates on their bookings,
                        including confirmation details, ticket QR codes, and notifications for
                        upcoming shows.
                    </Text>
                    <Text style={styles.text}>
                        User Accounts: The platform offers user accounts for personalized
                        experiences, including order history, favorite movies, and profile
                        management.</Text>
                    <Text style={styles.text}>
                        By leveraging the capabilities of React Native, TicketPeedika delivers
                        a responsive and efficient mobile app experience across different
                        devices and operating systems. It caters to the growing demand for
                        convenient and digital solutions in the entertainment industry, making
                        movie ticket booking hassle-free and enjoyable for users.
                    </Text>
                    <Text style={[styles.text, { paddingBottom: responsiveHeight(5) }]}>
                        Thank you for using TicketPeedika!
                    </Text>
                </ScrollView>
            </ImageBackground>
        </View>
    );
};

export default About;
