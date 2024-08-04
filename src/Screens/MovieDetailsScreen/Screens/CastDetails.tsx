/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, ImageBackground, Image, Dimensions, FlatList, StatusBar, ActivityIndicator, RefreshControl } from 'react-native';
import { FONTFAMILY } from '../../../themeComponents/theme';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import AppHeader from '../../../themeComponents/AppHeader';
import { actorDetails, actorMovies, baseImagePath } from '../../../api/apiCalls';
import { useNavigation } from '@react-navigation/native';
import MovieSimilarCard from '../Components/MovieSimilarCard';
import { actorImg, movieNotFound } from '../../../themeComponents/Date';
import ThemeContext from '../../SettingScreen/Components/ThemeContext';

const CastDetails = ({ route }: any) => {
    const { themeColors, background, highlightColor } = useContext(ThemeContext);

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: themeColors.secondary,
        },
        imgBck: {
            flex: 1,
            paddingVertical: responsiveHeight(4),
            paddingHorizontal: responsiveWidth(4),
        },
        imgCastView: {
            alignItems: 'center',
            overflow: 'hidden',
        },
        imgMainView: {
            alignSelf:'center',
            justifyContent: 'center',
        },
        castDetView: {
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: responsiveHeight(1),
        },
        castText: {
            color: themeColors.text,
            fontFamily: FONTFAMILY.poppins_semibold,
            fontSize: responsiveFontSize(2.2),
        },
        detTextView: {
            marginHorizontal: responsiveWidth(1),
            marginTop: responsiveHeight(2),
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 7,
            backgroundColor: highlightColor,
            borderRadius: 40,
        },
        DataView: {
            borderRightWidth: 2,
            alignItems: 'center',
            paddingHorizontal: responsiveHeight(1),
            borderRightColor: themeColors.grey,
        },
        descTextView: {
            marginVertical: responsiveHeight(2),
            marginHorizontal: responsiveWidth(4),
            padding: 2,
        },
        descText: {
            color: themeColors.text,
            fontFamily: FONTFAMILY.poppins_regular,
            fontSize: responsiveFontSize(1.55),
        },
        flatlistView: {
            height: responsiveHeight(28),
            alignItems: 'center',
            left: responsiveWidth(0),
            marginTop: responsiveHeight(1.5),
        },
        moviesView: {
            marginHorizontal: responsiveWidth(5),
        },
        loaderContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: themeColors.secondary, // Optional background color for the loader container
        },
    });


    const nav = useNavigation<any>();
    const { width, height } = Dimensions.get('screen');
    const [actorInfo, setActorInfo] = useState<any>(undefined);
    const [actorMoviesDet, setActorMoviesDet] = useState<any>(undefined);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false); // Add refreshing state

    const fetchData = useCallback(async () => {
        try {
            const [actorInfoResponse, actorMoviesResponse] = await Promise.all([
                fetch(actorDetails(route.params.actorId)).then(res => res.json()),
                fetch(actorMovies(route.params.actorId)).then(res => res.json()),
            ]);
            setActorInfo(actorInfoResponse);
            setActorMoviesDet(actorMoviesResponse.cast);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false); // Set loading to false regardless of success or error
            setRefreshing(false); // Set refreshing to false after data fetch
        }
    }, [route.params.actorId]);

    const handleRefresh = () => {
        setRefreshing(true); // Set refreshing to true when refreshing starts
        fetchData();
    };

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    if (loading) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color={highlightColor} />
            </View>
        );
    }


    return (
        <ScrollView style={styles.container}
            bounces={false} showsVerticalScrollIndicator={false}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} colors={[highlightColor]} />} >
            <StatusBar hidden />
            <ImageBackground source={background} blurRadius={0} style={styles.imgBck}>
                <View style={{marginLeft:responsiveWidth(3)}}>
                    <AppHeader name="close" header={''} action={() => nav.goBack()}  //AppHeader
                    />
                </View>
                <View>
                    <View style={styles.imgMainView}>
                        <View style={styles.imgCastView}>
                            <Image
                                source={
                                    actorInfo && actorInfo.profile_path
                                        ? { uri: baseImagePath('w780', actorInfo.profile_path) }
                                        : { uri: actorImg }
                                }
                                style={{
                                    height: actorInfo && actorInfo.profile_path ? height * 0.35 : height * 0.25,
                                    width: actorInfo && actorInfo.profile_path ? width * 0.5 : width * 0.75,
                                    bottom: responsiveHeight(actorInfo && actorInfo.profile_path ? 1 : 0),
                                }}
                                resizeMode="contain" />
                        </View>
                    </View>
                    <View style={styles.castDetView}>
                        <Text style={styles.castText}>{actorInfo?.name ?? 'Not Found'}</Text>
                        <Text style={[styles.castText, { fontSize: responsiveFontSize(1.5), fontFamily: FONTFAMILY.poppins_regular }]}>{actorInfo?.place_of_birth ?? 'Not Found'}</Text>
                    </View>
                    <View style={styles.detTextView}>
                        <View style={styles.DataView}>
                            <Text style={[styles.castText, { fontSize: responsiveFontSize(1.5), color: themeColors.pureWhite }]}>Gender</Text>
                            <Text style={[styles.castText, { fontSize: responsiveFontSize(1.5), color: themeColors.pureWhite }]}>{actorInfo?.gender ? (actorInfo.gender === 1 ? 'Female' : 'Male') : 'Not Found'}</Text>
                        </View>
                        <View style={styles.DataView}>
                            <Text style={[styles.castText, { fontSize: responsiveFontSize(1.5), color: themeColors.pureWhite }]}>Birthday</Text>
                            <Text style={[styles.castText, { fontSize: responsiveFontSize(1.5), color: themeColors.pureWhite }]}>{actorInfo?.birthday ?? 'Not Found'}</Text>
                        </View>
                        <View style={styles.DataView}>
                            <Text style={[styles.castText, { fontSize: responsiveFontSize(1.5), color: themeColors.pureWhite }]}>Known For</Text>
                            <Text style={[styles.castText, { fontSize: responsiveFontSize(1.5), color: themeColors.pureWhite }]}>{actorInfo?.known_for_department ?? 'Not Found'}</Text>
                        </View>
                        <View style={[styles.DataView, { borderRightWidth: 0 }]}>
                            <Text style={[styles.castText, { fontSize: responsiveFontSize(1.5), color: themeColors.pureWhite }]}>Popularity</Text>
                            <Text style={[styles.castText, { fontSize: responsiveFontSize(1.5), color: themeColors.pureWhite }]}>{actorInfo?.popularity ? `${actorInfo.popularity.toFixed(2)}%` : '0%'}</Text>
                        </View>
                    </View>
                    <View style={styles.descTextView}>
                        <Text style={[styles.castText, { fontSize: responsiveFontSize(2), fontFamily: FONTFAMILY.poppins_semibold }]}>Biography</Text>
                        <Text style={styles.descText}>{actorInfo?.biography !== '' ? actorInfo?.biography : 'Not Found'}</Text>
                    </View>
                    <View style={styles.moviesView}>
                        <Text style={[styles.castText, { fontSize: responsiveFontSize(2), fontFamily: FONTFAMILY.poppins_semibold }]}>Movies</Text>
                        <FlatList
                            contentContainerStyle={styles.flatlistView}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            data={actorMoviesDet}
                            keyExtractor={(item, index) => item.id.toString() + index.toString()}
                            renderItem={({ item }) => (
                                <View style={styles.flatlistView}>
                                    <MovieSimilarCard cardFunction={() => nav.push('CastMovieDetails', { movieid: item.id })} title={item.title} imagePath={item.poster_path != null ? baseImagePath('w780', item.poster_path) : movieNotFound} />
                                </View>
                            )}
                        />
                    </View>
                </View>
            </ImageBackground>
        </ScrollView>
    );
};

export default CastDetails;
