import React, { useState } from 'react'

function Search({searchUsers, clearUsers, showClear, createAlert}) {

    const [text, setText] = useState('')

    const handleChange = e => setText(e.target.value)

    const handleSubmit = e => {
        e.preventDefault()
        if(text === '') {
            createAlert('Please enter something', 'light')
        } else {
            searchUsers(text)
            setText('')
        }

    }
    

    return (
        <div>
            <form onSubmit={handleSubmit} className="form">
                <input 
                    type="text" 
                    name="text" 
                    placeholder="Search Users..." 
                    value={text}
                    onChange={handleChange} 
                />
                <input 
                    className="btn btn-dark btn-block"
                    type="submit" 
                    value="Search" 
                />
            </form>

            {showClear && (
                <button 
                    className="btn btn-light btn-block" 
                    onClick={clearUsers}>Clear
                </button>)}
                
            
  
        </div>
    )
}

export default Search
