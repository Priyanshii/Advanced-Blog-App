import React, { useState } from 'react'
import styles from '../styles/Header.module.css'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { removeUser } from '../../redux/slices/userSlice'
import { removeCookies } from 'cookies-next'
import { getSearchedPost } from '../../redux/slices/postSlice'

const HeaderComponent = () => {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const { userData } = useSelector((store) => store.user);
  const { postData, updatedPostData } = useSelector((store) => store.post);

  const dispatch = useDispatch();

  const handleTitleClick = () => {
    router.push("/");
  }

  const handleAddPostClick = () => {
    if(userData){
      router.push("/addpost");
    }
    else{
      router.push("/login");
    }
  }

  const handleSearch = (value) => {
    setSearch(value);
    dispatch(getSearchedPost({postList:postData, searchInput:value}));

  }

  const handleSignIn = (e) => {
    router.push("/login");
  }

  const handleSignOut = (e) => {
    dispatch(removeUser());
    removeCookies("token");
    router.push("/");
  }

  return (
    <header className={styles.header}>
      <h1 className={styles.title} onClick={handleTitleClick}>BLOGAPP</h1>
      <section className={styles.headerRightSection}>
        {
          router.asPath === "/"
          &&
          <input
            className={styles.searchInput}
            type="text"
            placeholder="Search..."
            onChange={(e) => handleSearch(e.target.value)}
            value={search}/>
        }
        <button className={styles.headerButton} onClick={handleAddPostClick}>Add Post</button>
        {
          userData
          ?
          <button className={styles.headerButton} onClick={handleSignOut}>Sign Out</button>
          :
          <button className={styles.headerButton} onClick={handleSignIn}>Sign In</button>
        }
      </section>
      {
        userData 
        &&
        <span className={styles.userIntroSection}>Welcome {userData.firstName}!</span>
      }
    </header>
  )
}

export default HeaderComponent;