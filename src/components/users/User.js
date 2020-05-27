import React, { useEffect, Fragment } from 'react'
import { Link } from 'react-router-dom'
import Spinner from '../layout/Spinner'
import { FaCheck, FaTimesCircle } from 'react-icons/fa'

function User({getUser, getUserRepos, match, user, loading, repos}) {

    useEffect(() => {
        getUser(match.params.login)
    }, [])


    return (

        loading ? 
        
        <Spinner /> :
        
        <Fragment>
            <Link className='btn btn-light' to='/'>
            Back To Search
            </Link>
            Hireable: {' '} 
            {user.hireable ? 
            <FaCheck className="text-success" /> :
            <FaTimesCircle className="text-danger" />}
            <div className="card grid-2">
                <div className="all-center">
                    <img 
                    className="round-img" 
                    src={user.avatar_url} 
                    alt=""
                    style={{ width: '150px'}}/>
                    <h1>{user.name}</h1>
                    <p>Location: {user.location}</p>
                </div>
                <div>
                    {user.bio && (
                        <Fragment>
                            <h3>Bio</h3>
                            <p>{user.bio}</p>
                        </Fragment>
                    )}
                    <a className="btn btn-dark my-1" href={user.html_url} target="_black">
                        Visit Github Profile
                    </a>
                    <ul>
                        <li>{user.login && <Fragment>
                                <strong>Username: </strong> {user.login}
                            </Fragment>}
                        </li>
                        <li>{user.company && <Fragment>
                                <strong>Company: </strong> {user.company}
                            </Fragment>}
                        </li>
                        <li>{user.blog && <Fragment>
                                <strong>Website: </strong> {user.blog}
                            </Fragment>}
                        </li>
                    </ul>
                </div>
            </div>
            <div>
                <div className="badge badge-primary">Followers: {user.followers}</div>
                <div className="badge badge-success">Following: {user.following}</div>
                <div className="badge badge-light">Public Repos: {user.public_repos}</div>
                <div className="badge badge-dark">Public Gists: {user.public_gists}</div>
            </div>

        </Fragment>
    )
}

export default User
