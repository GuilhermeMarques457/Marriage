// import { AppState } from 'src/pages/app/store/app.reducer';
import { AppState } from '../../../store/app.reducer';

export const selectGuestState = (state: AppState) => state.guest;
export const selectCurrentGuestState = (state: AppState) =>
  state.guest.currentGuest;