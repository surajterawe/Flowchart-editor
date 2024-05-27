import React from 'react'

const EditableText = ({handleChange, value, ...rest}) => {
  return (
    <div>  
    <input 
        value={value}

    />
    <p
        {...rest}> 
        {value}
    </p>
    </div>
  )
}

export default EditableText