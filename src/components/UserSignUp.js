import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import styles from "../styles/Login.module.css"

const UserSignUp = ({handleSignInButton}) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  
  const signUpHandler = async() => {
    try {
      const response = await axios.post("/api/signup", {
        firstName,
        lastName,
        email,
        password,
      });
      console.log(response.data);
      router.replace("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.loginSection}>
      <h1>Sign-Up</h1>
      <input
        className={styles.input}
        type="text"
        placeholder="First Name"
        onChange={(e) => setFirstName(e.target.value)}
        value={firstName}
        />
      <input
        className={styles.input}
        type="text"
        placeholder="Last Name"
        onChange={(e) => setLastName(e.target.value)}
        value={lastName}
        />
      <input
        className={styles.input}
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        />
      <input
        className={styles.input}
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        />
      <button className={styles.loginButton} onClick={signUpHandler}>Sign-Up</button>
      <section className={styles.bottomSection}>
        <span>Already registered ?</span>
        <button className={styles.signUpButton} onClick={handleSignInButton}>Login</button>
      </section>
    </div>
  )
}

export default UserSignUp