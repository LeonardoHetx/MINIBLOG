import { Link } from 'react-router-dom'
import styles from './about.module.css'

const About = () => {
    return(
        <section className={styles.about}>
            <h2>About Mini <span>Blog</span></h2>
            <p>This project consists of a blog made in React and Firebase</p>
            <Link to="/post/create" className="btn">Criar post</Link>
        </section>
    )
}

export default About