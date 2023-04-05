import React, { useEffect, useState } from 'react'
import axios from "axios";
import { useRouter } from 'next/router';
import AddOrModifyPostComponent from '@/components/AddOrModifyPostComponent';
import { useDispatch } from 'react-redux';
import { getUserData } from '../../../redux/slices/userSlice';

const index = () => {
  const router = useRouter();
  const postData = router.query.data ? JSON.parse(router.query.data) : {};
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserData());
  },[])

  const handlePostButton = async(title, content) => {
    console.log(postData);
    const formData = { ...postData, title: title, content: content}
    const response = await axios.put(`http://localhost:3000/api/posts/${postData._id}`, {...formData});
    console.log(response.data);
    debugger;
    router.replace(`/post/${postData._id}`);
  }

  return (
    <AddOrModifyPostComponent prevTitle={postData?.title} prevContent={postData?.content} handlePostButton={handlePostButton}/>
  )
}

export default index;