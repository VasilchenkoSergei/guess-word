import { DEVICE } from '@/constants';
import { styled, css } from 'styled-components';
import { BlackColor, GrayColor, RedColor } from '@/styled';

export const StyledAlphabetWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  max-width: 370px;
  margin: 0 auto;

  @media ${DEVICE.mobileL} {
    max-width: initial;
  }
`;

export const StyledChildAlphabet = styled.div`
  display: flex;
  gap: 4px;
`;

export const StyledAlphabetLetter = styled.div<{
  $isExist: boolean;
  $isCorrectPlace: boolean;
  $isNoExist: boolean;
}>`
  width: 20px;
  height: 20px;
  border: 2px solid ${({ theme }) => theme.borderColor};
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  cursor: pointer;

  @media ${DEVICE.mobileS} {
    width: 22px;
    height: 22px;
  }

  @media ${DEVICE.mobileM} {
    width: 25px;
    height: 25px;
    font-weight: 600;
  }

  @media ${DEVICE.mobileL} {
    width: 26px;
    height: 26px;
    font-size: 16px;
  }

  @media ${DEVICE.tablet} {
    width: 38px;
    height: 38px;
  }

  ${({ $isExist }) =>
    $isExist &&
    css`
      background-color: ${GrayColor};
      color: ${BlackColor};
    `}

  ${({ $isCorrectPlace }) =>
    $isCorrectPlace &&
    css`
      background-color: ${RedColor};
      border-color: ${RedColor};
    `}

  ${({ $isNoExist, $isCorrectPlace, $isExist }) =>
    $isNoExist &&
    !$isCorrectPlace &&
    !$isExist &&
    css`
      opacity: 0.2;
    `}
`;
