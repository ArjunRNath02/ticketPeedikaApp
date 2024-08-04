/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-shadow */
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, Image, TouchableOpacity, ImageBackground, RefreshControl } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getMovieById } from '../../../api/movieService';
import AppHeader from '../../../themeComponents/AppHeader';
import { useNavigation } from '@react-navigation/native';
import { responsiveWidth, responsiveHeight } from 'react-native-responsive-dimensions';
import { baseImagePath } from '../../../api/apiCalls';
import ThemeContext from '../../SettingScreen/Components/ThemeContext';
import axios from 'axios';


const Favorite = () => {
  const { themeColors, background } = useContext(ThemeContext);
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: themeColors.secondary,
    },
    backgroundImage: {
      flex: 1,
      paddingHorizontal: responsiveWidth(5),
      paddingVertical: responsiveHeight(4),
    },
    listContainer: {
      paddingVertical: responsiveHeight(1),
      alignItems: 'center',
    },
    cardStyle: {
      paddingHorizontal: responsiveWidth(2),
      width: responsiveWidth(42), // Adjusted width for horizontal layout
      borderRadius: responsiveWidth(3),
      paddingVertical: responsiveHeight(1),
    },
    imageStyle: {
      height: responsiveHeight(28), // Adjusted height for horizontal layout
      borderRadius: responsiveWidth(3), // Adjusted border radius for horizontal layout
    },
  });

  const [userId, setUserId] = useState<any>();
  const [favoriteMovies, setFavoriteMovies] = useState<string[]>([]);
  const [moviesData, setMoviesData] = useState<any[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const nav = useNavigation<any>();

  const userInfo = useCallback(async () => {
    try {
      const userDetails = await AsyncStorage.getItem('userInfo');
      if (userDetails) {
        const userList = JSON.parse(userDetails);
        if (Array.isArray(userList.data) && userList.data.length > 0) {
          const UserID = userList.data[0]._id;
          setUserId(UserID);
        }
      }
    } catch (err) {
      console.log(err);
    }
  }, []);


  const loadFavorites = useCallback(async (userId: string) => {
    try {
      const response = await axios.get(`https://ticketpeedika.onrender.com/favorite/get-favorites/${userId}`);
      const favoriteMoviesData = response.data.data; // Assuming response.data.data is an array of favorite movies
      const movieIdsArray = favoriteMoviesData.map((movie: { movieId: any; }) => movie.movieId);
      setFavoriteMovies(movieIdsArray);
    } catch (error) {
      console.error('Error loading favorites:', error);
    }
  }, []);


  const fetchMoviesData = useCallback(async () => {
    try {
      const movies = await Promise.all(
        favoriteMovies.map(async (movieId) => {
          const response = await getMovieById(movieId);
          return response.data;
        })
      );
      setMoviesData(movies);
    } catch (e) {
      console.error('Error fetching movie data:', e);
    }
  }, [favoriteMovies]);

  const handleRefresh = () => {
    setRefreshing(true);
    loadFavorites(userId);
    fetchMoviesData();
    setRefreshing(false);
  };



  useEffect(() => {
    userInfo();
  }, [userInfo]);

  useEffect(() => {
    if (userId) {
      loadFavorites(userId);
    }
  }, [userId, loadFavorites]);

  useEffect(() => {
    fetchMoviesData();
  }, [fetchMoviesData]);

  const renderMovieItem = ({ item }: { item: any }) => (
    <TouchableOpacity onPress={() => nav.navigate('CastMovieDetails', { movieid: item.id })} style={styles.cardStyle}>
      <Image style={styles.imageStyle} source={{ uri: baseImagePath('w342', item.poster_path) }} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <ImageBackground source={background} blurRadius={0} style={styles.backgroundImage}>
        <AppHeader name="close" header={'Favorites'} action={() => nav.navigate('Home')} />
        <FlatList
          showsVerticalScrollIndicator={false}
          numColumns={2}
          data={moviesData}
          renderItem={renderMovieItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContainer}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              colors={[themeColors.primary, themeColors.secondary]} // Adjust colors as needed
            />
          }
        />
      </ImageBackground>
    </View>
  );
};

export default Favorite;
