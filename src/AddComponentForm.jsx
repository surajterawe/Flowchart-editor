import { TextField } from 'office-ui-fabric-react';
import React from 'react';
import CreateForm from './Createform';

const AddComponentForm = ({fields, setFields}) => {

  const handleMetadataChange = (field, value) => {
    setFields(prevFields => ({
      ...prevFields,
      [field]: value
    }));
  };

  return (
    <form
      style={{
        display: 'flex',
        gap: '10px',
        flexDirection: 'column',
        padding: '20px',
      }}
    >
      <TextField
        label="Name"
        className="textfield-custom"
        id="name"
        required
        value={fields.name}
        onChange={(e, newValue) => handleMetadataChange('name', newValue)}
      />
      
      <TextField
        label="Description"
        className="textfield-custom"
        multiline
        rows={3}
        id="description"
        required
        value={fields.description}
        onChange={(e, newValue) => handleMetadataChange('description', newValue)}
      />
      <CreateForm form={fields.form} setFields={setFields} />
    </form>
  );
};

export default AddComponentForm;
