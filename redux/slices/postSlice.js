import { createSlice } from '@reduxjs/toolkit';

const initialState = {  
  postData: [],
  updatedPostData: [],
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    addPostData: (state,{payload})=>{
      state.postData = payload;
      state.updatedPostData = payload;
    },
    addUpdatedPostData: (state,{payload})=>{
      state.updatedPostData = payload;
    },
  },
});

export const { addPostData, addUpdatedPostData } = postSlice.actions;

export default postSlice.reducer;

export const getSearchedPost = ({postList, searchInput}) => async dispatch => {
  if(searchInput !== ""){
    const searchedData = postList?.filter((row) => {
      const { title, content } = row;
      return(
        title.toString().toLowerCase().includes(searchInput?.toLowerCase()) || content.toString().toLowerCase().includes(searchInput?.toLowerCase())
        )
      }
    );
    dispatch(addUpdatedPostData([...searchedData]));
  }
}