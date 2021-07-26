import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import meteorReducer from '../features/meteor/meteorSlice';

export const store = configureStore({
  reducer: {
    meteor: meteorReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
