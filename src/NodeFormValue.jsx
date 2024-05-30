import React, { useEffect, useState } from "react";
import {
  Checkbox,
  ChoiceGroup,
  Label,
  TextField,
} from "office-ui-fabric-react";
import { Dropdown } from "@fluentui/react/lib/Dropdown";
import { Handle, Position } from "reactflow";
import { useDispatch, useSelector } from "react-redux";
import { setoutput } from "./Redux/outputslice";

const handleStyle = {
  top: "10%",
};

const onRenderOption = (option) => {
  return (
    <div
      style={{
        display: "flex",
      }}
    >
      <div>
        <span
          style={{
            fontWeight: option.description ? 600 : 500,
          }}
        >
          {option.text}
        </span>{" "}
        {option.description ? `: ${option.description}` : ""}
      </div>
    </div>
  );
};

const NodeFormValue = ({ component, formfields, unique_id, id }) => {
  const [fields, setFields] = useState(formfields);
  const output = useSelector((state) => state.output.value);
  const dispatch = useDispatch();

  useEffect(() => {
    setFields([...output[unique_id]?.data?.formData?.form]);
  }, [output]);

  const handleChange = (key, value, isAppend = false) => {
    const index = fields.findIndex((item) => item.key === key);
    let fieldData = {
      ...fields[index],
      value: isAppend ? [...fields[index].value, value] : value,
    };
    const currentForm = [...fields];
    currentForm[index] = { ...fieldData };
    const currentOutput = { ...output };
    currentOutput[unique_id] = {
      ...currentOutput[unique_id],
      data: {
        ...currentOutput[unique_id].data,
        formData: {
          ...currentOutput[unique_id].data.formData,
          form: [...currentForm],
        },
      },
    };
    dispatch(setoutput({ ...currentOutput }));
    // console.log(currentOutput, id,unique_id)
    setFields([...currentForm]);
  };

  return (
    <>
      <div
        style={{
          maxWidth: "40rem",
          minWidth: "25rem",
          flexDirection: "column",
        }}
        className="wrapper gradient"
      >
        <p
          style={{
            position: "relative",
            borderBottom: "1px solid #00000010",
            color: "black",
            marginTop: "5px",
            marginBottom: "1px",
            fontWeight: "600",
            padding: "5px 0 9px 20px",
            fontFamily: "sans-serif",
            fontSize: "18px",
          }}
        >
          {component.name}
        </p>
        <div
          className="inner"
          style={{
            paddingTop: "0",
          }}
        >
          <form>
            <div className="inputWrapper">
              {fields?.map((items, index) => {
                switch (items.type) {
                  case "radio":
                    return (
                      <ChoiceGroup
                        onChange={(ev, option) => {
                          handleChange(items.key, option.key);
                        }}
                        selectedKey={fields[index].value}
                        id={items.key}
                        options={items.options.map((option) => {
                          return {
                            key: option.key,
                            text: (
                              <>
                                {option?.description ? (
                                  <p style={{ margin: 0 }}>
                                    <span style={{ fontWeight: 600 }}>
                                      {option.name}
                                    </span>
                                    : {option?.description}
                                  </p>
                                ) : (
                                  <p style={{ margin: 0 }}>
                                    {`${option.name}`}
                                  </p>
                                )}
                              </>
                            ),
                            ariaLabel: "A label with a cat icon",
                            onRenderField: (props, render) => {
                              return <div>{render(props)}</div>;
                            },
                          };
                        })}
                        label={items.name}
                        required={true}
                      />
                    );
                  case "text":
                    return (
                      <TextField
                        label={items.name}
                        value={fields[index].value}
                        onChange={(ev, value) => {
                          handleChange(items.key, value);
                        }}
                        className="textfield-custom"
                        id={items.key}
                        required
                      />
                    );
                  case "dropdown":
                    return (
                      <Dropdown
                        label={items.name}
                        selectedKey={fields[index].value}
                        style={{
                          position: "relative",
                        }}
                        onChange={(ev, option) => {
                          handleChange(items.key, option.key);
                        }}
                        onRenderOption={onRenderOption}
                        id={items.key}
                        placeholder="Select your Virtual Network"
                        options={items.options.map((option) => ({
                          key: option.key,
                          text: option.name,
                          description: option.description,
                        }))}
                        required
                      />
                    );
                  case "checkbox":
                    return (
                      <>
                        <Label required>{items.name}</Label>
                        {items.options.map((item) => {
                          return (
                            <Checkbox
                              checked={fields[index]?.value?.includes(item.key)}
                              onChange={(e, isChecked) => {
                                let currentValue = fields[index]?.value ? [...fields[index]?.value] : []
                                if(isChecked){
                                  currentValue = [...currentValue, item.key]
                                }
                                else {
                                  const index = currentValue.findIndex(value => value === item.key)
                                  currentValue.splice(index,1)
                                }
                                handleChange(items.key, currentValue);
                              }}
                              label={item.name}
                              value={item.key}
                            />
                          );
                        })}
                      </>
                    );
                  default:
                    <></>;
                }
              })}
            </div>
          </form>
        </div>
      </div>
      <Handle
        type="target"
        style={handleStyle}
        id="netwrokingStorage"
        isConnectable={true}
        position={Position.Right}
      />
    </>
  );
};

export default NodeFormValue;
