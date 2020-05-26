import React from 'react'
import {FaGithub} from 'react-icons/fa'


function Navbar({title}) {

    return (
        <nav className="navbar bg-primary">
            <h1> <FaGithub /> {title} </h1>
        </nav>
    )
}

Navbar.defaultProps = {
    title: "Github Finder"
}

export default Navbar