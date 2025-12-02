import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  variant?: "primary" | "secondary" | "danger";
}

const Button: React.FC<ButtonProps> = ({ label, variant = "primary", ...props }) => {
  let bgColor = "#007bff";
  if (variant === "secondary") bgColor = "#6c757d";
  if (variant === "danger") bgColor = "#dc3545";

  return (
    <button
      style={{
        backgroundColor: bgColor,
        color: "#fff",
        border: "none",
        padding: "8px 16px",
        borderRadius: "6px",
        cursor: "pointer",
        fontWeight: "bold",
      }}
      {...props}
    >
      {label}
    </button>
  );
};

export default Button;
