import React, { useEffect, useState } from 'react';
import * as S from './styled';
import { StyledButton } from '@/styled';
import { GAME_SETTINGS } from '@/constants';
import { IGameSettingBtns } from './types';

export default function GameSettingBtns({
  onChangeSettingsCallback,
  wordLength,
}: IGameSettingBtns) {
  const [currentWordLength, setCurrentWordLength] = useState(GAME_SETTINGS[0].wordLength);

  const onChangeWordLength = (e: React.MouseEvent<HTMLDivElement>) => {
    const chosenWordLength = Number((e.target as HTMLDivElement).dataset.id);

    if (chosenWordLength) {
      setCurrentWordLength(chosenWordLength);
      const currentGameSettings = GAME_SETTINGS.find(
        ({ wordLength }) => wordLength === chosenWordLength
      );

      onChangeSettingsCallback(currentGameSettings);
    }
  };

  useEffect(() => {
    setCurrentWordLength(wordLength ?? GAME_SETTINGS[0].wordLength);
  }, [wordLength]);

  return (
    <S.StyledGameSettings onClick={onChangeWordLength}>
      {GAME_SETTINGS.map(({ wordLength, name }) => (
        <StyledButton
          data-id={wordLength}
          $isActive={wordLength === currentWordLength}
          $isSettingsBtn
          key={wordLength}
        >
          {name}
        </StyledButton>
      ))}
    </S.StyledGameSettings>
  );
}
