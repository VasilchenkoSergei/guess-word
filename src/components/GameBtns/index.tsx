import React, { useState, useEffect, useMemo } from 'react';
import { StyledButton } from '@/styled';
import { ReactComponent as SuccessIcon } from '@/assets/success-icon.svg';
import { ReactComponent as DeleteIcon } from '@/assets/delete-icon.svg';
import * as S from './styled';
import { IGameBtns } from './types';

export default function GameBtns({
  typedWords,
  gameSettings,
  hiddenWord,
  successWordId,
  formattedAlphabet,
  isGameOver,
  setSuccessWordId,
  setErrorWordId,
  setIsGameOver,
  setTypedWords,
  setFormattedAlphabet,
  resetGame,
}: IGameBtns) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const activeWord = useMemo(() => typedWords[currentWordIndex], [typedWords]);

  const onSubmitClick = () => {
    if (successWordId) return;

    const currentWord = activeWord.word.join('');
    if (currentWord.length < gameSettings.wordLength) return;

    if (!gameSettings.wordsCollection.includes(currentWord.toLowerCase())) {
      setErrorWordId(activeWord.id);
      return;
    }

    if (currentWord === hiddenWord) {
      setSuccessWordId(activeWord.id);
      setIsGameOver(true);
      setCurrentWordIndex(0);
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
      childAlphabet.map((letter) => foundLetters[letter.name] || letter)
    );

    setFormattedAlphabet(filteredLetters);
    localStorage.setItem('formattedAlphabet', JSON.stringify(filteredLetters));

    const isAllTypedWordsFull = Object.values(copiedTypedWords).every(({ isFull }) => isFull);
    setCurrentWordIndex((prev) => prev + 1);

    if (isAllTypedWordsFull) {
      setIsGameOver(true);
      setCurrentWordIndex(0);
    } else {
      const nextWordBlock = copiedTypedWords.find(({ id }) => id === activeWord.id + 1);
      copiedTypedWords[currentWordIndex + 1] = {
        ...nextWordBlock,
        isActive: true,
      };
      setTypedWords(copiedTypedWords);
      localStorage.setItem('typedWords', JSON.stringify(copiedTypedWords));
    }
  };

  const onDeleteClick = () => {
    if (successWordId) return;
    setErrorWordId(null);

    const lastLetterIndex = activeWord.word.findLastIndex((i) => i !== '');
    activeWord.word[lastLetterIndex] = '';

    const copiedTypedWords = [...typedWords];
    copiedTypedWords[currentWordIndex] = {
      ...activeWord,
      word: activeWord.word,
    };

    setTypedWords(copiedTypedWords);
  };

  useEffect(() => {
    const currentActiveWordIndex = typedWords?.findIndex(({ isActive }) => isActive);
    setCurrentWordIndex(currentActiveWordIndex);
  }, []);

  return (
    <S.StyledBtnWrapper>
      {isGameOver ? (
        <StyledButton onClick={resetGame} $isSubmit>
          Начать заново
        </StyledButton>
      ) : (
        <>
          <StyledButton onClick={onSubmitClick} $isSubmit>
            <SuccessIcon width='30' height='30' />
          </StyledButton>
          <StyledButton onClick={onDeleteClick}>
            <DeleteIcon width='30' height='30' />
          </StyledButton>
        </>
      )}
    </S.StyledBtnWrapper>
  );
}
