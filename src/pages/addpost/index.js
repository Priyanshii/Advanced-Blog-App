import React, { useEffect, useState } from 'react'
import styles from '@/styles/AddPost.module.css'
import axios from "axios";
import { useRouter } from 'next/router';
import AddOrModifyPostComponent from '@/components/AddOrModifyPostComponent';
import { useDispatch, useSelector } from 'react-redux';
import { getUserData } from '../../../redux/slices/userSlice';

const index = () => {
  const router = useRouter();
  const { userData } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserData());
  },[])

  const handlePostButton = async(title, content) => {
    const formData = { title: title, content: content, author: userData?.email, comments: [] }
    const response = await axios.post(`http://localhost:3000/api/posts`, {...formData});
    console.log(response.data);
    router.replace("/");
  }

  return (
    <AddOrModifyPostComponent handlePostButton={handlePostButton}/>
  )
}

export default index;