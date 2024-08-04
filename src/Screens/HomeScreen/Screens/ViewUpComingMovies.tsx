/* eslint-disable prettier/prettier */
import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { FlatList, ImageBackground, RefreshControl, StatusBar, StyleSheet, TouchableOpacity, View } from 'react-native';
import ThemeContext from '../../SettingScreen/Components/ThemeContext';
import AppHeader from '../../../themeComponents/AppHeader';
import { useNavigation } from '@react-navigation/native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { baseImagePath, upComing } from '../../../api/apiCalls';
import { movieNotFound } from '../../../themeComponents/Date';
import MovieCard from '../Components/MovieCard';
import CustomIcon from '../../../themeComponents/CustomIcon';

const ViewUpComingMovies = () => {
    const nav = useNavigation<any>();
    const { themeColors, background } = useContext(ThemeContext);
    const [upComingList, setUpComingList] = useState<any>([]);
    const [refreshing, setRefreshing] = useState(false);

    const fetchUpComingList = useCallback(async () => {
        try {
            let response = await fetch(upComing);
            let json = await response.json();
            setUpComingList([...json.results]);
        } catch (error) {
            console.error('Something went wrong in upComing', error);
        } finally {
            setRefreshing(false);
        }
    }, []);

    const handleRefresh = useCallback(() => {
        setRefreshing(true);
        fetchUpComingList();
    }, [fetchUpComingList]);

    useEffect(() => {
        fetchUpComingList();
    }, [fetchUpComingList]);

    const styles = useMemo(
        () =>
            StyleSheet.create({
                container: {
                    backgroundColor: themeColors.secondary,
                    flex: 1,
                    paddingHorizontal: responsiveWidth(5),
                    paddingVertical: responsiveHeight(2),
                },
                flatList: {
                    marginBottom: responsiveHeight(-3),
                },
                searchView: {
                    bottom: responsiveHeight(4.5),
                    left: responsiveWidth(80),
                },
            }),
        [themeColors.secondary]
    );

    return (
        <View style={styles.container}>
            <StatusBar hidden />
            <ImageBackground source={background} />
            <View>
                <AppHeader
                    name="close"
                    header="UpComing Movies"
                    action={() => nav.goBack()}
                />
                <TouchableOpacity
                    onPress={() => {
                        nav.navigate('Search');
                    }}
                    style={styles.searchView}
                >
                    <CustomIcon
                        name="search"
                        size={responsiveFontSize(3.5)}
                        color={themeColors.text}
                    />
                </TouchableOpacity>
            </View>
            <View style={{ marginBottom: responsiveHeight(7) }}>
                <FlatList
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={handleRefresh}
                            colors={[themeColors.primary]}
                            progressBackgroundColor={themeColors.background}
                        />
                    }
                    numColumns={3}
                    showsHorizontalScrollIndicator={false}
                    data={upComingList}
                    keyExtractor={(item: any) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.flatList}>
                            <MovieCard
                                cardFunction={() => {
                                    nav.push('CastMovieDetails', { movieid: item.id });
                                } }
                                title=""
                                imagePath={item.poster_path != null
                                    ? baseImagePath('w780', item.poster_path)
                                    : movieNotFound}
                                smallerSize largerSize={undefined}                            />
                        </View>
                    )}
                />
            </View>
        </View>
    );
};

export default ViewUpComingMovies;
