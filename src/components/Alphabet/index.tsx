import React, { useEffect, useState } from 'react';
import { Nullable } from '@/types';
import * as S from './styled';
import { IAlphabet } from './types';

export default function Alphabet({ typedWords, alphabet, onChangeLettersCallback }: IAlphabet) {
  const [usedLetters, setUsedLetters] = useState<Nullable<string[]>>(null);

  const setLetter = (letter: string) => {
    const typedWordsUpdated = typedWords.map((currentWord) => {
      if (currentWord.isActive) {
        const currentIndex = currentWord.word.findIndex((letter) => !letter);

        if (currentIndex >= 0) {
          currentWord.word[currentIndex] = letter.toUpperCase();
        }

        return currentWord;
      }

      return currentWord;
    });
    onChangeLettersCallback(typedWordsUpdated);
  };

  const onLetterClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const currentLetter = (e.target as HTMLDivElement).dataset.letter;
    currentLetter && setLetter(currentLetter);
  };

  useEffect(() => {
    setUsedLetters(typedWords?.map(({ word }) => word).flat());
  }, [typedWords]);

  

  return (
    <S.StyledAlphabetWrapper onClick={onLetterClick}>
      {alphabet.map((childAlphabet, index) => {
        return (
          <S.StyledChildAlphabet key={index}>
            {childAlphabet.map(({ name, isExist, isCorrectPlace }) => (
              <S.StyledAlphabetLetter
                data-letter={name}
                $isExist={isExist}
                $isCorrectPlace={isCorrectPlace}
                $isNoExist={usedLetters?.includes(name)}
                key={name}
              >
                {name}
              </S.StyledAlphabetLetter>
            ))}
          </S.StyledChildAlphabet>
        );
      })}
    </S.StyledAlphabetWrapper>
  );
}
