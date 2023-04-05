import UserLogin from '@/components/UserLogin';
import UserSignUp from '@/components/UserSignUp';
import React, { useState } from 'react';
import styles from "../../styles/Login.module.css"

const index = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showSignUpPage, setShowSignUpPage] = useState(false);
  const [showSignInPage, setShowSignInPage] = useState(true);

  const handleSignUpButton = () => {
    setShowSignUpPage(true);
    setShowSignInPage(false);
  }

  const handleSignInButton = () => {
    setShowSignUpPage(false);
    setShowSignInPage(true);
  }

  return (
    <div className={styles.loginModal}>
      {showSignUpPage && <UserSignUp handleSignInButton={handleSignInButton}/>}
      {showSignInPage && <UserLogin handleSignUpButton={handleSignUpButton}/>}
    </div>
  )
}

export default index;