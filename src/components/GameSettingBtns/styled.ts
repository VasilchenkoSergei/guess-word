import { DEVICE } from '@/constants';
import { styled } from 'styled-components';

export const StyledGameSettings = styled.div`
  display: flex;

  button {
    margin-bottom: 20px;
    margin-right: 0 !important;
    color: ${({ theme }) => theme.fontColor};
    font-size: 14px;

    @media ${DEVICE.maxMobileL} {
      margin-bottom: 10px;
    }
    
    @media ${DEVICE.mobileL} {
      font-size: 16px;
    }
  }

  @media ${DEVICE.maxMobileL} {
    flex-wrap: wrap;
    justify-content: space-between;
    margin-bottom: 10px;
  }

  @media ${DEVICE.mobileL} {
    flex-direction: column;
  }
`;
