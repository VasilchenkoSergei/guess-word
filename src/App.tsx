import React, { useEffect, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import GameSettingBtns from '@/components/GameSettingBtns';
import Alphabet from '@/components/Alphabet';
import TypedWords from '@/components/TypedWords';
import GameBtns from '@/components/GameBtns';
import { GAME_SETTINGS } from '@/constants';
import { IGameSettings, ILetter, ITheme, ITypedWord } from '@/types';
import * as S from '@/styled';
import { getHiddenWord } from '@/utils/get-hidden-word';
import { getFormattedAlphabet } from '@/utils/get-formatted-alphabet';
import { getDefaultWords } from '@/utils/get-default-words';

export default function GuessWordGame({ theme }: { theme?: ITheme }) {
  const [isLoading, setIsLoading] = useState(true);
  const [hiddenWord, setHiddenWord] = useState('');
  const [errorWordId, setErrorWordId] = useState(0);
  const [successWordId, setSuccessWordId] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [gameSettings, setGameSettings] = useState<IGameSettings>(GAME_SETTINGS[0]);
  const [formattedAlphabet, setFormattedAlphabet] = useState<ILetter[][]>([]);
  const [typedWords, setTypedWords] = useState<ITypedWord[]>([]);

  const changeSettings = (newGameSettings: IGameSettings) => {
    resetGame(newGameSettings);
    setGameSettings(newGameSettings);
  };

  const resetGame = (newGameSettings?: IGameSettings) => {
    localStorage.clear();
    setIsGameOver(false);
    getFormattedAlphabet(setFormattedAlphabet);
    getDefaultWords(newGameSettings || GAME_SETTINGS[0], setTypedWords);
    getHiddenWord(newGameSettings || GAME_SETTINGS[0], (word) => {
      setHiddenWord(word);
      setSuccessWordId(0);
      setErrorWordId(0);
    });
  };

  const loadGameFromStorage = () => {
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
  };

  useEffect(() => {
    hiddenWord && setIsLoading(false);
  }, [hiddenWord]);

  useEffect(() => {
    loadGameFromStorage();
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
