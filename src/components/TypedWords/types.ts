import { ITypedWord } from '@/types';

export interface ITypedWords {
  typedWords: ITypedWord[];
  hiddenWord: string;
  errorWordId: number;
  successWordId: number;
  isGameOver: boolean;
}
