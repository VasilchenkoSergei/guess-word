import fiveLettersWords from '@/json/russian-nouns-five-letters.json';
import sixLettersWords from '@/json/russian-nouns-six-letters.json';
import eightLettersWords from '@/json/russian-nouns-eight-letters.json';
import tenLettersWords from '@/json/russian-nouns-ten-letters.json';
import { IGameSettings } from '@/types';

const SIZE = {
  mobile: '320px',
  mobileS: '350px',
  mobileM: '375px',
  mobileL: '445px',
  tablet: '768px',
  tabletLandscape: '1024px',
  desktop: '1280px',
  desktopWide: '1440px',
  fullHD: '1920px',
  ultraHD: '2560px',
};

export const GAME_SETTINGS: IGameSettings[] = [
  {
    name: '5 букв',
    wordLength: 5,
    wordsCount: 6,
    wordsCollection: fiveLettersWords,
  },
  {
    name: '6 букв',
    wordLength: 6,
    wordsCount: 6,
    wordsCollection: sixLettersWords,
  },
  {
    name: '8 букв',
    wordLength: 8,
    wordsCount: 7,
    wordsCollection: eightLettersWords,
  },
  {
    name: 'Монстр',
    wordLength: 10,
    wordsCount: 7,
    wordsCollection: tenLettersWords,
  },
];

export const DEVICE = {
  mobile: `(min-width: ${SIZE.mobile})`,
  mobileS: `(min-width: ${SIZE.mobileS})`,
  mobileM: `(min-width: ${SIZE.mobileM})`,
  mobileL: `(min-width: ${SIZE.mobileL})`,
  maxMobileL: `(max-width: calc(${SIZE.mobileL}  - 1px))`,
  tablet: `(min-width: ${SIZE.tablet})`,
  maxTablet: `(max-width: calc(${SIZE.tablet} - 1px))`,
  tabletLandscape: `(min-width: ${SIZE.tabletLandscape})`,
  maxTabletLandscape: `(max-width: ${SIZE.tabletLandscape})`,
  desktop: `(min-width: ${SIZE.desktop})`,
  maxDesktop: `(max-width: calc(${SIZE.desktop} - 1px))`,
  desktopWide: `(min-width: ${SIZE.desktopWide})`,
  fullHD: `(min-width: ${SIZE.fullHD})`,
  ultraHD: `(min-width: ${SIZE.ultraHD})`,
};
