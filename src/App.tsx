import React, { useEffect, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import GameSettingBtns from '@/components/GameSettingBtns';
import Alphabet from '@/components/Alphabet';
import TypedWords from '@/components/TypedWords';
import GameBtns from '@/components/GameBtns';
import { GAME_SETTINGS } from '@/constants';
import { IGameSettings, ILetter, ITheme, ITypedWord } from '@/types';
import * as S from '@/styled';
import { getDefaultWords, getFormattedAlphabet, getRandomWord } from './helpers';

export interface GuessWordGameProps {
  theme?: ITheme;
}

export default function GuessWordGame({ theme }: GuessWordGameProps) {
  const [hiddenWord, setHiddenWord] = useState('');
  const [errorWordId, setErrorWordId] = useState<number | null>(null);
  const [successWordId, setSuccessWordId] = useState<number | null>(null);
  const [isGameOver, setIsGameOver] = useState(false);
  const [gameSettings, setGameSettings] = useState<IGameSettings>(GAME_SETTINGS[0]);
  const [formattedAlphabet, setFormattedAlphabet] = useState<ILetter[][]>(getFormattedAlphabet());
  const [typedWords, setTypedWords] = useState<ITypedWord[]>([]);
  const [currentWordIndex, setCurrentWordIndex] = useState<number | null>(null);

  const getHiddenWord = (settings: IGameSettings) => {
    setHiddenWord(getRandomWord(settings)?.toUpperCase());
    setSuccessWordId(null);
    setErrorWordId(null);
  };

  const changeSettings = (settings: IGameSettings) => {
    resetGame(settings);
    setGameSettings(settings);
  };

  const resetGame = (settings?: IGameSettings) => {
    setIsGameOver(false);
    setFormattedAlphabet(getFormattedAlphabet());
    getDefaultWords(settings || GAME_SETTINGS[0], setTypedWords);
    getHiddenWord(settings || GAME_SETTINGS[0]);
  };

  const onChangeLettersCallback = (currentLetter: string) => {
    const typedWordsUpdated = typedWords.map((currentWord) => {
      if (!currentWord.isActive) return currentWord;

      const currentIndex = currentWord.word.findIndex((letter) => !letter);

      if (currentIndex >= 0) {
        currentWord.word[currentIndex] = currentLetter.toUpperCase();
      }

      return currentWord;
    });

    const currentActiveWordIndex = typedWordsUpdated?.findIndex(({ isActive }) => isActive);

    setCurrentWordIndex(currentActiveWordIndex);
    setTypedWords(typedWordsUpdated);
  };

  const onSubmitClick = () => {
    if (successWordId) return;

    const activeWord = typedWords[currentWordIndex];
    const currentWord = activeWord.word.join('');
    if (currentWord.length < gameSettings.wordLength) return;

    if (!gameSettings.wordsCollection.includes(currentWord.toLowerCase())) {
      setErrorWordId(activeWord.id);
      return;
    }

    if (currentWord === hiddenWord) {
      setSuccessWordId(activeWord.id);
      setIsGameOver(true);
      setCurrentWordIndex(null);
      return;
    }

    const copiedTypedWords = [...typedWords];
    copiedTypedWords[currentWordIndex] = {
      ...activeWord,
      isActive: false,
      isFull: true,
    };

    const foundLetters = hiddenWord.split('').reduce((acc, curr, index) => {
      return {
        ...acc,
        [curr]: {
          name: curr,
          isExist: currentWord.includes(curr),
          isCorrectPlace: hiddenWord[index] === currentWord[index],
        },
      };
    }, {});

    const filteredLetters = formattedAlphabet.map((childAlphabet) =>
      childAlphabet.map((letter) => ({
        name: letter.name,
        isExist: !!letter.isExist || !!foundLetters[letter.name]?.isExist,
        isCorrectPlace: !!letter.isCorrectPlace || !!foundLetters[letter.name]?.isCorrectPlace,
      }))
    );

    setFormattedAlphabet(filteredLetters);

    const isAllTypedWordsFull = copiedTypedWords.every(({ isFull }) => isFull);
    setCurrentWordIndex((prev) => prev + 1);

    if (isAllTypedWordsFull) {
      setIsGameOver(true);
      setCurrentWordIndex(null);
    } else {
      const nextWordBlock = copiedTypedWords.find(({ id }) => id === activeWord.id + 1);
      copiedTypedWords[currentWordIndex + 1] = {
        ...(nextWordBlock || {}),
        isActive: true,
      };
      setTypedWords(copiedTypedWords);
    }
  };

  const onDeleteClick = () => {
    if (successWordId) return;

    setErrorWordId(null);

    const activeWord = typedWords[currentWordIndex];
    const lastLetterIndex = activeWord.word.findLastIndex((index) => index !== '');
    activeWord.word[lastLetterIndex] = '';

    const copiedTypedWords = [...typedWords];
    copiedTypedWords[currentWordIndex] = {
      ...activeWord,
      word: activeWord.word,
    };

    setTypedWords(copiedTypedWords);
  };

  useEffect(() => {
    resetGame();
  }, []);

  return (
    <ThemeProvider theme={theme || {}}>
      <S.StyledGameBlockWrapper>
        <S.StyledGameWrapper>
          <S.StyledGameTitle>Угадай слово</S.StyledGameTitle>
          {!hiddenWord ? (
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
                onChangeLettersCallback={onChangeLettersCallback}
                typedWords={typedWords}
              />
              {isGameOver ? (
                <S.StyledBtnWrapper>
                  <S.StyledButton onClick={() => resetGame()} $isSubmit>
                    Начать заново
                  </S.StyledButton>
                </S.StyledBtnWrapper>
              ) : (
                <GameBtns onSubmitClick={onSubmitClick} onDeleteClick={onDeleteClick} />
              )}
            </>
          )}
        </S.StyledGameWrapper>
        {hiddenWord && (
          <GameSettingBtns
            onChangeSettingsCallback={changeSettings}
            wordLength={gameSettings.wordLength}
          />
        )}
      </S.StyledGameBlockWrapper>
    </ThemeProvider>
  );
}
