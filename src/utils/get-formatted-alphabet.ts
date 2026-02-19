import { ILetter } from '@/types';
import alphabet from '@/json/russian-alphabet-keyboard.json';

export const getFormattedAlphabet = (callback: (alphabet: ILetter[][]) => void) => {
  const correctedAlphabet = alphabet.map((alphabet) => {
    return alphabet.map((letter) => ({
      name: letter,
      isExist: false,
      isCorrectPlace: false,
    }));
  });
  callback(correctedAlphabet);
};
