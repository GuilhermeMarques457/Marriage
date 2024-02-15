// import { AppState } from 'src/pages/app/store/app.reducer';
import { AppState } from '../../../store/app.reducer';

export const selectGiftState = (state: AppState) => state.gift;
export const selectCurrentGiftState = (state: AppState) =>
  state.gift.currentGift;
export const selectGiftsState = (state: AppState) => state.gift.gifts;
