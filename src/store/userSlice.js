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

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async ({ userData, db }, { rejectWithValue }) => {
    const {
      uid,
      lastLoginAt,
      accessToken,
    } = userData;

    const userRef = query(ref(db, `${FIREBASE_USERS_ROUTE}/${uid}`));

    return get(userRef).then((snapshot) => {
      if (snapshot.exists()) {
        return update(userRef, { accessToken, lastLoginAt })
          .then(() => get(userRef));
      }
      return set(userRef, {
        ...defaultUserSettings,
        ...userData,
      }).then(() => get(userRef));
    })
      .then((snap) => snap.val())
      .catch((err) => rejectWithValue(err));
  },
);

export const updateUserData = createAsyncThunk(
  'user/updateUserData',
  async ({
    uid, field, value, db,
  }, rejectWithValue) => {
    const userRef = query(ref(db, `${FIREBASE_USERS_ROUTE}/${uid}`));

    return update(userRef, { [field]: value })
      .then(() => get(userRef))
      .then((snap) => snap.val())
      .catch((err) => rejectWithValue(err));
  },
);

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action) {
      const user = action.payload;
      return {
        ...defaultUserSettings, ...state, ...user,
      };
    },
    clearUser() {
      return null;
    },
  },
  extraReducers: {
    [updateUserData.fulfilled]: (state, action) => ({ ...action.payload }),
    [updateUser.fulfilled]: (state, action) => ({ ...action.payload }),
  },
});

export const getUser = (state) => state.user;
export const {
  setUser,
  clearUser,
} = userSlice.actions;
export const userSliceReducer = userSlice.reducer;
