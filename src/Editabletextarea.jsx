// export default EditableTextarea;
import React, { useState, memo, useEffect } from "react";
import NodeFormValue from "./NodeFormValue"; // Adjust the import according to your project structure

function EditableTextarea({
  textareavalue,
  output,
  nodeTypes,
  nodes,
  setNodes,
  setNodesValue,
  setNodeType,
}) {
  const [outputState, setOutputState] = useState("");

  useEffect(()=> {
    setOutputState(JSON.stringify(output, null, 2))
  },[])

  const isJSON = (str) => {
    try {
      JSON.parse(str);
      return true;
    } catch (e) {
      return false;
    }
  };


  const handleChange = (value) => {
    setOutputState(value);
    if (value && isJSON(value)) {
      const obj = JSON.parse(value);
      const formDataList = [
        ...Object.values(obj).map((items) => items?.data?.formData),
      ];
      setNodesValue([...formDataList]);
      const nodeValueTemperory = { ...nodeTypes };
      formDataList.forEach((itemValue) => {
        nodeValueTemperory[`cstmform-${itemValue.key}`] = memo(() => {
          return <NodeFormValue component={itemValue} />;
        });
      });
      
      setNodeType({ ...nodeValueTemperory });
      // const currentNodes = [...nodes]
    
      setNodes([
        ...Object.values(obj).map((items) => {
          return {
            ...items,
            data: {
              label: items?.data?.label,
            },
          };
        }),
      ]);
    }
  };

  return (
    <>
      {/* <textarea
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
      /> */}
      <textarea
        style={{
          margin: "20px",
          padding: "20px",
          border: "1px solid #00000020",
          outline: "none",
          width: "86%",
          height: "400px",
        }}
        value={outputState}
        onChange={(e) => handleChange(e.target.value)}
      />
    </>
  );
}

export default EditableTextarea;
