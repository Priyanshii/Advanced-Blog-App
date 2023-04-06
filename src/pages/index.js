import { Inter } from 'next/font/google'
import styles from "../styles/Home.module.css"
import PostComponent from '@/components/PostComponent'
import HeaderComponent from '@/components/HeaderComponent'
import { useRouter } from 'next/router'
import axios from 'axios'
// import checkUser from '../../lib/checkUser's
import { useEffect, useRef, useState } from 'react'
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
  const [page, setPage] = useState(0);
  const divref = useRef();
  useEffect(() => {
    setPage(0);
    console.log(postList,user);
    dispatch(setUserData(user));
    dispatch(addPostData(postList));
  },[])

  const handlePrevPage = () => {
    if(page !== 0){
      setPage((page) => (page-1));
      divref.current.scrollTo(0, 0);
    }
  }

  const handleNextPage = () => {
    if(page < (updatedPostData.length/5)-1){
      setPage((page) => (page+1));
      divref.current.scrollTo(0, 0);
    }
  }

  return (
    <div ref={divref} className={styles.main}>
      {
        [...updatedPostData]?.reverse().slice((page*5), (page*5)+5)?.map((post) => {
          return(
            <PostComponent key={post._id} postData={post}/>
          )
        })
      }
      <div className={styles.pageButtonSection}>
        <button onClick={handlePrevPage}>{"<<"}</button>
        <span>{page+1}</span>
        <button onClick={handleNextPage}>{">>"}</button>
      </div>
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