import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';

const App = () => {

    const uniqId = uuidv4()
    // how to short uuid 
    const smallId = uniqId.slice(0, 8);

    const [inputVal, setInputVal] = useState("")
    const [note, setNote] = useState(JSON.parse(localStorage.getItem('privateNote')) || []);

    const addNote = (e) => {
        setInputVal(e.target.value)
    }

    const enterKey = (e) => {
        if (e.key === "Enter") {
            setNote((prev) => {
                return [
                    ...prev,
                    { text: inputVal, id: smallId }
                ]
            })
            setInputVal('')
        }
    }

    const remove = (eachId) => {
        setNote((prev) => {
            return (
                prev.filter((ele) => {
                    return eachId !== ele.id
                })
            )

        })
    }

    useEffect(()=>{
      localStorage.setItem('privateNote' , JSON.stringify(note));
    },[note])

    return (
        <div>
            <main>
                <h1>To-Do List</h1>
                <div className="box">
                    <input type="text" id="itemInput" autoFocus placeholder="Write something here..." onKeyUp={enterKey} value={inputVal} onChange={addNote} />
                    <ul id="to_do_box">
                        {note.map((ele) => {
                            return (
                                <li key={ele.id}>
                                    <p class="task">{ele.text}</p> <span onClick={() => remove(ele.id)} class="close">✖</span>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </main>
        </div>
    )
}

export default App
