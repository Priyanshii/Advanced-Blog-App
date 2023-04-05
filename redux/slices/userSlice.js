import { createSlice } from '@reduxjs/toolkit';

const initialState = {  
  userData: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser: (state,{payload})=>{
      state.userData = payload;
    },
    removeUser: (state) => {
      state.userData = null;
    },
  },
});

export const { addUser, removeUser } = userSlice.actions;

export default userSlice.reducer;

export const setUserData = (user) => dispatch => {
  localStorage.setItem("User", JSON.stringify(user));
  dispatch(addUser(user));
}

export const getUserData = () => async dispatch => {
  const userData = localStorage.getItem("User");
  dispatch(addUser(JSON.parse(userData)));
}