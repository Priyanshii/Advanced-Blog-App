import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import styles from "../styles/Login.module.css"

const UserLogin = ({handleSignUpButton}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const signInHandler = async() => {
    try {
      const res = await axios.post("/api/signin", {
        email,
        password,
      });
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.loginSection}>
      <h1>Login</h1>
      <input
        className={styles.input}
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        required
        />
      <input
        className={styles.input}
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        required
        />
      <button className={styles.loginButton} onClick={signInHandler}>Login</button>
      <section className={styles.bottomSection}>
        <span>New to BlogApp ?</span>
        <button className={styles.signUpButton} onClick={handleSignUpButton}>Sign-Up</button>
      </section>
    </div>
  )
}

export default UserLogin;