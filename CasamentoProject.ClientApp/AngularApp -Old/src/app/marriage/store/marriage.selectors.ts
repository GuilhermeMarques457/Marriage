import { AppState } from 'src/app/store/app.reducer';

export const selectMarriage = (state: AppState) => state.marriage;
export const selectCurrentMarriageState = (state: AppState) =>
  state.marriage.currentMarriage;
export const selectMarriagesState = (state: AppState) =>
  state.marriage.Marriages;
