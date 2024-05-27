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
import TextNode from "./TextNode";
import ButtonEdge from "./ButtonEdge";
import "reactflow/dist/style.css";
import "./overview.css";
import NetworkingStorageAccount from "./NetworkingStorageAccount";
import { PrimaryButton } from "office-ui-fabric-react";
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

const initialNodesValues = [
  {
    name: "Storage Account",
    key: "storageaccountnode",
    form: [{
      key: "storageAccountName",
      name: "Storage Account Name",
      type: "text",
      options: [
        {
          description: "",
          key: "",
          name: "",
        },
      ],
    }, {
      key: "region",
      name: "Region",
      type: "dropdown",
      options: [
        {
          description: "",
          key: "lrs",
          name: "Locally-redundent storage (LRS)",
        },
        {
          description: "",
          key: "zrs",
          name: "Zone-redundent storage (ZRS)",
        },
      ],
    },{
      key: "performance",
      name: "Performance",
      type: "radio",
      options: [
        {
          description: "Recommended for most scenarios (general-purpose v2 account)",
          key: "standard",
          name: "Standard",
        },
        {
          description: "Recommended for scenarios that require low latency.",
          key: "premium",
          name: "Premium",
        },
      ],
    }, {
      key: "premiumaccounttype",
      name: "Premium account type",
      type: "dropdown",
      options: [
        {
          description: "",
          key: "blackbloba",
          name: "Black blobs",
        },
        {
          description: "",
          key: "fileshares",
          name: "File shares",
        },
        {
          description: "",
          key: "pageblobs",
          name: "Page blobs",
        },
      ],
    },  {
      key: "redundency",
      name: "Redundancy",
      type: "dropdown",
      options: [
        {
          description: "",
          key: "lrs",
          name: "Locally-redundent storage (LRS)",
        },
        {
          description: "",
          key: "zrs",
          name: "Zone-redundent storage (ZRS)",
        },
      ],
    }],
  },
];

const getId = (id) => `dndnode_${id}`;

const App = () => {
  const reactFlowWrapper = useRef(null);
  const [nodeTypes, setNodeType] = useState({
    // "cstmform-storageaccountnode": TextNode,
    networkingsStorageAccount: NetworkingStorageAccount,
  });
  const [textareavalue, setTextAreaValue] = useState("");
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [output, setOutput] = useState({});
  const [fields, setFields] = useState(defaultFields);
  const [open, setOpen] = React.useState(false);
  const [outputdrawer, setoutputdrawer] = useState(false);
  const [nodeValue, setNodesValue] = useState([]);


  useEffect(() => {
    if (nodes && nodeValue.length > 0) {
      const outputData = {};
      nodes.forEach((itemsValues, index) => {
        const formData = nodeValue.find((items) =>
          items.key.includes("cstmform")
            ? itemsValues.type === items.key
            : itemsValues.type === `cstmform-${items.key}`
        );

        outputData[itemsValues.id] = {
          ...itemsValues,
          data: { ...itemsValues.data, formData },
        };
      });
      setOutput(outputData);
    }

    // nodes,nodeValue)
  }, [nodes]);

  useEffect(()=> {
      setNodesValue([...initialNodesValues]);
      const nodeValueTemperory = { ...nodeTypes };
      initialNodesValues.forEach((itemValue) => {
        nodeValueTemperory[`cstmform-${itemValue.key}`] = memo(() => {
          return <NodeFormValue component={itemValue} />;
        });
      });
      
      setNodeType({ ...nodeValueTemperory });
  },[])

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
        id: getId(uuidv4()),
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
