import { IGameSettings, ILetter, ITypedWord } from '@/types';

export interface IGameBtns {
  typedWords: ITypedWord[];
  gameSettings: IGameSettings;
  hiddenWord: string;
  successWordId: number;
  formattedAlphabet: ILetter[][];
  isGameOver: boolean;
  setSuccessWordId: (status: number) => void;
  setErrorWordId: (status: number) => void;
  setIsGameOver: (status: boolean) => void;
  setTypedWords: (words: ITypedWord[]) => void;
  setFormattedAlphabet: (alphabet: ILetter[][]) => void;
  resetGame: () => void;
}
