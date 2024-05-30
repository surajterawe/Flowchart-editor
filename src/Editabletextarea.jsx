// export default EditableTextarea;
import React, { useState, useEffect, memo } from "react";
import NodeFormValue from "./NodeFormValue";
import { useDispatch } from "react-redux";
import { setoutput } from "./Redux/outputslice";

function EditableTextarea({
  textareavalue,
  output,
  nodeTypes,
  nodeValue,
  nodes,
  setOutput,
  setNodes,
  setNodesValue,
  setNodeType,
}) {
  const [outputState, setOutputState] = useState("");
  const dispatch = useDispatch()
  useEffect(() => {
    setOutputState(JSON.stringify(output, null, 2));
  }, []);

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
      const values_json = Object.values(obj);
      // const formData = values
      const nodeValueTemperory = { ...nodeTypes };
      values_json.forEach((itemValue) => {
        nodeValueTemperory[`${itemValue.type}`] = memo(() => {
          return <NodeFormValue id={itemValue.type} unique_id={itemValue.id} output={obj} setOutput={setOutput} component={{...itemValue.data.formData, form : itemValue.data.formData.formid }} formfields={itemValue.data.formData.form}  />;
        });
      });
      dispatch(setoutput(obj))
      setNodeType({...nodeValueTemperory});
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
          height: "400px",
        }}
        value={outputState}
        onChange={(e) => handleChange(e.target.value)}
      />
    </>
  );
}

export default EditableTextarea;
