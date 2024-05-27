import React, { useState, memo, useEffect } from "react";
import NodeFormValue from "./NodeFormValue"; // Adjust the import according to your project structure

function EditableTextarea({
  textareavalue,
  output,
  nodeTypes,
  setNodes,
  setNodesValue,
  setNodeType,
}) {
  const [textareaContent, setTextareaContent] = useState(textareavalue);
  const [outputState, setOutputState] = useState(
    JSON.stringify(output, null, 2)
  );

  const isJSON = (str) => {
    try {
      JSON.parse(str);
      return true;
    } catch (e) {
      return false;
    }
  };

  useEffect(() => {
    const valuedata = `{
        "dndnode_0": {
            "id": "dndnode_0",
            "type": "cstmform-storage",
            "position": {
                "x": 697,
                "y": 183
            },
            "data": {
                "label": "cstmform-storage node",
                "formData": {
                    "name": "Storage 1",
                    "key": "storage",
                    "description": "To pretty print JSON with React, you can use the JSON.stringify() method and pass JSON object as the first argument, null as the second argument, and the 2 as the third argument. This will return a string representation of the JSON object that is nicely formatted and easy to read.",
                    "form": [
                        {
                            "name": "Field 1",
                            "key": "field1",
                            "type": "text",
                            "options": [
                                {
                                    "description": "",
                                    "key": "",
                                    "name": ""
                                }
                            ]
                        },
                        {
                            "name": "Field 2",
                            "key": "field2",
                            "type": "radio",
                            "options": [
                                {
                                    "description": "To pretty print JSON with React, you can use the JSON.stringify() method and pass JSON object as the first argument, null as the second argument, and the 2 as the third argument. This will return a string representation of the JSON object that is nicely formatted and easy to read.",
                                    "key": "option1",
                                    "name": "Option 1"
                                },
                                {
                                    "description": "To pretty print JSON with React, you can use the JSON.stringify() method and pass JSON object as the first argument, null as the second argument, and the 2 as the third argument. This will return a string representation of the JSON object that is nicely formatted and easy to read.",
                                    "key": "option2",
                                    "name": "Option 2"
                                }
                            ]
                        }
                    ]
                }
            },
            "width": 400,
            "height": 232
        }
      }`;
    if (isJSON(valuedata)) {
      const value = JSON.parse(valuedata);
      Object.keys(value).map((items) => {
        let domcode = { ...value[items] };
        domcode["data"] = { label: domcode["data"].label };

        setNodes((nds) => nds.concat(domcode));
      });
    }
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setTextareaContent(value);

    if (value && isJSON(value)) {
      const EditNodes = JSON.parse(value);
      setNodesValue(EditNodes);
      const nodeValueTemperory = { ...nodeTypes };
      EditNodes.forEach((itemValue) => {
        nodeValueTemperory[`cstmform-${itemValue.key}`] = memo(() => {
          return <NodeFormValue component={itemValue} />;
        });
      });
      setNodeType({ ...nodeValueTemperory });
    }
  };

  return (
    <>
      <textarea
        style={{
          margin: "20px",
          padding: "20px",
          border: "1px solid #00000020",
          outline: "none",
          width: "86%",
          height: "200px",
        }}
        value={textareaContent}
        onChange={handleInputChange}
      />
      <textarea
        style={{
          margin: "20px",
          padding: "20px",
          border: "1px solid #00000020",
          outline: "none",
          width: "86%",
          height: "200px",
        }}
        value={outputState}
        onChange={(e) => setOutputState(e.target.value)}
      />
    </>
  );
}

export default EditableTextarea;
