import { useState } from "react";
import { DialogContext } from "../context/DialogContext";

const DialogProvider = ({ children }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentDataId, setCurrentDataId] = useState(-1);
  return (
    <>
      <DialogContext.Provider
        value={{
          currentDataId,
          isDialogOpen,
          setCurrentDataId,
          setIsDialogOpen,
        }}
      >
        {children}
      </DialogContext.Provider>
    </>
  );
};

export default DialogProvider;
