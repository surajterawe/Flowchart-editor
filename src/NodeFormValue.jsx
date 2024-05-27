
import React from 'react'
import { Checkbox, ChoiceGroup, Label, TextField } from 'office-ui-fabric-react';
import { Dropdown } from "@fluentui/react/lib/Dropdown";
import { Handle, Position } from 'reactflow';

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

const NodeFormValue = ({component}) => {
  return (
    <>
    <div
      style={{
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
            {component?.form?.map((items) => {
              switch (items.type) {
                case "radio":
                  return (
                    <ChoiceGroup
                      options={items.options.map(
                        (option) => {
                          return {
                            key: option.key,
                            text: (
                              <p style={{ margin: 0 }}>
                                {option.name}
                              </p>
                            ),
                            ariaLabel:
                              "A label with a cat icon",
                            onRenderField: (
                              props,
                              render
                            ) => {
                              return (
                                <div>{render(props)}</div>
                              );
                            },
                          };
                        }
                      )}
                      label={items.name}
                      required={true}
                    />
                  );
                case "text":
                  return (
                    <TextField
                      label={items.name}
                      className="textfield-custom"
                      id={items.key}
                      required
                    />
                  );
                case "dropdown":
                  return (
                    <Dropdown
                      label={items.name}
                      style={{
                        position: "relative",
                      }}
                      onRenderOption={onRenderOption}
                      id={items.key}
                      placeholder="Select your Virtual Network"
                      options={items.options.map(
                        (option) => ({
                          key: option.key,
                          text: option.name,
                          description: option.description,
                        })
                      )}
                      required
                    />
                  );
                case "checkbox":
                  return (
                    <>
                      <Label required>{items.name}</Label>
                      {items.options.map((items) => {
                        return (
                          <Checkbox
                            label={items.name}
                            value={items.key}
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
    {/* <Handle type="source" style={handleStyle} isConnectable={true} position={Position.Left} /> */}
    <Handle
      type="target"
      style={handleStyle}
      id="netwrokingStorage"
      isConnectable={true}
      position={Position.Right}
    />
  </>
  )
}

export default NodeFormValue