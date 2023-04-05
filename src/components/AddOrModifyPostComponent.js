import React, { useState } from 'react'
import dynamic from 'next/dynamic'
import styles from '../styles/AddPost.module.css'
import axios from "axios";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import 'react-quill/dist/quill.snow.css';
import { useRouter } from 'next/router';

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
    ['link', 'image'],
    ['clean'],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
}

const AddOrModifyPostComponent = ({prevTitle='', prevContent='', handlePostButton}) => {

  const [title, setTitle] = useState(prevTitle);
  const [content, setContent] = useState(prevContent);

  return (
    <div className={styles.container}>
      <div className={styles.editorSection}>
        <div className={styles.titleEditor}>
          <h2>TITLE</h2>
          <input 
            type="text"
            value={title} 
            onChange={(e) => {setTitle(e.target.value)}}
            className={styles.titleInput}
            placeholder="Title..."
          />
        </div>
        <div className={styles.contentEditor}>
          <h2>CONTENT</h2>
          <ReactQuill style={{height: "200px", width: "100%"}} placeholder='Write content here...' modules={modules} theme="snow" value={content} onChange={setContent} />
        </div>
        <div className={styles.postButton}>
          <button onClick={() => {handlePostButton(title, content)}}>
            Post
          </button>
        </div>
      </div>
    </div>
  )
}

export default AddOrModifyPostComponent;