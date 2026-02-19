import { IGameSettings, ITypedWord } from '@/types';

export const getDefaultWords = (
  newGameSettings: IGameSettings,
  callback: (words: ITypedWord[]) => void
) => {
  const defaultWords = [];

  for (let i = 1; i <= (newGameSettings?.wordsCount as number); i++) {
    defaultWords.push({
      id: i,
      word: Array(newGameSettings?.wordLength).join('.').split('.'),
      isFull: false,
      ...(i === 1 && { isActive: true }),
    });
  }
  callback(defaultWords);
};
