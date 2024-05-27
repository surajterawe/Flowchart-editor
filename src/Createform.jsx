import { IconButton } from "@fluentui/react";
import { initializeIcons } from "@uifabric/icons";
import { TextField, DefaultButton } from "office-ui-fabric-react";
import { Dropdown } from '@fluentui/react/lib/Dropdown';
import React from "react";

initializeIcons();

const CreateForm = ({ form, setFields }) => {
  const handleFieldChange = (index, field, value) => {
    const updatedForm = [...form];
    updatedForm[index] = {
      ...updatedForm[index],
      [field]: value,
    };
    setFields(prevFields => ({
      ...prevFields,
      form: updatedForm
    }));
  };

  const handleOptionChange = (fieldIndex, optionIndex, field, value) => {
    const updatedForm = [...form];
    const updatedOptions = [...updatedForm[fieldIndex].options];
    updatedOptions[optionIndex] = {
      ...updatedOptions[optionIndex],
      [field]: value,
    };
    updatedForm[fieldIndex].options = updatedOptions;
    setFields(prevFields => ({
      ...prevFields,
      form: updatedForm
    }));
  };

  const addOption = (fieldIndex) => {
    const updatedForm = [...form];
    updatedForm[fieldIndex].options.push({
      description: "",
      key: "",
      name: "",
    });
    setFields(prevFields => ({
      ...prevFields,
      form: updatedForm
    }));
  };

  const removeOption = (fieldIndex, optionIndex) => {
    const updatedForm = [...form];
    const updatedOptions = updatedForm[fieldIndex].options.filter(
      (_, idx) => idx !== optionIndex
    );
    updatedForm[fieldIndex].options = updatedOptions;
    setFields(prevFields => ({
      ...prevFields,
      form: updatedForm
    }));
  };

  const addField = () => {
    setFields(prevFields => ({
      ...prevFields,
      form: [
        ...prevFields.form,
        {
          name: "",
          key: "",
          type: "Text",
          options: [{ description: "", key: "", name: "" }],
        },
      ]
    }));
  };

  const removeField = (index) => {
    const updatedForm = form.filter((_, idx) => idx !== index);
    setFields(prevFields => ({
      ...prevFields,
      form: updatedForm
    }));
  };

  const renderOptionsForm = (fieldIndex) => {
    return form[fieldIndex].options.map((option, optionIndex) => (
      <div
        key={optionIndex}
        style={{
          marginBottom: "0px",
          display: "flex",
          flexWrap: "wrap",
          width: "calc(50% - 15px)",
        }}
      >
        <p
          style={{
            fontSize: "16px",
            width: "100%",
            display: "flex",
            borderBottom: "1px solid #00000020",
            gap: "20px",
            alignItems: "baseline",
            marginTop: 0,
            marginBottom: "0px",
            fontWeight: 600,
          }}
        >
          Option {optionIndex + 1}:
          <IconButton
            style={{ marginLeft: "auto" }}
            onClick={() => removeOption(fieldIndex, optionIndex)}
            iconProps={{ iconName: "ChromeClose" }}
            title="Emoji"
            ariaLabel="Emoji"
          />
        </p>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
            width: "100%",
          }}
        >
          <div
            style={{
              width: "calc(50% - 5px)",
            }}
          >
            <TextField
              label="Name"
              name="name"
              value={option.name}
              onChange={(e, newValue) =>
                handleOptionChange(fieldIndex, optionIndex, "name", newValue)
              }
            />
          </div>
          <div
            style={{
              width: "calc(50% - 5px)",
            }}
          >
            <TextField
              label="Key"
              name="key"
              value={option.key}
              onChange={(e, newValue) =>
                handleOptionChange(fieldIndex, optionIndex, "key", newValue)
              }
            />
          </div>
          <div
            style={{
              width: "100%",
            }}
          >
            <TextField
              label="Description"
              name="description"
              multiline
              rows={4}
              value={option.description}
              onChange={(e, newValue) =>
                handleOptionChange(
                  fieldIndex,
                  optionIndex,
                  "description",
                  newValue
                )
              }
            />
          </div>
        </div>
      </div>
    ));
  };

  const renderFieldsForm = () => {
    return form.map((field, index) => (
      <div
        key={index}
        style={{
          marginBottom: "20px",
          padding: "20px",
          boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
        }}
      >
        <p
          style={{
            marginTop: "0px",
            display: "flex",
            fontSize: "16px",
            marginBottom: "20px",
            fontWeight: 600,
          }}
        >
          Field {index + 1}:
          <IconButton
            style={{ marginLeft: "auto" }}
            onClick={() => removeField(index)}
            iconProps={{ iconName: "ChromeClose" }}
            title="Emoji"
            ariaLabel="Emoji"
          />
        </p>
        <TextField
          label="Name"
          name="name"
          value={field.name}
          onChange={(e, newValue) => handleFieldChange(index, "name", newValue)}
          style={{ display: "block", marginBottom: "10px" }}
        />
        <TextField
          label="Key"
          name="key"
          value={field.key}
          onChange={(e, newValue) => handleFieldChange(index, "key", newValue)}
          style={{ display: "block", marginBottom: "10px" }}
        />
        <Dropdown
          label="Type"
          selectedKey={field.type}
          calloutProps={{ doNotLayer: true }}
          onChange={(e, option) => handleFieldChange(index, "type", option.key)}
          options={[
            { key: "text", text: "Text" },
            { key: "radio", text: "Radio" },
            { key: "checkbox", text: "Checkbox" },
            { key: "dropdown", text: "Dropdown" },
          ]}
          style={{ display: "block", marginBottom: "10px" }}
        />
        {(field.type === "radio" ||
          field.type === "checkbox" ||
          field.type === "dropdown") && (
          <div
            style={{
              gap: "30px",
              marginTop: "20px",
            }}
          >
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "10px",
                justifyContent: "space-between",
              }}
            >
              {renderOptionsForm(index)}
            </div>
            <DefaultButton
              onClick={() => addOption(index)}
              style={{ marginTop: "10px" }}
            >
              Add Option
            </DefaultButton>
          </div>
        )}
      </div>
    ));
  };

  return (
    <div>
      <p
        style={{
          fontSize: "16px",
          fontWeight: 600,
          margin: 0,
          marginTop: "20px",
        }}
      >
        Create Form
      </p>
      <div
        style={{
          marginTop: "20px",
        }}
      >
        <DefaultButton
          onClick={addField}
          style={{
            marginBottom: "20px",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: 600,
            margin: 0,
            display: "flex",
            gap: "20px",
            alignItems: "center",
            width: "fit-content",
            marginTop: 0,
          }}
        >
          Add Field
        </DefaultButton>

        {form.length > 0 && (
          <div style={{ marginTop: "20px" }}>{renderFieldsForm()}</div>
        )}
      </div>
    </div>
  );
};

export default CreateForm;
