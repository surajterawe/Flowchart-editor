import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';

const dimensionAttrs = ['width', 'height'];

export default  memo(({ id }) => {


  return (
    <>
      <div className="wrapper gradient">
        <div className="inner">
          {dimensionAttrs.map((attr) => (
            <>
              <label>node {attr}</label>
              <input
                type="text"
                className="nodrag"
              />
            </>
          ))}
          {!dimensionAttrs && 'no node connected'}
        </div>
      </div>
      <Handle type="target" position={Position.Top} />
    </>
  );
});
