import React, { memo } from "react";
import { Icon } from "@fluentui/react/lib/Icon";
import { Handle, Position } from "reactflow";


const handleStyle = {
  top: "10%",
};


export default memo(({ id }) => {

  return (
    <>
      <div
        style={{
          minWidth : "25rem",
          flexDirection: "column"
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
          <Icon iconName="StorageAcount" />
          Network Settings
        </p>
        <div
          className="inner"
          style={{
            paddingTop: "0",
          }}
        >
         
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
  );
});
