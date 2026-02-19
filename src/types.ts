export type Nullable<T> = T | null;
export interface IGameSettings {
  name: string;
  wordLength: number;
  wordsCount: number;
  wordsCollection: string[];
}
export interface ILetter {
  name: string;
  isExist: boolean;
  isCorrectPlace: boolean;
}
export interface ITypedWord {
  id: number;
  word: string[];
  isFull: boolean;
  isActive: boolean;
}
export type ITheme = {
  backgroundColor?: string;
  fontColor?: string;
  borderColor?: string;
};
