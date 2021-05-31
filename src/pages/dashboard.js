import React, { useContext, useEffect, useRef, useState } from 'react'
import { GlobalCtx } from "../App"

const Dashboard = (props) => {
    const { gState, setGState } = useContext(GlobalCtx)
    const { url, token } = gState
    const [notes, setNotes] = useState(null)
    const [updateID, setUpdateID] = useState(null)

    const input = useRef(null)
    const update = useRef(null)

    const getNotes = async () => {
        const response = await fetch(url + "/note/", {
            method: "get",
            headers: {
                Authorization: "bearer " + token
            }
        })
        const data = await response.json()
        console.log(data)
        setNotes(data)
    }

    useEffect(() => {
        getNotes()
    }, [])

    const handleClick = () => {
        const note = input.current.value
        fetch(url + "/note/", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "bearer " + token
            },
            body: JSON.stringify({note})
        })
        .then(response => response.json())
        .then(data => {
            input.current.value = "";
            getNotes();
        })
    }

    const handleUpdate = () => {
        const note = update.current.value
        fetch(url + "/note/" + updateID, {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "bearer " + token
            },
            body: JSON.stringify({note})
        })
        .then(response => response.json())
        .then(data => {
            update.current.value = "";
            setUpdateID(null)
            getNotes();
        })
    }

    const handleDelete = (id) => {
        fetch(url + "/note/" + id, {
            method: "delete",
            headers: {
                "Authorization": "bearer " + token
            },
        })
        .then(response => response.json())
        .then(data => {
            getNotes();
        })
    }

    return (
        <div>
            <h1>Dashboard</h1>
            <h2>New Note</h2>
            <input type="text" name="note" ref={input} />
            <button onClick={handleClick}>Create Note</button>
            <h2>Update Note</h2>
            <input type="text" name="note" ref={update} />
            <button onClick={handleUpdate}>Update Note</button>
            <h2>Notes</h2>
            <ul>
                {notes ? notes.map((note) => <li key={note._id}><h3>{note.note}</h3>
                <button onClick={() => handleDelete(note._id)}>Delete</button>
                <button onClick={() => {
                    setUpdateID(note._id)
                    update.current.value = note.note
                    }}>Edit</button>
                </li>) : null}
            </ul>
        </div>  
    )
}

export default Dashboard

