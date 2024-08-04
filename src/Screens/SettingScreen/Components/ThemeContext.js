/* eslint-disable prettier/prettier */
// ThemeContext.js - Create a centralized theme context
import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { myColors, myColorsL } from '../../../themeComponents/theme';
import { backgroundImg, backgroundImgL } from '../../../themeComponents/Date';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('dark'); // or 'light', based on user preference
  const [highlightColor, setHighlightColor] = useState(myColors.primary); // Default highlight color

  useEffect(() => {
    async function loadTheme() {
      try {
        const savedTheme = await AsyncStorage.getItem('theme');
        const savedHighlightColor = await AsyncStorage.getItem('highlightColor');
        if (savedTheme !== null) {
          setTheme(savedTheme);
        }
        if (savedHighlightColor !== null) {
          setHighlightColor(savedHighlightColor);
        }
      } catch (error) {
        console.error('Error loading theme and highlight color from AsyncStorage:', error);
      }
    }
    loadTheme();
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    saveTheme(newTheme);
  };

  const saveTheme = async (newTheme) => {
    try {
      await AsyncStorage.setItem('theme', newTheme);
    } catch (error) {
      console.error('Error saving theme to AsyncStorage:', error);
    }
  };

  const setAndSaveHighlightColor = async (color) => {
    setHighlightColor(color);
    try {
      await AsyncStorage.setItem('highlightColor', color);
    } catch (error) {
      console.error('Error saving highlight color to AsyncStorage:', error);
    }
  };

  const themeColors = theme === 'dark' ? myColors : myColorsL;
  const background = theme === 'dark' ? backgroundImg : backgroundImgL;

  return (
    <ThemeContext.Provider
      value={{ theme, toggleTheme, themeColors, background, highlightColor, setHighlightColor: setAndSaveHighlightColor }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
