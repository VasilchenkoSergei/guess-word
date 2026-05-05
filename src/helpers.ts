import alphabet from './json/russian-alphabet-keyboard.json';
import { IGameSettings, ITypedWord } from './types';

export const getFormattedAlphabet = () => {
  return alphabet.map((letter) =>
    letter.map((newLetter) => ({
      name: newLetter,
      isExist: false,
      isCorrectPlace: false,
    }))
  );
};

export const getRandomWord = (settings: IGameSettings) => {
  const randomIndex = Math.floor(Math.random() * settings.wordsCollection.length) + 1;

  return settings.wordsCollection[randomIndex];
};

export const getDefaultWords = (
  settings: IGameSettings,
  callback: (words: ITypedWord[]) => void
) => {
  if (!settings?.wordsCount || !settings?.wordLength) return;

  const defaultWords = [...Array(settings.wordsCount)].map((_, index) => ({
    id: index,
    word: Array(settings.wordLength).fill(''),
    isFull: false,
    ...(index === 0 && { isActive: true }),
  }));

  callback(defaultWords);
};
