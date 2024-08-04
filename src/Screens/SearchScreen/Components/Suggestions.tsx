/* eslint-disable prettier/prettier */
import React, { useContext, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { FlatList, StyleSheet, View, ActivityIndicator } from 'react-native';
import { popularMovies, baseImagePath } from '../../../api/apiCalls';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import MovieCard from '../../HomeScreen/Components/MovieCard';
import ThemeContext from '../../SettingScreen/Components/ThemeContext';

const Suggestions = () => {
    const { themeColors, highlightColor} = useContext(ThemeContext);

    const styles = StyleSheet.create({
        loadingContainer: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
        },
        flatlistView: {
            marginHorizontal: responsiveWidth(1),
            height: responsiveHeight(39.5),
            borderRadius: 30,
            backgroundColor: themeColors.secondary,
            elevation: 4,
            shadowColor: themeColors.text,
            paddingTop: responsiveHeight(1.5),
            marginTop: responsiveHeight(0.5),
        },
    });

    const [popularMoviesList, setPopularMoviesList] = useState<any>(null);
    const nav = useNavigation<any>();

    useEffect(() => {
        const fetchPopularMovies = async () => {
            try {
                let response = await fetch(popularMovies);
                let json = await response.json();
                setPopularMoviesList(json.results);
            } catch (error) {
                console.error('Error fetching popular movies:', error);
            }
        };

        fetchPopularMovies();
    }, []);

    if (!popularMoviesList) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size={'large'} color={highlightColor} />
            </View>
        );
    }

    return (
        <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={popularMoviesList}
            keyExtractor={(item: any) => item.id.toString()}
            renderItem={({ item }) => (
                <View style={styles.flatlistView}>
                    <MovieCard
                        cardFunction={() => nav.push('MovieDetails', { movieid: item.id })}
                        title={item.original_title}
                        imagePath={baseImagePath('w342', item.poster_path)}
                        vote_average={item.vote_average.toFixed(1)}
                        vote_count={item.vote_count}
                        largerSize={undefined}
                    />
                </View>
            )}
        />
    );
};

export default Suggestions;
