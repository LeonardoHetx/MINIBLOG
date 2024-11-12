import styles from './home.module.css'

//hooks
import { useNavigate, Link } from 'react-router-dom'
import { useState } from 'react'

//components

const Home = () => {

    const [query, setQuery] = useState("")
    const [posts] = useState([])

    const handleSubmit = (e) => {
        e.preventDefault()
    }
    return(
        <section className={styles.home}>
            <h1>Recent Posts</h1>
            <form onSubmit={handleSubmit} className={styles.search_form}>
                <input type="text" placeholder="Search for tags..." onChange={(e) => setQuery(e.target.value)}/>
                <button className="btn btn-dark">Search</button>
            </form>
            <div>
                <h1>Posts...</h1>
                {posts && posts.length === 0 && (
                    <div className={styles.noposts}>
                        <p>No posts found</p>
                        <Link to="/post/create" className="btn">Create first post</Link>
                    </div>
                )}
            </div>
        </section>
    )
}

export default Home