import React from 'react'
import { FaInfoCircle } from 'react-icons/fa'

function Alert({alert}) {
    return (

        alert && (
            <div className={`alert alert-${alert.type}`}>
               <FaInfoCircle /> {alert.msg}
            </div>
        )
        
    )
}

export default Alert
