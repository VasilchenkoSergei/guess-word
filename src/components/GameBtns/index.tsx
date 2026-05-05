import * as S from '@/styled';
import { ReactComponent as SuccessIcon } from '@/assets/icons/success-icon.svg';
import { ReactComponent as DeleteIcon } from '@/assets/icons/delete-icon.svg';
import { IGameBtns } from './types';

export default function GameBtns({ onSubmitClick, onDeleteClick }: IGameBtns) {
  return (
    <S.StyledBtnWrapper>
      <S.StyledButton onClick={onSubmitClick} $isSubmit>
        <SuccessIcon width='30' height='30' />
      </S.StyledButton>
      <S.StyledButton onClick={onDeleteClick}>
        <DeleteIcon width='30' height='30' />
      </S.StyledButton>
    </S.StyledBtnWrapper>
  );
}
