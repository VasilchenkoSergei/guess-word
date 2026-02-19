import React, { useEffect, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import alphabet from '@/json/russian-alphabet-keyboard.json';
import GameSettingBtns from '@/components/GameSettingBtns';
import Alphabet from '@/components/Alphabet';
import TypedWords from '@/components/TypedWords';
import GameBtns from '@/components/GameBtns';
import { GAME_SETTINGS } from '@/constants';
import { IGameSettings, ILetter, ITheme, ITypedWord } from '@/types';
import * as S from '@/styled';

export default function GuessWordGame({ theme }: { theme?: ITheme }) {
  const [isLoading, setIsLoading] = useState(true);
  const [hiddenWord, setHiddenWord] = useState('');
  const [errorWordId, setErrorWordId] = useState(0);
  const [successWordId, setSuccessWordId] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [gameSettings, setGameSettings] = useState<IGameSettings>(GAME_SETTINGS[0]);
  const [formattedAlphabet, setFormattedAlphabet] = useState<ILetter[][]>([]);
  const [typedWords, setTypedWords] = useState<ITypedWord[]>([]);

  const getDefaultWords = (newGameSettings: IGameSettings) => {
    const defaultWords = [];

    for (let i = 1; i <= (newGameSettings?.wordsCount as number); i++) {
      defaultWords.push({
        id: i,
        word: Array(newGameSettings?.wordLength).join('.').split('.'),
        isFull: false,
        ...(i === 1 && { isActive: true }),
      });
    }
    setTypedWords(defaultWords);
  };

  const getHiddenWord = (newGameSettings: IGameSettings) => {
    const getRandomWord = () => {
      const randomIndex = Math.floor(Math.random() * newGameSettings?.wordsCollection?.length) + 1;
      return newGameSettings?.wordsCollection?.[randomIndex];
    };
    const currentHiddenWord = getRandomWord()?.toUpperCase();
    setHiddenWord(currentHiddenWord);
    setSuccessWordId(0);
    setErrorWordId(0);
    localStorage.setItem('hiddenWord', currentHiddenWord);
    localStorage.setItem('wordLength', newGameSettings.wordLength.toString());
  };

  const getFormattedAlphabet = () => {
    const correctedAlphabet = alphabet.map((alphabet) => {
      return alphabet.map((letter) => ({
        name: letter,
        isExist: false,
        isCorrectPlace: false,
      }));
    });
    setFormattedAlphabet(correctedAlphabet);
  };

  const changeSettings = (newGameSettings: IGameSettings) => {
    resetGame(newGameSettings);
    setGameSettings(newGameSettings);
  };

  const resetGame = (newGameSettings?: IGameSettings) => {
    localStorage.clear();
    setIsGameOver(false);
    getFormattedAlphabet();
    getDefaultWords(newGameSettings || GAME_SETTINGS[0]);
    getHiddenWord(newGameSettings || GAME_SETTINGS[0]);
  };

  useEffect(() => {
    hiddenWord && setIsLoading(false);
  }, [hiddenWord]);

  useEffect(() => {
    const currentWordLength = localStorage.getItem('wordLength');
    const currentHiddenWord = localStorage.getItem('hiddenWord');
    const currentFormatedAlphabet = localStorage.getItem('formattedAlphabet');
    const currentTypedWords = localStorage.getItem('typedWords');

    if (currentWordLength && currentHiddenWord && currentFormatedAlphabet && currentTypedWords) {
      const currentGameSettings = GAME_SETTINGS.find(
        ({ wordLength }) => wordLength === +currentWordLength
      );

      setGameSettings(currentGameSettings);
      setHiddenWord(currentHiddenWord);
      setFormattedAlphabet(JSON.parse(currentFormatedAlphabet));
      setTypedWords(JSON.parse(currentTypedWords));
    } else {
      resetGame();
    }
  }, []);

  return (
    <ThemeProvider theme={theme || {}}>
      <S.GlobalStyles />
      <S.StyledGameBlockWrapper>
        <S.StyledGameWrapper>
          <S.StyledGameTitle>Угадай слово</S.StyledGameTitle>
          {isLoading ? (
            <S.StyledLoadingText>Загадываю слово...</S.StyledLoadingText>
          ) : (
            <>
              <TypedWords
                typedWords={typedWords}
                errorWordId={errorWordId}
                successWordId={successWordId}
                hiddenWord={hiddenWord}
                isGameOver={isGameOver}
              />
              <Alphabet
                alphabet={formattedAlphabet}
                onChangeLettersCallback={setTypedWords}
                typedWords={typedWords}
              />
              <GameBtns
                typedWords={typedWords}
                gameSettings={gameSettings}
                hiddenWord={hiddenWord}
                successWordId={successWordId}
                setErrorWordId={setErrorWordId}
                setSuccessWordId={setSuccessWordId}
                setIsGameOver={setIsGameOver}
                setTypedWords={setTypedWords}
                formattedAlphabet={formattedAlphabet}
                setFormattedAlphabet={setFormattedAlphabet}
                isGameOver={isGameOver}
                resetGame={resetGame}
              />
            </>
          )}
        </S.StyledGameWrapper>
        {!isLoading && (
          <GameSettingBtns
            onChangeSettingsCallback={changeSettings}
            wordLength={gameSettings.wordLength}
          />
        )}
      </S.StyledGameBlockWrapper>
    </ThemeProvider>
  );
}
