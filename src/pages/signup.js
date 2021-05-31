import React, {useContext, useState} from 'react'
import {GlobalCtx} from "../App"

const Signup = (props) => {

    const {gState, setGState} = useContext(GlobalCtx)
    const {url} = gState

    const blank = {
        username: "", 
        password: ""
    }

    const [form, setForm] = useState(blank)

    const handleChange = (event) => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        const {username, password} = form

        fetch(`${url}/auth/signup`, {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({username, password})
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            setForm(blank) //reset the form
            props.history.push("/login")
        })
    }

    return <nav>
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" name="username" value={form.username} onChange={handleChange}/>
                <input type="password" name="password" value={form.password} onChange={handleChange}/>
                <input type="submit" value="signup" />
            </form>
        </div>
    </nav>
}

export default Signup