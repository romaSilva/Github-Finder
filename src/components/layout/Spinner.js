import React, { Fragment } from 'react'
import spinner from './spinner.gif'

function Spinner() {
    return (
        <Fragment>
           <img 
            src={spinner} 
            alt="Loading"
            style={spinnerStyle}/> 
        </Fragment>
    )
}

const spinnerStyle = {
    width: 'auto',
    margin: 'auto',
    display: 'block'
}

export default Spinner
