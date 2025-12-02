import React from "react";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  type?: string;
}

const InputField: React.FC<InputFieldProps> = ({ label, type = "text", ...props }) => {
  return (
    <div style={{ marginBottom: "12px" }}>
      <label style={{ display: "block", marginBottom: "4px", fontWeight: 500 }}>{label}</label>
      <input
        type={type}
        style={{
          width: "100%",
          padding: "8px",
          borderRadius: "4px",
          border: "1px solid #291010ff",
        }}
        {...props}
      />
    </div>
  );
};

export default InputField;
