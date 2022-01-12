import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  query,
  ref,
  get,
  set,
  update,
} from "firebase/database";
import { FIREBASE_USERS_ROUTE } from '../utils/constants.js';

const defaultUserSettings = {
  firstname: '',
  surname: '',
};

export const sendUserData = createAsyncThunk(
  'user/sendUserData',
  async ({ userData, db }, { rejectWithValue }) => {
    const {
      uid,
      email,
      displayName,
      stsTokenManager: { accessToken },
    } = userData;

    const userRef = query(ref(db, `${FIREBASE_USERS_ROUTE}/${uid}`));

    try {
      get(userRef).then((snap) => {
        if (snap.exists()) {
          update(userRef, { accessToken });
        } else {
          set(userRef, {
            ...defaultUserSettings,
            email,
            displayName,
            uid,
            accessToken,
          });
        }
      });
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

export const getUserData = createAsyncThunk(
  'user/getUserData',
  async ({ userData, db }, { rejectWithValue }) => {
    const { uid } = userData;
    const userRef = query(ref(db, `${FIREBASE_USERS_ROUTE}/${uid}`));
    let data;
    try {
      await get(userRef).then((snap) => {
        if (snap.exists()) {
          data = snap.val();
        }
      });
      return data;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

export const updateUserData = createAsyncThunk(
  'user/updateUserData',
  async ({
    uid, field, value, db,
  }, rejectWithValue) => {
    const userRef = query(ref(db, `${FIREBASE_USERS_ROUTE}/${uid}`));
    let data;
    try {
      await update(userRef, { [field]: value });
      await get(userRef).then((snap) => {
        if (snap.exists()) {
          data = snap.val();
        }
      });
      return data;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action) {
      const {
        uid,
        email,
        displayName,
        stsTokenManager: { accessToken },
      } = action.payload;
      return {
        ...state, uid, email, displayName, accessToken, ...defaultUserSettings,
      };
    },
    clearUser() {
      return null;
    },
  },
  extraReducers: {
    [getUserData.fulfilled]: (state, action) => ({ ...action.payload }),
    [updateUserData.fulfilled]: (state, action) => ({ ...action.payload }),
  },
});

export const getUser = (state) => state.user;
export const {
  setUser,
  clearUser,
} = userSlice.actions;
export const userSliceReducer = userSlice.reducer;
