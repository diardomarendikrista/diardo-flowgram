// src/components/node-add-panel.jsx
import React from "react";
import {
  WorkflowDragService,
  useService,
} from "@flowgram.ai/free-layout-editor";

const nodeTypes = ["Custom 1", "Custom 2", "Condition"];

export const NodeAddPanel = () => {
  const dragService = useService(WorkflowDragService);

  return (
    <div className="demo-free-sidebar">
      {nodeTypes.map((nodeType) => (
        <div
          key={nodeType}
          className="demo-free-card"
          onMouseDown={(e) =>
            dragService.startDragCard(nodeType.toLowerCase(), e, {
              data: {
                title: nodeType,
                content: "Node created by dragging",
              },
            })
          }
        >
          {nodeType}
        </div>
      ))}
    </div>
  );
};
