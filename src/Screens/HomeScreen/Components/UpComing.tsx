/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */

import {
    View,
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native';
import React, { useEffect, useState, useContext, useImperativeHandle, forwardRef } from 'react';
import MovieCard from './MovieCard';
import { useNavigation } from '@react-navigation/native';
import { upComing, baseImagePath } from '../../../api/apiCalls';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { movieNotFound } from '../../../themeComponents/Date';
import ThemeContext from '../../SettingScreen/Components/ThemeContext';
import { FONTFAMILY } from '../../../themeComponents/theme';

const UpComing = forwardRef((props, ref) => {
    const { themeColors ,highlightColor} = useContext(ThemeContext);

    const styles = StyleSheet.create({
        flatlistView: {
            marginHorizontal: responsiveWidth(-1.25),
            height: responsiveHeight(30),
            alignItems: 'center',
            borderRadius: 20,
            backgroundColor: 'transparent',
            elevation: 0, shadowColor: themeColors.text,
            paddingTop: responsiveHeight(1.5),
            marginTop: responsiveHeight(0.25),
        },
        headerMovie: {
            fontSize: responsiveFontSize(2),
            color: themeColors.text,
            fontFamily: FONTFAMILY.poppins_semibold,
        },
        loadingContainer: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
        },
        container: {
            flex: 1,
        },
    });

    const [upComingList, setupComingList] = useState<any>();
    const nav = useNavigation<any>();
    const [loading, setLoading] = useState(true);

    const fetchUpComingMovies = async () => {
        try {
            setLoading(true);
            const response = await fetch(upComing);
            const json = await response.json();
            if (json && json.results && json.results.length > 0) {
                setupComingList(json.results);
            } else {
                console.error('No data found in upComing');
            }
        } catch (error) {
            console.error('Error fetching upComing', error);
        } finally {
            setLoading(false);
        }
    };
    useImperativeHandle(ref, () => ({
        fetchUpComingMovies, // Expose fetchUpComingMovies function to parent component using ref
    }));

    useEffect(() => {
        fetchUpComingMovies(); // Fetch data on component mount
    }, []);

    if (loading) {
        return (
            <View style={[styles.container, styles.loadingContainer]}>
                <ActivityIndicator size="large" color={highlightColor} />
            </View>
        );
    }


    return (
        <View>
            <View style={{ flexDirection: 'row', gap: responsiveWidth(44) }}>
                <Text style={styles.headerMovie}>UpComing Movies</Text>
                <TouchableOpacity onPress={() => { nav.navigate('ViewUpComingMovies'); }}
                    style={{ top: responsiveHeight(1.5) }}>
                    <Text style={[styles.headerMovie, { fontSize: responsiveFontSize(1.4) }]}>View All</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={upComingList}
                keyExtractor={(item: any) => item.id.toString()} // Ensure key is a string
                renderItem={({ item }) => {
                    return (
                        <View style={styles.flatlistView}>
                            <MovieCard
                                cardFunction={() => {
                                    nav.push('CastMovieDetails', { movieid: item.id });
                                }}
                                title={item.original_title}
                                imagePath={item.poster_path != null ? baseImagePath('w780', item.poster_path) : movieNotFound}
                                vote_average={item.vote_average.toFixed(1)}
                                vote_count={item.vote_count}
                                largerSize={undefined}
                            />
                        </View>
                    );
                }}
            />
        </View>
    );
});

export default UpComing;
