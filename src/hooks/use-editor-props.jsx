// src/hooks/use-editor-props.jsx
import { useMemo } from "react";
import {
  WorkflowNodeRenderer,
  Field,
  useNodeRender,
} from "@flowgram.ai/free-layout-editor";
import { createMinimapPlugin } from "@flowgram.ai/minimap-plugin";
import { createFreeSnapPlugin } from "@flowgram.ai/free-snap-plugin";

import { nodeRegistries } from "../node-registries";
import { initialData } from "../initial-data";

export const useEditorProps = () =>
  useMemo(
    () => ({
      background: true, // Mengaktifkan grid latar belakang
      readonly: false, // Mode non-readonly
      initialData, // Data awal
      nodeRegistries, // Registrasi tipe node
      // Registrasi default node
      fromNodeJSON(node, json) {
        return json;
      },
      toNodeJSON(node, json) {
        return json;
      },
      getNodeDefaultRegistry(type) {
        return {
          type,
          meta: {
            defaultExpanded: true,
          },
          formMeta: {
            // Render form node
            render: () => (
              <>
                <Field name="title">
                  {({ field }) => (
                    <div className="demo-free-node-title">{field.value}</div>
                  )}
                </Field>
                <div className="demo-free-node-content">
                  <Field name="content">
                    <input />
                  </Field>
                </div>
              </>
            ),
          },
        };
      },
      // Render node
      materials: {
        renderDefaultNode: (props) => {
          const { form, node } = useNodeRender();
          return (
            <WorkflowNodeRenderer
              className="demo-free-node"
              node={props.node}
            >
              {form?.render()}
              {node.flowNodeType === "condition" && (
                <div
                  data-port-id="if"
                  data-port-type="output"
                  style={{ position: "absolute", right: 0, top: "33%" }}
                />
              )}
              {node.flowNodeType === "condition" && (
                <div
                  data-port-id="else"
                  data-port-type="output"
                  style={{ position: "absolute", right: 0, top: "66%" }}
                />
              )}
            </WorkflowNodeRenderer>
          );
        },
      },
      // Callback saat konten berubah
      onContentChange(ctx, event) {
        console.log("Data Change: ", event, ctx.document.toJSON());
      },
      nodeEngine: {
        enable: true, // Mengaktifkan engine form node
      },
      // Redo/Undo enable
      history: {
        enable: true,
        enableChangeNode: true, // Mendengarkan perubahan data dari node engine
      },
      // Playground init
      onInit: (ctx) => {},
      // Playground render
      onAllLayersRendered(ctx) {
        ctx.document.fitView(false); // Menyesuaikan tampilan
      },
      // Callback saat Playground dispose
      onDispose() {
        console.log("Editor has been destroyed");
      },
      // Konfigurasi plugin
      plugins: () => [
        // Plugin minimap
        createMinimapPlugin({
          disableLayer: true,
          canvasStyle: {
            canvasWidth: 182,
            canvasHeight: 102,
            canvasPadding: 50,
            canvasBackground: "rgba(245, 245, 245, 1)",
            canvasBorderRadius: 10,
            viewportBackground: "rgba(235, 235, 235, 1)",
            viewportBorderRadius: 4,
            viewportBorderColor: "rgba(201, 201, 201, 1)",
            viewportBorderWidth: 1,
            viewportBorderDashLength: 2,
            nodeColor: "rgba(255, 255, 255, 1)",
            nodeBorderRadius: 2,
            nodeBorderWidth: 0.145,
            nodeBorderColor: "rgba(6, 7, 9, 0.10)",
            overlayColor: "rgba(255, 255, 255, 0)",
          },
          inactiveDebounceTime: 1,
        }),
        // Plugin auto-alignment
        createFreeSnapPlugin({
          edgeColor: "#00B2B2",
          alignColor: "#00B2B2",
          edgeLineWidth: 1,
          alignLineWidth: 1,
          alignCrossWidth: 8,
        }),
      ],
    }),
    []
  );
