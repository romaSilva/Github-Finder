import React, {useState} from 'react'

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
                <a 
                    className="btn btn-dark btn-sm my-1" 
                    target="_blank"
                    href={user.html_url}>More
                </a>
            </div>
        </div>
    )
}

export default UserItem
