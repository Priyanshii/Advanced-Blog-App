import { useRouter } from 'next/router'
import React from 'react'
import styles from '../styles/PostCard.module.css'

const PostComponent = ({postData}) => {

  const {author, title, content, _id, createdAt} = postData;
  const router = useRouter();
  const handlePostCardClick = () => {
    router.push(`/post/${_id}`);
  }

  return (
    <div className={styles.postContainer}>
      <section className={styles.postInfo} onClick={() => handlePostCardClick()}>
        <h1>{title}</h1>
        <div dangerouslySetInnerHTML={{ __html: content }}></div>
      </section>
      <section className={styles.extraInfo}>
        <div className={styles.userSection}>
          <span>Posted By:</span>
          <div className={styles.userInfo}>{author}</div>
        </div>
        <span className={styles.date}>
          {createdAt.split("T")[0]}
        </span>
      </section>
    </div>
  )
}

export default PostComponent
