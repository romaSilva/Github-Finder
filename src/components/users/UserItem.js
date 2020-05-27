import React, {useState} from 'react'
import { Link } from 'react-router-dom'

function UserItem({user}) {

    return (

        <div className="card text-center">
           <img 
                className="round-img" 
                src={user.avatar_url} 
                alt="avatar" 
                style={{ width: '60px'}}
           />

            <h3>{user.login}</h3>

            <div>
                <Link 
                    className="btn btn-dark btn-sm my-1" 
                    to={`/user/${user.login}`}>More
                </Link>
            </div>
        </div>
    )
}

export default UserItem
