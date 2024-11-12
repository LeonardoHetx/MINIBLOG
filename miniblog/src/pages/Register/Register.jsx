
import styles from './Register.module.css'

import { useState, useEffect } from 'react'

import { useAuthentication } from '../../hooks/useAuthentication'

const Register = () => {
const [displayName, setDisplayName] = useState("")
const [email, setEmail] = useState("")
const [password, setPassword] = useState("")
const [confirmPassword, setConfirmPassword] = useState("")
const [error, setError] = useState("")

const {createUser, error: authError, loading} = useAuthentication()
 
const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    const user = {
        displayName,
        email,
        password
    }

    if(password != confirmPassword){
        setError("Passwords must be the same")
        return
    }

    const res = await createUser(user)

    console.log(res)
}

useEffect(() => {
    if (authError){
        setError(authError)
    }

}, [authError])

    return(
        <div className={styles.register}>
        <h1>Sign Up to post</h1>
        <p>create your username and share your stories</p>
        <form onSubmit={handleSubmit}>
            <label>
                <span>Name:</span>
                <input type="text" name="displayName" required placeholder="username" value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
            </label>
            <label>
                <span>Email:</span>
                <input type="email" name="email" required placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </label>
            <label>
                <span>Password:</span>
                <input type="password" name="password" required placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </label>
            <label>
                <span>Confirm Password:</span>
                <input type="password" name="confirmPassword" required placeholder="confirm password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            </label>
            {!loading && <button className="btn">Sign Up</button>}
            {loading && <button className="btn" disabled>Wait...</button>}
            {error && <p className="error">{error}</p>}
        </form>
        </div>
    )
}

export default Register