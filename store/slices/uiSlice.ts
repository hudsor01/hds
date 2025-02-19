import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { UIState, Notification } from '../types';

const initialState: UIState = {
  globalLoading: false,
  pageLoading: false,
  theme: 'light',
  notifications: [],
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setGlobalLoading: (state, action: PayloadAction<boolean>) => {
      state.globalLoading = action.payload;
    },
    setPageLoading: (state, action: PayloadAction<boolean>) => {
      state.pageLoading = action.payload;
    },
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.theme = action.payload;
    },
    addNotification: (state, action: PayloadAction<Omit<Notification, 'id' | 'createdAt'>>) => {
      state.notifications.push({
        id: Math.random().toString(36).substr(2, 9),
        createdAt: Date.now(),
        ...action.payload,
      });
    },
    dismissNotification: (state, action: PayloadAction<string>) => {
      const notification = state.notifications.find(n => n.id === action.payload);
      if (notification) {
        notification.dismissed = true;
      }
    },
    clearNotifications: (state) => {
      state.notifications = [];
    },
  },
});

export const {
  setGlobalLoading,
  setPageLoading,
  setTheme,
  addNotification,
  dismissNotification,
  clearNotifications,
} = uiSlice.actions;

export default uiSlice.reducer;