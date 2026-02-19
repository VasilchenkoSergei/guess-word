import styled, { css } from 'styled-components';
import { DEVICE } from '@/constants';
import { BlackColor, GrayColor, GreenColor, RedColor } from '@/styled';

export const StyledWordsWrapper = styled.div`
  width: 100%;
  margin-bottom: 10px;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const StyledWord = styled.div<{
  $isError: boolean;
  $isSuccess: boolean;
  $isHidden: boolean;
}>`
  display: flex;
  justify-content: space-between;
  align-items: top;
  width: 100%;
  gap: 4px;

  ${({ $isHidden }) =>
    $isHidden &&
    css`
      & > div {
        opacity: 0;
        transition: all 1s;
      }
    `}

  ${({ $isError }) =>
    $isError &&
    css`
      & > div {
        border-color: ${RedColor};
        animation: errorShift 0.5s linear;

        &:first-child {
          position: relative;

          &:after {
            content: 'Введи корректное слово';
            position: absolute;
            top: 110%;
            left: -2px;
            width: max-content;
            height: 30px;
            color: ${RedColor};
            background-color: ${({ theme }) => theme.backgroundColor};
            border-radius: 10px;
            font-size: 24px;
            padding: 10px;
            border: 2px solid ${RedColor};
            opacity: 0;
            animation: showError 0.5s linear 0.5s;
            animation-fill-mode: forwards;
          }

          @keyframes showError {
            0% {
              opacity: 0;
            }

            100% {
              opacity: 1;
            }
          }
        }

        @keyframes errorShift {
          0% {
            transform: rotate(2deg);
          }
          50% {
            transform: rotate(-2deg);
          }
          100% {
            transform: rotate(0);
          }
        }
      }
    `}

  ${({ $isSuccess }) =>
    $isSuccess &&
    css`
      & > div {
        border-color: ${GreenColor};
        animation: successTransform 1s linear;

        @keyframes successTransform {
          0% {
            transform: scale(1.1);
          }
          50% {
            transform: scale(0.9);
          }
          100% {
            transform: scale(1);
          }
        }
      }
    `}
`;

export const StyledLetter = styled.div<{
  $isExist: boolean;
  $isCorrectPlace: boolean;
  $isFull: boolean;
  $isLongWord: boolean;
}>`
  width: calc((100% - 20px - 10px) / 5);
  border: 2px solid ${({ theme }) => theme.borderColor};
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 36px;

  ${({ $isLongWord }) =>
    $isLongWord &&
    css`
      font-size: 20px;
    `}

  @media ${DEVICE.tablet} {
    font-size: 50px;

    ${({ $isLongWord }) =>
      $isLongWord &&
      css`
        font-size: 30px;
      `}
  }

  &:after {
    content: '';
    display: block;
    padding-bottom: 100%;
  }

  ${({ $isFull }) =>
    $isFull &&
    css`
      opacity: 0.2;
    `}

  ${({ $isExist }) =>
    $isExist &&
    css`
      background-color: ${GrayColor};
      color: ${BlackColor};
      opacity: 1;
    `}

  ${({ $isCorrectPlace }) =>
    $isCorrectPlace &&
    css`
      background-color: ${RedColor};
      border-color: ${RedColor};
      opacity: 1;
    `}
`;

export const StyledGameLostText = styled.div<{
  $isShown: boolean;
}>`
  opacity: 0;
  z-index: -1;
  width: 100%;
  color: ${RedColor};
  font-size: 40px;
  font-weight: 500;
  position: absolute;
  text-align: center;
  top: 10%;
  left: 0;

  ${({ $isShown }) =>
    $isShown &&
    css`
      opacity: 1;
      transition: all 1s;
    `}
`;
