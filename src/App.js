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

import {
  nodes as initialNodes,
  edges as initialEdges,
} from "./initial-elements";
import TextNode from "./TextNode";
import ButtonEdge from "./ButtonEdge";
import "reactflow/dist/style.css";
import "./overview.css";
import NetworkingStorageAccount from "./NetworkingStorageAccount";
import {
  PrimaryButton,
} from "office-ui-fabric-react";
import { Drawer } from "@mui/material";
import AddComponentForm from "./AddComponentForm";
import { DefaultButton } from "@fluentui/react";
import NodeFormValue from "./NodeFormValue";
import EditableTextarea from "./Editabletextarea";

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


let id = 0;
const getId = () => `dndnode_${id++}`;

const App = () => {
  const reactFlowWrapper = useRef(null);
  const [nodeTypes, setNodeType] = useState({
    storageaccountnode: TextNode,
    networkingsStorageAccount: NetworkingStorageAccount,
  });
  const [textareavalue, setTextAreaValue] = useState("")
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [output, setOutput] = useState({

  });
  const [fields, setFields] = useState(defaultFields);
  const [open, setOpen] = React.useState(false);
  const [outputdrawer, setoutputdrawer] = useState(false);
  const [nodeValue, setNodesValue] = useState([]);



  useEffect(()=>{
    if(nodes && nodeValue.length > 0) {
      const outputData = {...output}
      nodes.forEach(itemsValues => {
       const formData = nodeValue.find(items => itemsValues.type === `cstmform-${items.key}`)
       outputData[itemsValues.id] = {...itemsValues, data : {...itemsValues.data, formData}} 
      })
      setOutput(outputData)
    }

    // nodes,nodeValue)
  },[nodes])


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

  const handleNodeAddition = (ComponentForm) => {
    setNodesValue([...nodeValue, ComponentForm]);
    setFields({ ...defaultFields });
    setNodeType({
      ...nodeTypes,
      [`cstmform-${ComponentForm.key}`]: memo(() => {
        return (
          <>
            <NodeFormValue component={ComponentForm} /> 
          </>
        );
      }),
    });
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
      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      const newNode = {
        id: getId(),
        type,
        position,
        data: { label: `${type} node` },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance]
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
            // fitView
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
                if (fields?.key && fields.name) {
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
