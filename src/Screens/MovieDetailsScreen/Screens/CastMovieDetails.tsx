/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useMemo, useCallback, useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, ImageBackground, StatusBar, Image, FlatList, TouchableOpacity, Linking, RefreshControl } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { baseImagePath, movieCastDetails, movieDetails, similarMovies } from '../../../api/apiCalls';
import AppHeader from '../../../themeComponents/AppHeader';
import CategoryHeader from '../Components/CategoryHeader';
import CastCard from '../Components/CastCard';
import { useNavigation } from '@react-navigation/native';
import { FONTFAMILY } from '../../../themeComponents/theme';
import LinearGradient from 'react-native-linear-gradient';
import CustomIcon from '../../../themeComponents/CustomIcon';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { APPEND_TO_RESPONSE as AR } from '../../../api/urls';
import { getMovieById, getVideo } from '../../../api/movieService';
import { responsiveWidth, responsiveHeight } from 'react-native-responsive-dimensions';
import MovieSimilarCard from '../Components/MovieSimilarCard';
import { actorImg, movieNotFound } from '../../../themeComponents/Date';
import ThemeContext from '../../SettingScreen/Components/ThemeContext';
import axios from 'axios';


const CastMovieDetails = ({ navigation, route }: any) => {
  const { themeColors, background, highlightColor } = useContext(ThemeContext);

  const styles = StyleSheet.create({
    container: {
      display: 'flex',
      flex: 1,
      backgroundColor: themeColors.secondary,
    },
    loadingContainer: {
      flex: 1,
      alignSelf: 'center',
      justifyContent: 'center',
    },
    scrollViewContainer: {
      flex: 1,
    },
    appHeaderContainer: {
      marginHorizontal: 36,
      marginTop: 40, flexDirection: 'row',
    },
    fav: {
      left: responsiveWidth(55),
      top: responsiveHeight(0),
    },
    imageBG: {
      width: '100%',
      aspectRatio: 3072 / 1727,
    },
    linearGradient: {
      height: '100%',
    },
    cardImage: {
      width: '60%',
      aspectRatio: 200 / 300,
      position: 'absolute',
      alignSelf: 'center', bottom: 0,
    },
    clockIcon: {
      marginRight: 8, bottom: 2,
    },
    runtimeText: {
      fontSize: 14,
      color: themeColors.grey, fontFamily: FONTFAMILY.poppins_regular,
    },
    timeContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: 15, right: 12,
    },
    title: {
      fontSize: 26, fontFamily: FONTFAMILY.poppins_semibold,
      color: themeColors.text,
      marginHorizontal: 36,
      marginVertical: 15,
      textAlign: 'center',
    },
    genreBox: {
      borderColor: highlightColor,
      borderWidth: 1,
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: 25,
    },
    genreContainer: {
      flex: 1,
      flexDirection: 'row',
      gap: 20,
      flexWrap: 'wrap',
      justifyContent: 'center',
    },
    genreText: {
      fontSize: 10,
      color: highlightColor, fontFamily: FONTFAMILY.poppins_regular,
    },
    TagLine: {
      fontSize: 14,
      fontStyle: 'italic',
      color: themeColors.text,
      marginHorizontal: 36,
      marginVertical: 15,
      textAlign: 'center', fontFamily: FONTFAMILY.poppins_regular,
    },
    infoContainer: {
      marginHorizontal: 24,
    },
    rateContainer: {
      flexDirection: 'row',
      gap: 10,
      alignItems: 'center',
    },
    descriptionText: {
      fontSize: 14,
      color: themeColors.grey, fontFamily: FONTFAMILY.poppins_regular,
    },
    containerGap24: {
      gap: 24,
    },
    buttonBG: {
      alignItems: 'center',
      marginVertical: 24,
    },
    buttonText: {
      borderRadius: 50,
      paddingHorizontal: 26,
      paddingVertical: 15,
      backgroundColor: highlightColor,
      fontSize: 18,
      color: themeColors.pureWhite,
      fontFamily: FONTFAMILY.poppins_semibold,
    },
    flatlistView: {
      height: responsiveHeight(28),
      alignItems: 'center',
      left: responsiveWidth(5),
    },
  });

  const movieId = route.params.movieid;
  const nav = useNavigation<any>();
  const [userId, setUserId] = useState();
  const [movieData, setMovieData] = useState<any>(undefined);
  const [movieCastData, setMovieCastData] = useState<any>([]);
  const [similarMoviesData, setSimilarMoviesData] = useState<any>([]);
  const [movie, setMovie] = useState<any>({});
  const [selectedHeartIndex, setSelectedHeartIndex] = useState<boolean>(false);
  const [favoriteMovies, setFavoriteMovies] = useState<string[]>([]);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  // Memoized asynchronous functions
  const getMovieDetails = useMemo(
    () => async (movieid: number) => {
      try {
        let response = await fetch(movieDetails(movieid));
        let json = await response.json();
        return json;
      } catch (error) {
        console.error('Something went wrong in getMoviesDetails', error);
      }
    },
    []
  );

  const getMovieCastDetails = useMemo(
    () => async (movieid: number) => {
      try {
        let response = await fetch(movieCastDetails(movieid));
        let json = await response.json();
        return json.cast;
      } catch (error) {
        console.error('Something went wrong in getMoviesCastDetails', error);
      }
    },
    []
  );

  const getSimilarMovies = useMemo(
    () => async (movieid: number) => {
      try {
        let response = await fetch(similarMovies(movieid));
        let json = await response.json();
        return json.results;
      } catch (error) {
        console.error('Something went wrong in getSimilarMovies', error);
      }
    },
    []
  );

  useEffect(() => {

    // Fetch data using memoized functions
    getMovieDetails(movieId).then((tempMovieData) => setMovieData(tempMovieData));
    getMovieCastDetails(movieId).then((tempMovieCastData) => setMovieCastData(tempMovieCastData));
    getSimilarMovies(movieId).then((tempSimilarMoviesData) => setSimilarMoviesData(tempSimilarMoviesData));

    getMovieById(movieId, `${AR.VIDEOS}`).then((response: { data: any }) => setMovie(response?.data));
  }, []);

  useEffect(() => {
    // Fetch user data from AsyncStorage
    const fetchUserData = async () => {
      try {
        const userDetails = await AsyncStorage.getItem('userInfo');
        if (userDetails) {
          const userList = JSON.parse(userDetails);
          if (Array.isArray(userList.data) && userList.data.length > 0) {
            const userID = userList.data[0]._id;
            setUserId(userID);

            const response = await axios.get(`https://ticketpeedika.onrender.com/favorite/get-favorites/${userID}`);
            const favoriteMoviesData = response.data.data; // Assuming response.data.data is an array of favorite movies
            const movieIdsArray = favoriteMoviesData.map((movie: { movieId: any; }) => movie.movieId);

            const existingFavorite = movieIdsArray.includes(route.params.movieid.toString());
            setSelectedHeartIndex(existingFavorite);
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    // Fetch user data when the component mounts
    fetchUserData();
  }, []);


  // Toggle favorite movie
  const toggleFavorite = useCallback(async () => {
    try {
      const movieId = route.params.movieid.toString();
      const response = await axios.get(`https://ticketpeedika.onrender.com/favorite/get-favorites/${userId}`);
      const favoriteMoviesData = response.data.data;
      const movieIdsArray = favoriteMoviesData.map((movie: { movieId: any; }) => movie.movieId);

      const existingFavorite = movieIdsArray.includes(route.params.movieid.toString());

      if (!existingFavorite) {
        // Add movie to favorites
        const response = await axios.post('https://ticketpeedika.onrender.com/favorite/add-favorite', {
          userId: userId,
          movieId: movieId.toString(),
        });
        if (response.data.status === 'SUCCESS') {
          setFavoriteMovies([...favoriteMovies, movieId]);
          setSelectedHeartIndex(true);
        } else {
          console.error('Failed to add movie to favorites:', response.data.message);
        }
      } else {
        // Remove movie from favorites
        try {
          const response = await axios.delete('https://ticketpeedika.onrender.com/favorite/remove-favorite', {
            data: {
              userId: userId,
              movieId: movieId.toString(),
            },
          });
          if (response.data.status === 'SUCCESS') {
            const updatedFavorites = favoriteMovies.filter(id => id !== movieId);
            setFavoriteMovies(updatedFavorites);
            setSelectedHeartIndex(false);
          } else {
            console.error('Failed to remove movie from favorites:', response.data.message);
          }
        } catch (error) {
          console.error('Error removing favorite movie:', error);
        }

      }
    } catch (error) {
      console.error('Error toggling favorite movie:', error);
    }
  }, [favoriteMovies, route.params.movieid, userId]);


  // Refresh function to reload data
  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    // Fetch data using memoized functions after refreshing
    getMovieDetails(movieId).then((tempMovieData) => setMovieData(tempMovieData));
    getMovieCastDetails(movieId).then((tempMovieCastData) => setMovieCastData(tempMovieCastData));
    getSimilarMovies(movieId).then((tempSimilarMoviesData) => setSimilarMoviesData(tempSimilarMoviesData));

    getMovieById(movieId, `${AR.VIDEOS}`).then((response: { data: any }) => setMovie(response?.data));

    // Simulate a delay for refresh
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, [movieId]);

  if (
    movieData == undefined &&
    movieData == null &&
    movieCastData == undefined &&
    movieCastData == null
  ) {
    return ( //ActivityLoader
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollViewContainer}
        bounces={false}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
          />
        }
      >
        <StatusBar hidden />
        <View style={styles.appHeaderContainer}>
          <AppHeader
            header={''}
            action={() => navigation.goBack()}
          />
        </View>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size={'large'} color={highlightColor} />
        </View>
      </ScrollView>
    );
  }

  return (
    <ScrollView //Main
      style={styles.container}
      bounces={false}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={handleRefresh}
        />}>
      <StatusBar hidden />
      <ImageBackground
        source={{ uri: baseImagePath('w780', movieData?.backdrop_path) }}
        style={styles.imageBG}
      >
        <LinearGradient
          colors={[themeColors.Grad, themeColors.secondary]}
          style={styles.linearGradient}
        >
          <View style={styles.appHeaderContainer}>
            <AppHeader
              name="close"
              header={''}
              action={() => navigation.goBack()}
            />
            <TouchableOpacity style={styles.fav} onPress={toggleFavorite}>
              <Ionicons
                name={selectedHeartIndex ? 'heart' : 'heart-outline'}
                size={35}
                color={selectedHeartIndex ? themeColors.red : highlightColor}
              />

            </TouchableOpacity>
          </View>
        </LinearGradient>
      </ImageBackground>
      <ImageBackground source={background}
        blurRadius={0}>
        <LinearGradient
          colors={[themeColors.secondary, themeColors.Grad]}>
          <View>
            <View  //Poster,TrailerIcon
              style={{ paddingHorizontal: responsiveWidth(2.5) }}>
              <View style={styles.imageBG} />
              <Image
                source={{ uri: movieData?.poster_path ? baseImagePath('w780', movieData?.poster_path) : movieNotFound }}
                style={styles.cardImage}
              />
              <Ionicons name="play-circle-outline" size={70} color={highlightColor}
                style={{
                  alignSelf: 'center',
                  bottom: 130,
                }}
                onPress={() => Linking.openURL(getVideo(movie.videos.results[0].key))} />
            </View>
            <View  //ClockIcon,Runtime
              style={styles.timeContainer}>
              <CustomIcon name="clock" size={24} color={themeColors.grey} style={styles.clockIcon} />
              <Text style={styles.runtimeText}>
                {Math.floor(movieData?.runtime / 60)}h {movieData?.runtime % 60}m
              </Text>
            </View>
            <View  //MovieName,Genre,TagLine
            >
              <Text style={styles.title}>{movieData?.original_title}</Text>
              <View style={styles.genreContainer}>

                {movieData?.genres && movieData.genres.map((item: any) => {
                  return (
                    <View style={styles.genreBox} key={item.id}>
                      <Text style={styles.genreText}>{item.name}</Text>
                    </View>
                  );
                })}

              </View>
              <Text style={styles.TagLine}>{movieData?.tagline}</Text>
            </View>
            {movieData && (
              <View //Description,Date,Rating
                style={styles.infoContainer}>
                <View style={styles.rateContainer}>
                  <CustomIcon name="star" size={20} color={themeColors.gold} />
                  <Text style={styles.runtimeText}>
                    {movieData.vote_average ? movieData.vote_average.toFixed(1) : '-'} (
                    {movieData.vote_count})
                  </Text>
                  {movieData.release_date && (
                    <Text style={styles.runtimeText}>
                      {movieData.release_date.substring(8, 10)}{' '}
                      {new Date(movieData.release_date).toLocaleString('default', {
                        month: 'long',
                      })}{' '}
                      {movieData.release_date.substring(0, 4)}
                    </Text>
                  )}
                </View>
                <Text style={styles.descriptionText}>{movieData.overview}</Text>
              </View>
            )}


            {movieCastData && movieCastData.length > 0 && (
              <View  //CastData
              ><StatusBar hidden />
                <CategoryHeader title="Top Cast" />
                <FlatList
                  data={movieCastData}
                  keyExtractor={(item: any) => item.id}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.containerGap24}
                  renderItem={({ item, index }) => (
                    <CastCard
                      cardFunction={() => {
                        nav.push('CastDetails', { actorId: item.id });
                      }}
                      shouldMarginatedAtEnd={true}
                      cardWidth={80}
                      isFirst={index == 0 ? true : false}
                      isLast={index == movieCastData?.length - 1 ? true : false}
                      imagePath={item.profile_path != null ? baseImagePath('w185', item.profile_path) : actorImg}
                      title={item.original_name}
                      subtitle={item.character}
                    />
                  )}
                /></View>)}
            {similarMoviesData && similarMoviesData.length > 0 && (
              <View>
                <CategoryHeader title="Similar Movies" />
                <FlatList
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  data={similarMoviesData}
                  keyExtractor={(item: any) => item.id.toString()} // Ensure key is a string
                  renderItem={({ item }) => {
                    return (
                      <View style={styles.flatlistView}>
                        <MovieSimilarCard
                          cardFunction={() => {
                            nav.push('CastMovieDetails', { movieid: item.id });
                          }}
                          title={item.original_title}
                          imagePath={item.poster_path != null ? baseImagePath('w185', item.poster_path) : movieNotFound} />
                      </View>
                    );
                  }}
                />
              </View>)}

          </View>
        </LinearGradient>
      </ImageBackground>
    </ScrollView>
  );
};


export default CastMovieDetails;
