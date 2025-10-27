import { useContext } from "react";
import { DialogContext } from "../context/DialogContext";
import "./DataEntryModal.css";
const DataEntryModal = ({ children }) => {
  const { isDialogOpen, setIsDialogOpen } = useContext(DialogContext);
  return (
    <div
      onClick={() => setIsDialogOpen(false)}
      style={{ display: isDialogOpen ? "flex" : "none" }}
      className="backdrop-modal"
    >
      <div className="dialog-card-section" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default DataEntryModal;
