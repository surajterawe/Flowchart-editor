import React, { useState } from 'react'

const EditableText = ({handleChange, value, ...rest}) => {
  const [toggleEdit, setToggleEdit] = useState(false)
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