import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import "./App.css";
import ReactFlow, {
  addEdge,
  MiniMap,
  Controls,
  ReactFlowProvider,
  Background,
  useNodesState,
  useEdgesState,
} from "reactflow";
import Sidebar from "./Sidebar";
import { v4 as uuidv4 } from "uuid";
import {
  nodes as initialNodes,
  edges as initialEdges,
} from "./initial-elements";
import ButtonEdge from "./ButtonEdge";
import "reactflow/dist/style.css";
import "./overview.css";
import { PrimaryButton } from "office-ui-fabric-react";
import { Drawer } from "@mui/material";
import AddComponentForm from "./AddComponentForm";
import { DefaultButton } from "@fluentui/react";
import NodeFormValue from "./NodeFormValue";
import EditableTextarea from "./Editabletextarea";
import { formFields } from "./config";
import { useDispatch, useSelector } from "react-redux";
import { setoutput } from "./Redux/outputslice";

export const isJSON = (str) => {
  try {
    JSON.parse(str);
    return true;
  } catch (e) {
    return false;
  }
};

const edgeTypes = {
  button: ButtonEdge,
};

const defaultFields = {
  name: "",
  key: "",
  description: "",
  form: [],
};

const nodeClassName = (node) => node.type;

const initialNodesValues = [
  {
    name: "Storage Account",
    key: "a93911b9-08dc-44b4-9664-648f12b0d84c",
    form: "9da04d87-adb8-4334-afc3-1b866cdb2a9b",
  },
];

const getId = (id) => `${id}`;

const App = () => {
  const reactFlowWrapper = useRef(null);
  const output  = useSelector((state) => state.output.value)
  const dispatch = useDispatch()
  const [nodeTypes, setNodeType] = useState({});
  const [textareavalue, setTextAreaValue] = useState("");
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  // const [output, setOutput] = useState({});
  const [fields, setFields] = useState(defaultFields);
  const [open, setOpen] = React.useState(false);
  const [outputdrawer, setoutputdrawer] = useState(false);
  const [nodeValue, setNodesValue] = useState([]);

  useEffect(() => {
    if (nodes && nodeValue.length > 0) {
      let outputData = {};
      nodes.forEach((itemsValues, index) => {
        if(Object.keys(output).includes(itemsValues.id)){
          outputData[itemsValues.id] = {
            ...output[itemsValues.id]
          };
        }
        else {
          outputData[itemsValues.id] = {
            ...itemsValues
          }
        }
      });
      dispatch(setoutput({...outputData}));
    }

    // nodes,nodeValue)
  }, [nodes]);

  useEffect(() => {
    setNodesValue([...initialNodesValues]);
  }, []);


  const handleNodeAddition = (ComponentForm) => {
    const formid = uuidv4()
    formFields[formid] = ComponentForm.form
    setNodesValue([...nodeValue, {name : ComponentForm.name, form : formid, key : uuidv4()}]);
    setFields({ ...defaultFields });
    setOpen(false);
  };

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);



  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      const type = event.dataTransfer.getData("application/reactflow");
      if (typeof type === "undefined" || !type) {
        return;
      }
      const formData = nodeValue
      const id = uuidv4()
      const unique_id = uuidv4()
      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      const formDataValue = nodeValue.find((items) =>
        items.key.includes("cstmform")
          ? type === items.key
          : type === `cstmform-${items.key}`
      );
      const newNode = {
        id: getId(unique_id),
        type : `cstmform-${id}`,
        position,
        data: { label: `${type} node`,  formData: {...formDataValue,formid : formDataValue.form , form : formFields[formDataValue.form]} },
      };
      if (formData) { 
        const nodeValueTemperory = { ...nodeTypes };
        formData.forEach((itemValue) => {
          nodeValueTemperory[`cstmform-${id}`] = memo(() => {
            return <NodeFormValue id={id}  unique_id={unique_id} newNode={newNode} component={itemValue} formfields={formFields[itemValue.form]} />;
          });
        })
        setNodeType(nodeValueTemperory);
      }
   
      setNodes((nds) => nds.concat(newNode));
    },

    [reactFlowInstance, nodeValue, output, nodeTypes]
  );

  const toggleOutputDrawer = (value) => {
    setoutputdrawer(value);
  };



  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  return (
    <div className="dndflow">
      <ReactFlowProvider>
        <div className="reactflow-wrapper" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            attributionPosition="top-right"
            nodeTypes={nodeTypes}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            edgeTypes={edgeTypes}
            className="overview"
          >
            <MiniMap zoomable pannable nodeClassName={nodeClassName} />
            <Controls />
            <Background />
          </ReactFlow>
        </div>
        <div
          style={{
            width: "20%",
            display: "flex",
            alignItems: "center",
            padding: "10px 10px 20px 10px",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Sidebar nodeValue={nodeValue} />
          <div
            style={{
              display: "flex",
              gap: "20px",
            }}
          >
            <PrimaryButton
              style={{
                marginLeft: "auto",
              }}
              onClick={toggleDrawer(true)}
              primary
              // secondaryText="This is the secondary text."
            >
              Add Component
            </PrimaryButton>
            <DefaultButton
              onClick={() => toggleOutputDrawer(true)}
              style={{ marginLeft: "auto" }}
            >
              Output
            </DefaultButton>
          </div>
        </div>
      </ReactFlowProvider>
      <Drawer
        anchor={"right"}
        open={outputdrawer}
        onClose={() => toggleOutputDrawer(false)}
      >
        <div
          style={{
            minWidth: "40rem",
            maxWidth: "40rem",
          }}
        >
          <p
            style={{
              fontSize: "18px",
              fontWeight: 600,
              margin: 0,
              display: "flex",
              alignItems: "baseline",
              padding: "20px",
              borderBottom: "1px solid #00000020",
            }}
          >
            Output
          </p>
          <EditableTextarea
            textareavalue={textareavalue}
            nodeTypes={nodeTypes}
            nodes={nodes}
            nodeValue={nodeValue}
            setNodes={setNodes}
            setNodeType={setNodeType}
            output={output}
            setNodesValue={setNodesValue}
          />
        </div>
      </Drawer>
      <Drawer anchor={"right"} open={open} onClose={() => toggleDrawer(false)}>
        <div
          style={{
            minWidth: "40rem",
            maxWidth: "40rem",
          }}
        >
          <p
            style={{
              fontSize: "18px",
              fontWeight: 600,
              margin: 0,
              display: "flex",
              alignItems: "baseline",
              padding: "20px",
              borderBottom: "1px solid #00000020",
            }}
          >
            Add Component
            <DefaultButton
              onClick={() => {
                if (fields.name) {
                  handleNodeAddition(fields);
                }
              }}
              style={{ marginTop: "10px", marginLeft: "auto" }}
            >
              Add Component
            </DefaultButton>
          </p>
          <AddComponentForm
            handleNodeAddition={handleNodeAddition}
            fields={fields}
            setFields={setFields}
          />
        </div>
      </Drawer>
    </div>
  );
};

export default App;
