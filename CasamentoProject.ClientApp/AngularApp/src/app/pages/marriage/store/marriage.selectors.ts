// import { AppState } from 'src/pages/app/store/app.reducer';
import { AppState } from '../../../store/app.reducer';

export const selectMarriageState = (state: AppState) => state.marriage;
export const selectCurrentMarriageState = (state: AppState) =>
  state.marriage.currentMarriage;
export const selectMarriagesState = (state: AppState) =>
  state.marriage.Marriages;
