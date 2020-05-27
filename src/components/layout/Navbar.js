import React from 'react'
import { Link } from 'react-router-dom'
import { FaGithub } from 'react-icons/fa'


function Navbar({title}) {

    return (
        <nav className="navbar bg-primary">
            <h1> <FaGithub /> {title} </h1>
            <ul>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/about'>About</Link></li>
            </ul>
        </nav>
    )
}

Navbar.defaultProps = {
    title: "Github Finder"
}

export default Navbar