import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import styles from "../../styles/Post.module.css"
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { getUserData } from '../../../redux/slices/userSlice';

const modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { header: [3, 4, 5, 6] }, { font: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' },
    ],
    ['clean'],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
}

const Post = ({postData}) => {

  const {author, title, content, _id, createdAt, comments} = postData;
  const [commentData, setCommentData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [post, setPost] = useState(postData)
  const router = useRouter();
  const { userData } = useSelector((store) => store.user);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserData());
  },[])

  const handlePostComment = async() => {
    console.log(commentData);
    if(userData){
      if(commentData != ""){
        const formData = {...postData, comments:[...comments, {author: userData.email, comment: commentData}]};
        const response = await axios.put(`http://localhost:3000/api/posts/${_id}`, {...formData});
        console.log(response.data);
        setCommentData('');
        router.replace(`/post/${_id}`);
      }
    }
    else{
      router.push("/login");
    }
  }

  const handleEditPostButton = () => {
    console.log(postData);
    debugger;
    router.push({
      pathname: "/editpost", 
      query: {data: JSON.stringify(postData)},
    },'/editpost');
  }

  const handleDeletePostButton = async() => {
    const response = await axios.delete(`http://localhost:3000/api/posts/${_id}`);
    console.log(response.data);
    router.replace('/');
  }

  return (
    <div className={styles.postMain}>
      <section className={styles.topSection}>
        <section className={styles.userInfo}>
          <h2>{author}</h2>
          <span>{createdAt.split("T")[0]}</span>
        </section>
        {
          (author === userData?.email || userData?.role === "admin")
          &&
          <>
          <button onClick={handleEditPostButton}>Edit</button>
          <button onClick={handleDeletePostButton}>Delete</button>
          </>

        }
      </section>
      <section className={styles.postInfo}>
        <h1>
          {title}
        </h1>
        <section className={styles.content}>
        <div style={{margin:"0"}} dangerouslySetInnerHTML={{ __html: content }}></div>
       </section>
      </section>
      <section className={styles.divider}></section>
      <section className={styles.addCommentSection}>
        <h2>Add a Comment</h2>
        <ReactQuill style={{width: "100%"}} placeholder='Title' modules={modules} theme="snow" value={commentData} onChange={setCommentData} />
        <button onClick={handlePostComment}>Post</button>
      </section>
      <section className={styles.commentSection}>
        <h2>
          Comments
        </h2>
        <div className={styles.commentList}>
        {
          comments?.map((data, index) => {
            const { comment, author, _id } = data; 
            return(
              <div key={_id} className={styles.commentContainer}>
                <span>{author}</span>
                <div style={{margin:"0"}} dangerouslySetInnerHTML={{ __html: comment }}></div>
              </div>
            )
          })
        }
        </div>
      </section>
    </div>
  )
}

export const getServerSideProps = async ({ params }) => {
  const res = await axios.get(`http://localhost:3000/api/posts/${params.id}`);
  return {
    props: { postData: res.data },
  };
};

export default Post;