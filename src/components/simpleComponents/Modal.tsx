import React from "react";
import Button from "./Button";

interface ModalProps {
  isOpen: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, title, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          borderRadius: "8px",
          width: "500px",
          maxWidth: "90%",
          padding: "20px",
          position: "relative",
        }}
      >
        <h2>{title}</h2>
        <div>{children}</div>
        <div style={{ textAlign: "right", marginTop: "20px" }}>
          <Button label="Cerrar" variant="secondary" onClick={onClose} />
        </div>
      </div>
    </div>
  );
};

export default Modal;
