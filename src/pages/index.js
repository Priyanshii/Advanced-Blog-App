import { Inter } from 'next/font/google'
import styles from "../styles/Home.module.css"
import PostComponent from '@/components/PostComponent'
import HeaderComponent from '@/components/HeaderComponent'
import { useRouter } from 'next/router'
import axios from 'axios'
// import checkUser from '../../lib/checkUser's
import { useEffect, useState } from 'react'
import dbConnect from '../../lib/dbConnect'
import getUser from '../../lib/getUser'
import { useDispatch, useSelector } from 'react-redux'
import { addUser, setUserData } from '../../redux/slices/userSlice'
import { addPostData } from '../../redux/slices/postSlice'

const inter = Inter({ subsets: ['latin'] })

export default function Home({postList, user}) {
  const router = useRouter();
  const dispatch = useDispatch();
  const { postData, updatedPostData } = useSelector((store) => store.post);

  useEffect(() => {
    console.log(postList,user);
    dispatch(setUserData(user));
    dispatch(addPostData(postList));
  },[])
  return (
    <div className={styles.main}>
      {
        updatedPostData?.map((post) => {
          return(
            <PostComponent key={post._id} postData={post}/>
          )
        })
      }
    </div>
  )
}

export const getServerSideProps = async ({req, res}) => {
  await dbConnect();
  const response = await axios.get("http://localhost:3000/api/posts");
  const user = await getUser(req, res);
  console.log(user);
  if (user) {
    return {
      props: {
        postList: response.data,
        user: user,
      },
    };
  }
  else{
    return {
      props: {
        postList: response.data,
        user: null,
      }
    }
  }
};