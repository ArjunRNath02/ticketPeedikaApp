/* eslint-disable prettier/prettier */
interface Spacing {
  space_2: number;
  space_4: number;
  space_8: number;
  space_10: number;
  space_12: number;
  space_15: number;
  space_16: number;
  space_18: number;
  space_20: number;
  space_24: number;
  space_28: number;
  space_32: number;
  space_36: number;
}

export const SPACING: Spacing = {
  space_2: 2,
  space_4: 4,
  space_8: 8,
  space_10: 10,
  space_12: 12,
  space_15: 15,
  space_16: 16,
  space_18: 18,
  space_20: 20,
  space_24: 24,
  space_28: 28,
  space_32: 32,
  space_36: 36,
};

export const myColors = {
  primary: '#2522CA',
  secondary: '#000000',
  grey: '#B2B9BB',
  Mgrey: '#333333',
  gold: '#FCC923',
  blue: '#2522CA',
  pureWhite: '#FFFFFF',
  pureBlack: '#000000',
  Grad: 'rgba(0,0,0,0.2)',
  yellow: '#FFE417',
  lightBlack: '#2C2D2D',
  red:'#EF0307',
  blur:'rgba(0, 0, 0, 0.5)',
  text:'#F8F9FA',
  text2:'#121214',
  darkBlue: '#002999',
  linear: '#140022',
  seatBookedColor: '#333333',
  seatColor:'#B2B9BB',
};
export const myColorsL = {
  primary: '#FF1A1A',
  secondary: '#F8F9FA',
  grey: '#333333',
  Mgrey: '#EBECF0',
  gold: '#FCC923',
  blue: '#2522CA',
  pureWhite: '#FFFFFF',
  pureBlack: '#000000',
  Grad: 'rgba(255,255,255,0.25)',
  yellow: '#FFE417',
  lightBlack: '#2C2D2D',
  red:'#C8102E',
  blur:'rgba(0, 0, 0, 0.35)',
  text:'#121214',
  text2:'#F8F9FA',
  linear: '#F8F9FA',
  seatBookedColor:'#EBECF0',
  seatColor:'#969594',
};
export const myColorsPrimary = {
   Fuchsia : '#FF91D9',
   Violet: '#AB73E7',
   Mint : '#D9FB02',
   BBlue : '#9BBEED',
   Gold: '#FFD218',
   Lime:'#99FF1D',
   Pink :'#FF57D2',
   Green : '#58CD36',
   Red : '#FF1A1A',
};

interface FontFamily {
  poppins_black: string;
  poppins_bold: string;
  poppins_extrabold: string;
  poppins_extralight: string;
  poppins_light: string;
  poppins_medium: string;
  poppins_regular: string;
  poppins_semibold: string;
  poppins_thin: string;
  pacifico_regular: string;
}

export const FONTFAMILY: FontFamily = {
  poppins_black: 'Poppins-Black',
  poppins_bold: 'Poppins-Bold',
  poppins_extrabold: 'Poppins-ExtraBold',
  poppins_extralight: 'Poppins-ExtraLight',
  poppins_light: 'Poppins-Light',
  poppins_medium: 'Poppins-Medium',
  poppins_regular: 'Poppins-Regular',
  poppins_semibold: 'Poppins-SemiBold',
  poppins_thin: 'Poppins-Thin',
  pacifico_regular:'pacifico_regular',
};

interface FontSize {
  size_8: number;
  size_10: number;
  size_12: number;
  size_14: number;
  size_16: number;
  size_18: number;
  size_20: number;
  size_24: number;
  size_30: number;
}

export const FONTSIZE: FontSize = {
  size_8: 8,
  size_10: 10,
  size_12: 12,
  size_14: 14,
  size_16: 16,
  size_18: 18,
  size_20: 20,
  size_24: 24,
  size_30: 30,
};

interface BorderRadius {
  radius_4: number;
  radius_8: number;
  radius_10: number;
  radius_15: number;
  radius_20: number;
  radius_25: number;
}

export const BORDERRADIUS: BorderRadius = {
  radius_4: 4,
  radius_8: 8,
  radius_10: 10,
  radius_15: 15,
  radius_20: 20,
  radius_25: 25,
};
