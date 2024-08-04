/* eslint-disable prettier/prettier */
import React from 'react';
import { NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Splash from './src/Screens/SplashScreen/Screens/Splash';
import SelectCity from './src/Screens/HomeScreen/Screens/SelectCity';
import BookingDetails from './src/Screens/MovieBookingScreens/BookingDetails';
import Seat from './src/Screens/MovieBookingScreens/Seat';
import PayMoney from './src/Screens/MovieBookingScreens/PayMoney';
import Login from './src/Screens/UserLoginScreen/Screens/Login';
import MovieDetails from './src/Screens/MovieDetailsScreen/Screens/MovieDetails';
import SuccessfulPay from './src/Screens/MovieBookingScreens/SuccessfulPay';
import BottomTabNavigator from './src/Screens/TabBarScreens/Screens/BottomTabNavigator';
import Account from './src/Screens/SettingScreen/Screens/Account';
import Settings from './src/Screens/SettingScreen/Screens/Settings';
import FoodDetails from './src/Screens/FoodSelectionScreen/Screens/FoodDetails';
import ForgotPassword from './src/Screens/UserLoginScreen/Screens/ForgotPassword';
import About from './src/Screens/SettingScreen/Screens/About';
import Favorite from './src/Screens/TabBarScreens/Screens/Favorite';
import CastDetails from './src/Screens/MovieDetailsScreen/Screens/CastDetails';
import CastMovieDetails from './src/Screens/MovieDetailsScreen/Screens/CastMovieDetails';
import { ThemeProvider } from './src/Screens/SettingScreen/Components/ThemeContext';
import ViewPopularMovies from './src/Screens/HomeScreen/Screens/ViewPopularMovies';
import ViewUpComingMovies from './src/Screens/HomeScreen/Screens/ViewUpComingMovies';


const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Splash"
          screenOptions={{ headerShown: false}}>
          <Stack.Screen name="Tab" component={BottomTabNavigator} options={{animation: 'fade'}}/>
          <Stack.Screen name="Splash" component={Splash} />
          <Stack.Screen name="SelectCity" component={SelectCity} options={{animation: 'fade_from_bottom'}}/>
          <Stack.Screen name="BookingDetails" component={BookingDetails} options={{animation: 'slide_from_right'}}/>
          <Stack.Screen name="Seat" component={Seat} options={{animation: 'slide_from_right'}}/>
          <Stack.Screen name="PayMoney" component={PayMoney} options={{animation: 'slide_from_right'}}/>
          <Stack.Screen name="Login" component={Login} options={{animation: 'fade'}}/>
          <Stack.Screen name="MovieDetails" component={MovieDetails} options={{animation: 'fade_from_bottom'}}/>
          <Stack.Screen name="SuccessfulPay" component={SuccessfulPay} options={{animation: 'fade'}}/>
          <Stack.Screen name="Account" component={Account} options={{animation: 'slide_from_right'}}/>
          <Stack.Screen name="Settings" component={Settings} options={{animation: 'slide_from_right'}}/>
          <Stack.Screen name="FoodDetails" component={FoodDetails} options={{animation: 'slide_from_right'}}/>
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{animation: 'slide_from_right'}}/>
          <Stack.Screen name="About" component={About} options={{animation: 'slide_from_right'}}/>
          <Stack.Screen name="Favorite" component={Favorite} options={{animation: 'slide_from_right'}}/>
          <Stack.Screen name="CastDetails" component={CastDetails} options={{animation:  'fade'}}/>
          <Stack.Screen name="CastMovieDetails" component={CastMovieDetails} options={{animation: 'fade_from_bottom'}}/>
          <Stack.Screen name="ViewPopularMovies" component={ViewPopularMovies} options={{animation: 'fade_from_bottom'}}/>
          <Stack.Screen name="ViewUpComingMovies" component={ViewUpComingMovies} options={{animation: 'fade_from_bottom'}}/>
         </Stack.Navigator>
      </NavigationContainer>
      </ThemeProvider>
  );
};

export default App;
