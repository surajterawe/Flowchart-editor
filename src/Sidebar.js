import React from 'react';

const SidebarPanal = ({nodeValue}) => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside>

      {/* <div className="dndnode" onDragStart={(event) => onDragStart(event, 'customContainer')} draggable>
        Custom Container
      </div>  */}
      
      {
        nodeValue.map(items => {
          return <div className="dndnode" onDragStart={(event) => onDragStart(event, `cstmform-${items.key}`)} draggable>
            {items.name}
          </div>
        })
      }
      {/* <div className="dndnode output" onDragStart={(event) => onDragStart(event, 'output')} draggable>
        Output Node
      </div> */}
    </aside>

  );
};

export default SidebarPanal