import { styled, createGlobalStyle, css } from 'styled-components';
import { normalize } from 'styled-normalize';
import { DEVICE } from '@/constants';

export const BlackColor = '#1f1f1f';
export const RedColor = '#780d0d';
export const WhiteColor = '#f3f6ff';
export const GrayColor = '#474747';
export const GreenColor = '#109004';

export const GlobalStyles = createGlobalStyle`
  ${normalize};

  html {
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    font-family: 'opensans', Arial, sans-serif;
  }

  * {
    box-sizing: inherit;
    outline: none;
  }
`;

export const StyledGameBlockWrapper = styled.div`
  display: flex;
  align-items: flex-start;

  @media ${DEVICE.maxMobileL} {
    display: flex;
    flex-direction: column;
  }
`;

export const StyledGameWrapper = styled.div`
  border: 2px solid ${({ theme }) => theme.borderColor};
  border-radius: 14px;
  width: 100%;
  max-width: 420px;
  padding: 10px;
  margin-right: 10px;

  @media ${DEVICE.tablet} {
    max-width: 520px;
  }

  @media ${DEVICE.maxMobileL} {
    order: 1;
  }
`;

export const StyledGameTitle = styled.h2`
  font-size: 26px;
  line-height: 36px;
  font-weight: 400;
  margin: 0;
  margin-bottom: 20px;

  @media ${DEVICE.tablet} {
    font-size: 30px;
    line-height: 40px;
  }

  @media ${DEVICE.desktop} {
    font-size: 45px;
    line-height: 45px;
  }
`;

export const StyledLoadingText = styled.div`
  font-size: 20px;
  font-weight: 500;
  color: ${({ theme }) => theme.fontColor};
  margin: 20px 0;
`;

export const StyledButton = styled.button<{
  $isSubmit?: boolean;
  $isReset?: boolean;
  $isActive?: boolean;
  $isSettingsBtn?: boolean;
}>`
  width: 100%;
  height: 40px;
  border: 2px solid ${RedColor};
  border-radius: 4px;
  background-color: transparent;
  cursor: pointer;
  font-weight: 600;
  color: ${BlackColor};
  display: flex;
  align-items: center;
  justify-content: center;

  &:not(:last-child) {
    margin-right: 10px;
  }

  ${({ $isActive }) =>
    $isActive &&
    css`
      background-color: ${RedColor};
      color: ${WhiteColor};
    `}

  ${({ $isSettingsBtn }) =>
    $isSettingsBtn &&
    css`
      width: 48%;
      height: 40px;

      @media ${DEVICE.mobileL} {
        height: 120px;
        width: 40px;
        writing-mode: vertical-rl;
      }
    `}

  ${({ $isSubmit }) =>
    $isSubmit
      ? css`
          background-color: ${RedColor};
          svg path {
            fill: ${WhiteColor};
          }
        `
      : css`
          svg path {
            stroke: ${RedColor};
          }
        `}
`;

export const StyledBtnWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
`;
