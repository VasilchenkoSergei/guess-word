import { IGameSettings } from '@/types';

export const getHiddenWord = (newGameSettings: IGameSettings, callback: (word: string) => void) => {
  const getRandomWord = () => {
    const randomIndex = Math.floor(Math.random() * newGameSettings?.wordsCollection?.length) + 1;
    return newGameSettings?.wordsCollection?.[randomIndex];
  };
  const currentHiddenWord = getRandomWord()?.toUpperCase();
  callback(currentHiddenWord);
  localStorage.setItem('hiddenWord', currentHiddenWord);
  localStorage.setItem('wordLength', newGameSettings.wordLength.toString());
};
