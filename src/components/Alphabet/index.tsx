import React, { useMemo } from 'react';
import * as S from './styled';
import { IAlphabet } from './types';

export default function Alphabet({ typedWords, alphabet, onChangeLettersCallback }: IAlphabet) {
  const usedLetters = useMemo(() => typedWords?.flatMap(({ word }) => word) ?? [], [typedWords]);

  const onLetterClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const currentLetter = (e.target as HTMLDivElement).dataset.letter;
    if (!currentLetter) return;

    onChangeLettersCallback(currentLetter);
  };

  return (
    <S.StyledAlphabetWrapper onClick={onLetterClick}>
      {alphabet.map((childAlphabet, index) => (
        <S.StyledChildAlphabet key={index}>
          {childAlphabet.map(({ name, isExist, isCorrectPlace }) => (
            <S.StyledAlphabetLetter
              data-letter={name}
              $isExist={isExist}
              $isCorrectPlace={isCorrectPlace}
              $isNoExist={usedLetters.includes(name)}
              key={name}
            >
              {name}
            </S.StyledAlphabetLetter>
          ))}
        </S.StyledChildAlphabet>
      ))}
    </S.StyledAlphabetWrapper>
  );
}
