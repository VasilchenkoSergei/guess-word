import { IGameSettings } from '@/types';

export interface IGameSettingBtns {
  onChangeSettingsCallback: (settings: IGameSettings) => void;
  wordLength: number;
}
