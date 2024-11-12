import styles from './CreatePost.module.css'

import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthValue } from '../../context/AuthContext'
import { useInsertDocument } from '../../hooks/useInsertDocument'

const CreatePost = () => {
  const [title, setTitle] = useState("")
  const [image, setImage] = useState("")
  const [body, setBody] = useState("")
  const [tags, setTags] = useState([])
  const [formError, setFormError] = useState("")

  const {user} = useAuthValue()

  const {insertDocument, response} = useInsertDocument("posts")

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    setFormError("")

    //validate image URL
    try {
       new URL(image)
    } catch (error) {
      setFormError("Image needs to be an URL.")
    }

    //create tags array
    const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase())

    //values check
    if(!title || !image || !tags || !body){
      setFormError("Please, fill in all the fields.")
    }

    if (formError) return

    insertDocument({
      title,
      image,
      body,
      tags: tagsArray,
      uid: user.uid,
      createdBy: user.displayName,
    })

    //redirect to home page
    navigate("/")
  }

  return (
    <section className={styles.createPost}>
      <h2>Create Post</h2>
      <p>Write and share whatever you want!</p>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Title:</span>
          <input type="text" name="title" required placeholder="Title" onChange={(e) => setTitle(e.target.value)} value={title} />
        </label>
        <label>
          <span>Image URL:</span>
          <input type="text" name="image" required placeholder="Image" onChange={(e) => setImage(e.target.value)} value={image} />
        </label>
        <label>
          <span>Content:</span>
          <textarea name="body" required placeholder="Insert post content" onChange={(e) => setBody(e.target.value)} value={body}></textarea>
        </label>
        <label>
          <span>Image URL:</span>
          <input type="text" name="tags" required placeholder="Insert Tags" onChange={(e) => setTags(e.target.value)} value={tags} />
        </label>
        {!response.loading && <button className="btn">Sign Up</button>}
            {response.loading && <button className="btn" disabled>Wait...</button>}
            {response.error && <p className="error">{response.error}</p>}
            {formError && <p className="error">{formError}</p>}
      </form>
    </section>
  )
}

export default CreatePost