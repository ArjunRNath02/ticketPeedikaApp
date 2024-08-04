/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect, useContext, useMemo } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity, Dimensions, FlatList, ImageBackground, Image } from 'react-native';
import { apikey, baseImagePath, searchMovies } from '../../../api/apiCalls';
import { FONTFAMILY } from '../../../themeComponents/theme';
import SearchBar from '../Components/SearchBar';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import SearchMovieCard from '../Components/SearchMovieCard';
import { genres, languages, movieNotFound, searchWait } from '../../../themeComponents/Date';
import GenreCard from '../Components/GenreCard';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ThemeContext from '../../SettingScreen/Components/ThemeContext';
import BottomSheet from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const ITEM_SIZE = 205;

const Search = ({ navigation }: any) => {
  const { themeColors, background, highlightColor } = useContext(ThemeContext);
  const snapPoints = useMemo(() => ['25%', '50%', '100%'], []);
  const [showFilter, setShowFilter] = useState<any>(false); // State to manage filter visibility
  const [loading, setLoading] = useState(true);
  const toggleFilter = () => {
    setShowFilter(!showFilter); // Toggle filter visibility
  };

  const styles = StyleSheet.create({
    container: {
      display: 'flex',
      flex: 1,
      backgroundColor: themeColors.secondary,
    },
    suggestionText: {
      fontSize: responsiveFontSize(2),
      fontFamily: FONTFAMILY.poppins_semibold,
      color: themeColors.text,
      left: responsiveWidth(7), alignSelf: 'flex-start',
    },
    genreButton: {
      backgroundColor: highlightColor,
      padding: 10,
      marginVertical: 5,
      borderRadius: 5,
    },
    filterButton: {
      marginTop: responsiveHeight(80),
      paddingVertical: responsiveHeight(2),
      paddingHorizontal: responsiveWidth(4),
      marginRight: responsiveWidth(0),
      backgroundColor: highlightColor,
      borderRadius: 999,
      aspectRatio: 1 / 1,
      position:'absolute',
      left:responsiveWidth(78),
    },
    filterHeaderText: {
      fontSize:responsiveFontSize(2.6),
      fontFamily: FONTFAMILY.poppins_semibold,
      color: themeColors.text,
      left:responsiveWidth(5),
    },
  });

  const scrollY = React.useRef(new Animated.Value(0)).current;
  const { width } = Dimensions.get('screen');
  const [searchList, setSearchList] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(true); // Track suggestion visibility
  const [searchPerformed, setSearchPerformed] = useState(false);

  const searchMoviesFunction = async (name: string, genreId?: number, languageId?: string) => {
    try {
      setLoading(false);
      let url;
      if (name && !genreId && !languageId) {
        // Search by name using the old API
        url = searchMovies(name);
      } else if (genreId && !name && !languageId) {
        // Search by genre using the new discover movie API
        url = `https://api.themoviedb.org/3/discover/movie?api_key=${apikey}&sort_by=release_date.desc&include_adult=false&page=1&vote_count.gte=100&with_genres=${genreId}`;
      } else if (!genreId && !name && languageId) {
        // Search by original language
        url = `https://api.themoviedb.org/3/discover/movie?api_key=${apikey}&sort_by=release_date.desc&include_adult=false&page=1&vote_count.gte=100&with_original_language=${languageId}`;
      } else if (genreId && !name && languageId) {
        // Search by genre and original language
        url = `https://api.themoviedb.org/3/discover/movie?api_key=${apikey}&sort_by=release_date.desc&include_adult=false&page=1&vote_count.gte=100&with_genres=${genreId}&with_original_language=${languageId}`;
      } else {
        console.error('Invalid search criteria');
        return;
      }
      let response = await fetch(url);
      let json = await response.json();
      const searchResults = json.results.slice(0, 30); // Load only the newest 30 movies
      setSearchList(searchResults);
      setShowSuggestions(false); // Hide suggestions after search
      setSearchPerformed(true);
    } catch (error) {
      console.error('Error at searchMovies', error);
      setLoading(true);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setShowSuggestions(true); // Show suggestions when screen is focused (user goes back)
    });
    return unsubscribe;
  }, [navigation]);

  const handleBackPress = () => {
    if (searchPerformed) {
      // If a search has been performed, navigate back to the search results
      setSearchPerformed(false);
      setSearchList([]);
      setLoading(true);
    } else {
      setShowSuggestions(!showSuggestions);
      navigation.goBack();
      setLoading(true);
    }
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <ImageBackground source={background}
          blurRadius={0} style={{
            flex: 1, alignItems: 'center',
          }}>
          <TouchableOpacity
            style={{
              alignItems: 'center',
              paddingVertical: responsiveHeight(4.5),
              width: '90%', flexDirection: 'row',
            }}>
            <TouchableOpacity
              onPress={handleBackPress}
              style={{ flexDirection: 'row', alignItems: 'center', right: responsiveWidth(3) }}
            >
              <Ionicons name="arrow-back-circle" size={45} color={highlightColor} style={{ left: responsiveWidth(3) }} />
            </TouchableOpacity>
            <SearchBar searchFunction={searchMoviesFunction} clearSearchResults={() => setSearchList([])} />
          </TouchableOpacity>


          <Animated.FlatList
            contentContainerStyle={{ bottom: responsiveHeight(1.5) }}
            numColumns={1}
            showsVerticalScrollIndicator={false}
            data={searchList}
            onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }],
              { useNativeDriver: true })}
            keyExtractor={(item: any) => item.id}
            renderItem={({ item, index }) => {
              const inputRange = [-1, 0, ITEM_SIZE * index, ITEM_SIZE * (index + 2)];
              const scale = scrollY.interpolate({ inputRange, outputRange: [1, 1, 1, 0] });
              return (
                <Animated.View style={{ transform: [{ scale }] }}>
                  <SearchMovieCard
                    cardFunction={() => {
                      navigation.push('MovieDetails', { movieid: item.id });
                    }}
                    cardWidth={width / 2}
                    title={item.title}
                    imagePath={item.poster_path != null ? baseImagePath('w780', item.poster_path) : movieNotFound}
                    vote_average={item.vote_average}
                    vote_count={item.vote_count !== undefined ? item.vote_count.toString() : ''}
                    genreId={item.genre_id}
                    year={item.release_date ? item.release_date.substring(0, 4) : ''}
                  />
                </Animated.View>
              );
            }}
          />

          <TouchableOpacity
            style={styles.filterButton}
            onPress={toggleFilter} // Call toggleFilter function when pressed
          >
            <AntDesign name="filter" size={30} color={themeColors.pureWhite} />
          </TouchableOpacity>
          {showFilter && (
            <View style={{ ...StyleSheet.absoluteFillObject, zIndex: 999 }}>
            <BottomSheet index={1} snapPoints={snapPoints}
              backgroundStyle={{ backgroundColor: themeColors.Mgrey }}>
              <View style={{
                width: '100%', gap: responsiveHeight(1.5), alignItems: 'center',
              }}>
                <View style={{flexDirection:'row'}}>
                  <Text style={styles.filterHeaderText}>Filter</Text>
                <TouchableOpacity style={{ left: responsiveWidth(30),bottom:responsiveHeight(0.4) }}
                  onPress={toggleFilter}>
                  <Ionicons name="close-circle-outline" size={34} color={themeColors.text} />
                </TouchableOpacity>
                </View>
                <Text style={styles.suggestionText}>Genres</Text>
                <FlatList
                  data={genres}
                  numColumns={3}
                  keyExtractor={(item) => item.id.toString()}
                  renderItem={({ item }) => (
                    <GenreCard image={item.img} name={item.name}
                      onPress={() => searchMoviesFunction('', item.id)} />
                  )}
                />
                <Text style={styles.suggestionText}>Languages</Text>
                <FlatList
                  data={languages}
                  numColumns={3}
                  keyExtractor={(item) => item.id.toString()}
                  renderItem={({ item }) => (
                    <GenreCard image={item.img} name={item.language}
                      onPress={() => searchMoviesFunction('', 0, item.sym)} />
                  )}
                />

              </View>
            </BottomSheet>
            </View>
          )}
           {loading && (
            <View style={{ position: 'absolute', alignSelf:'center',justifyContent:'center',top:responsiveHeight(20)}}>
              <Image source={searchWait} style={{height:responsiveHeight(50) ,width:responsiveWidth(100)}}/>
            </View>
          )}
        </ImageBackground>
      </View>
    </GestureHandlerRootView>
  );
};

export default Search;
