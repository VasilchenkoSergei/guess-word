import { ILetter, ITypedWord } from '@/types';

export interface IAlphabet {
  typedWords: ITypedWord[];
  alphabet: ILetter[][];
  onChangeLettersCallback: (currentLetter: string) => void;
}
