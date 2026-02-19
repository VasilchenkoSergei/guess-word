import React, { useMemo } from 'react';
import * as S from './styled';
import { ITypedWords } from './types';

export default function TypedWords({
  typedWords,
  hiddenWord,
  errorWordId,
  successWordId,
  isGameOver,
}: ITypedWords) {
  const gameOver = useMemo(() => isGameOver && !successWordId, [isGameOver, successWordId]);

  return (
    <S.StyledWordsWrapper>
      {Object.values(typedWords).map(({ id, word, isActive, isFull }) => (
        <S.StyledWord
          key={id}
          $isError={id === errorWordId}
          $isSuccess={id === successWordId}
          $isHidden={(successWordId && id !== successWordId) || gameOver}
        >
          {word.map((letter, index) => {
            const isLetterExist = !isActive && letter && hiddenWord.includes(letter);
            const isLetterInCorrectPlace = !isActive && hiddenWord[index] === word[index];

            return (
              <S.StyledLetter
                key={index}
                $isExist={isLetterExist}
                $isCorrectPlace={isLetterInCorrectPlace}
                $isFull={isFull && !isActive}
                $isLongWord={hiddenWord.length > 6}
              >
                {letter}
              </S.StyledLetter>
            );
          })}
        </S.StyledWord>
      ))}
      {gameOver && (
        <S.StyledGameLostText>
          Ну что же ты...
          <br />
          <br />А слово было
          <br />
          {`"${hiddenWord}"`}
        </S.StyledGameLostText>
      )}
    </S.StyledWordsWrapper>
  );
}
