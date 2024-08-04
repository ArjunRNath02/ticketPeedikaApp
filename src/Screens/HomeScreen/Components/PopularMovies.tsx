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
import React, { useEffect, useState, useContext, forwardRef, useImperativeHandle } from 'react';
import MovieCard from './MovieCard';
import { useNavigation } from '@react-navigation/native';
import { popularMovies, baseImagePath } from '../../../api/apiCalls';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { movieNotFound } from '../../../themeComponents/Date';
import ThemeContext from '../../SettingScreen/Components/ThemeContext';
import { FONTFAMILY } from '../../../themeComponents/theme';

const PopularMovies = forwardRef((props, ref) => {
    const { themeColors,highlightColor } = useContext(ThemeContext);

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

    const [popularMoviesList, setPopularMoviesList] = useState<any>(undefined);
    const nav = useNavigation<any>();
    const [loading, setLoading] = useState(true);

    const fetchPopularMovies = async () => {
        try {
            setLoading(true);
            const response = await fetch(popularMovies);
            const json = await response.json();
            if (json && json.results && json.results.length > 0) {
                setPopularMoviesList(json.results);
            } else {
                console.error('No data found in popularMovies');
            }
        } catch (error) {
            console.error('Error fetching popularMovies', error);
        } finally {
            setLoading(false);
        }
    };
    useImperativeHandle(ref, () => ({
        fetchPopularMovies, // Expose fetchPopularMovies function to parent component using ref
    }));
    useEffect(() => {
        fetchPopularMovies(); // Fetch data on component mount
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
            <View style={{ flexDirection: 'row', gap: responsiveWidth(50) }}>
                <Text style={styles.headerMovie}>Popular Movies</Text>
                <TouchableOpacity onPress={() => { nav.navigate('ViewPopularMovies'); }}
                    style={{ top: responsiveHeight(1.5) }}>
                    <Text style={[styles.headerMovie, { fontSize: responsiveFontSize(1.4) }]}>View All</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={popularMoviesList}
                keyExtractor={(item: any) => item.id.toString()} // Ensure key is a string
                renderItem={({ item }) => {
                    return (
                        <View style={styles.flatlistView}>
                            <MovieCard
                                cardFunction={() => {
                                    nav.push('MovieDetails', { movieid: item.id });
                                }}
                                title={item.original_title}
                                imagePath={item.poster_path != null ? baseImagePath('w780', item.poster_path) : movieNotFound}
                                vote_average={item.vote_average.toFixed(1)}
                                vote_count={item.vote_count} largerSize={undefined} />
                        </View>
                    );
                }}
            />
        </View>
    );
});


export default PopularMovies;
