import { ValidateTrigger } from "@flowgram.ai/free-layout-editor";

const Field = ({ name, children }) => {
  // Implementasi sederhana Field component jika tidak tersedia
  // Sesuaikan dengan API yang sebenarnya dari library
  const field = {
    value: name === "title" ? "Default Title" : "Default Content",
    onChange: (e) => console.log("Field changed:", e.target.value),
  };
  return children({ field });
};

export const nodeRegistries = [
  {
    type: "start",
    meta: {
      isStart: true, // Tandai sebagai node awal
      deleteDisable: true, // Node awal tidak bisa dihapus
      copyDisable: true, // Node awal tidak bisa disalin
      defaultPorts: [{ type: "output" }], // Node awal hanya punya port output
    },
    /* Konfigurasi validasi dan rendering form node */
    formMeta: {
      validateTrigger: ValidateTrigger.onChange,
      validate: {
        title: ({ value }) => (value ? undefined : "Judul harus diisi"),
      },
      /* Render form (kode JSX ini memerlukan file dengan ekstensi .jsx) */
      render: () => (
        <>
          <Field name="title">
            {({ field }) => (
              <div className="demo-free-node-title">{field.value}</div>
            )}
          </Field>
          <Field name="content">
            {({ field }) => (
              <input
                onChange={field.onChange}
                value={field.value}
              />
            )}
          </Field>
        </>
      ),
    },
  },
  {
    type: "end",
    meta: {
      deleteDisable: true,
      copyDisable: true,
      defaultPorts: [{ type: "input" }],
    },
    formMeta: {
      // ...
    },
  },
  {
    type: "custom",
    meta: {
      // ...
    },
    defaultPorts: [{ type: "output" }, { type: "input" }], // Node normal punya dua port
  },
  {
    type: "condition",
    meta: {
      defaultPorts: [{ type: "input" }],
      useDynamicPort: true,
    },
  },
];
